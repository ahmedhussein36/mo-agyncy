"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/utils";

const SocialLinkSchema = z.object({
    platform: z.string(),
    url: z.string().url("Invalid URL"),
    followers: z.number(),
});

const InfluencerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.date().optional(),
    gender: z.string().optional(),
    followers: z.string().optional() || z.string().optional(),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    socialLinks: z.array(SocialLinkSchema).optional(),
});

export async function getInfluencers(
    page: number,
    limit: number,
    status: "APPROVED" | "PENDING" | "REJECTED",
    search?: string,
    category?: string,
    country?: string
) {

    const skip = (page - 1) * limit;

    try {
        const where: any = {
            status: status,
            ...(search && {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ],
            }),
            ...(category && { category }),
            ...(country && { country }),
        };

        const [influencers, totalCount] = await Promise.all([
            prisma.influencer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.influencer.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            influencers,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
            },
        };
    } catch (error) {
        console.error("Error fetching influencers:", error);
        return { error: "Failed to fetch influencers" };
    }
}

export async function createInfluencer(formData: FormData) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    // Parse social links from form data
    const socialLinksJson = formData.get("socialLinks") as string;
    let socialLinks: { platform: string; url: string; followers: number }[] =
        [];

    try {
        if (socialLinksJson) {
            socialLinks = JSON.parse(socialLinksJson).map(
                (link: {
                    platform: string;
                    url: string;
                    followers: number;
                }) => ({
                    ...link,
                    followers:
                        link.followers !== undefined ? link.followers : 0, // Ensure followers is always a number
                })
            );
        }
    } catch (error) {
        return { error: "Invalid social links format" };
    }

    // Sanitize bio
    const bio = formData.get("bio") as string;
    const sanitizedBio = bio ? sanitizeHtml(bio) : undefined;

    const validatedFields = InfluencerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        bio: sanitizedBio,
        image: formData.get("image"),
        category: formData.get("category"),
        country: formData.get("country"),
        followers: formData.get("followers") || "",
        socialLinks: socialLinks,
        dateOfBirth: formData.get("dateOfBirth")
            ? new Date(formData.get("dateOfBirth") as string)
            : undefined,
        gender: formData.get("gender"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const influencerData = validatedFields.data;

    try {
        // Check if influencer already exists
        const existingInfluencer = await prisma.influencer.findUnique({
            where: { email: influencerData.email },
        });

        if (existingInfluencer) {
            return { error: "Influencer with this email already exists" };
        }

        // Create influencer
        await prisma.influencer.create({
            data: {
                ...influencerData,
                status: influencerData.status || "APPROVED",
                approvedBy: currentUser.id,
                approvedAt: new Date(),
            },
        });

        revalidatePath("/dashboard/influencers");
        return { success: "Influencer created successfully" };
    } catch (error) {
        console.error("Error creating influencer:", error);
        return { error: "Failed to create influencer" };
    }
}

export async function updateInfluencer(
    influencerId: string,
    formData: FormData
) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    // Parse social links from form data
    const socialLinksJson = formData.get("socialLinks") as string;
    let socialLinks = [];

    try {
        if (socialLinksJson) {
            socialLinks = JSON.parse(socialLinksJson).map((link: any) => ({
                ...link,
                followers: link.followers !== undefined ? link.followers : "", // Ensure followers is always a number
            }));
        }
    } catch (error) {
        return { error: "Invalid social links format" };
    }

    // Sanitize bio
    const bio = formData.get("bio") as string;
    const sanitizedBio = bio ? sanitizeHtml(bio) : undefined;

    const validatedFields = InfluencerSchema.partial().safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        bio: sanitizedBio,
        image: formData.get("image"),
        category: formData.get("category"),
        country: formData.get("country"),
        followers: formData.get("followers"),
        socialLinks: socialLinks.length > 0 ? socialLinks : undefined,
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const influencerData = validatedFields.data;

    try {
        await prisma.influencer.update({
            where: { id: influencerId },
            data: influencerData,
        });

        revalidatePath(`/dashboard/influencers/${influencerId}`);
        return { success: "Influencer updated successfully" };
    } catch (error) {
        console.error("Error updating influencer:", error);
        return { error: "Failed to update influencer" };
    }
}

export async function approveInfluencer(influencerId: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.influencer.update({
            where: { id: influencerId },
            data: {
                status: "APPROVED",
                approvedBy: currentUser.id,
                approvedAt: new Date(),
                rejectionNote: null,
            },
        });

        revalidatePath("/dashboard/influencers/pending");
        return { success: "Influencer approved successfully" };
    } catch (error) {
        console.error("Error approving influencer:", error);
        return { error: "Failed to approve influencer" };
    }
}

export async function rejectInfluencer(influencerId: string, note: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.influencer.update({
            where: { id: influencerId },
            data: {
                status: "REJECTED",
                rejectionNote: sanitizeHtml(note),
            },
        });

        revalidatePath("/dashboard/influencers/pending");
        return { success: "Influencer rejected successfully" };
    } catch (error) {
        console.error("Error rejecting influencer:", error);
        return { error: "Failed to reject influencer" };
    }
}

export async function deleteInfluencer(influencerId: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.influencer.delete({
            where: { id: influencerId },
        });

        revalidatePath("/dashboard/influencers");
        revalidatePath("/dashboard/influencers/pending");
        return { success: "Influencer deleted successfully" };
    } catch (error) {
        console.error("Error deleting influencer:", error);
        return { error: "Failed to delete influencer" };
    }
}
