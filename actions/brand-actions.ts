"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/utils";
import { Prisma } from "@prisma/client";

const BrandSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
    logo: z.string().url("Invalid URL").optional(),
    industry: z.string().optional(),
    description: z.string().optional(),
    country: z.string().optional(),
});

export async function getBrands(
    page = 1,
    limit = 10,
    status = "APPROVED",
    search = "",
    industry = "",
    country = ""
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return { error: "Unauthorized" };
    }

    const skip = (page - 1) * limit;

    try {
        const where = {
            status: status as any,
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }),
            ...(industry && {
                industry: {
                    contains: industry,
                    mode: Prisma.QueryMode.insensitive,
                },
            }),
            ...(country && {
                country: {
                    contains: country,
                    mode: Prisma.QueryMode.insensitive,
                },
            }),
        };

        const [brands, totalCount] = await Promise.all([
            prisma.brand.findMany({
                where: where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.brand.count(),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            brands,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
            },
        };
    } catch (error) {
        console.error("Error fetching brands:", error);
        return { error: "Failed to fetch brands" };
    }
}

export async function createBrand(formData: FormData) {
    const currentUser = await getCurrentUser();

    // if (
    //     !currentUser ||
    //     (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    // ) {
    //     return { error: "Unauthorized" };
    // }

    // Sanitize description
    const description = formData.get("description") as string;
    const sanitizedDescription = description
        ? sanitizeHtml(description)
        : undefined;

    const validatedFields = BrandSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        website: formData.get("website"),
        logo: formData.get("logo"),
        industry: formData.get("industry"),
        description: sanitizedDescription,
        country: formData.get("country"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const brandData = validatedFields.data;

    try {
        // Check if brand already exists
        const existingBrand = await prisma.brand.findUnique({
            where: { email: brandData.email },
        });

        if (existingBrand) {
            return { error: "Brand with this email already exists" };
        }

        // Create brand
        await prisma.brand.create({
            data: {
                ...brandData,
                status: "APPROVED",
                approvedBy: currentUser.id,
                approvedAt: new Date(),
            },
        });

        revalidatePath("/dashboard/brands");
        return { success: "Brand created successfully" };
    } catch (error) {
        console.error("Error creating brand:", error);
        return { error: "Failed to create brand" };
    }
}

export async function updateBrand(brandId: string, formData: FormData) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    // Sanitize description
    const description = formData.get("description") as string;
    const sanitizedDescription = description
        ? sanitizeHtml(description)
        : undefined;

    const validatedFields = BrandSchema.partial().safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        website: formData.get("website"),
        logo: formData.get("logo"),
        industry: formData.get("industry"),
        description: sanitizedDescription,
        country: formData.get("country"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const brandData = validatedFields.data;

    try {
        // Check if brand already exists
        const existingBrand = await prisma.brand.findUnique({
            where: { email: brandData.email },
        });

        if (existingBrand) {
            return { error: "Brand with this email already exists" };
        }
        await prisma.brand.update({
            where: { id: brandId },
            data: brandData,
        });

        revalidatePath("/dashboard/brands");
        return { success: "Brand updated successfully" };
    } catch (error) {
        console.error("Error updating brand:", error);
        return { error: "Failed to update brand" };
    }
}

export async function approveBrand(brandId: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.brand.update({
            where: { id: brandId },
            data: {
                status: "APPROVED",
                approvedBy: currentUser.id,
                approvedAt: new Date(),
                rejectionNote: null,
            },
        });

        revalidatePath("/dashboard/brands/pending");
        return { success: "Brand approved successfully" };
    } catch (error) {
        console.error("Error approving brand:", error);
        return { error: "Failed to approve brand" };
    }
}

export async function rejectBrand(brandId: string, note: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.brand.update({
            where: { id: brandId },
            data: {
                status: "REJECTED",
                rejectionNote: sanitizeHtml(note),
            },
        });

        revalidatePath("/dashboard/brands/pending");
        return { success: "Brand rejected successfully" };
    } catch (error) {
        console.error("Error rejecting brand:", error);
        return { error: "Failed to reject brand" };
    }
}

export async function deleteBrand(brandId: string) {
    const currentUser = await getCurrentUser();

    if (
        !currentUser ||
        (currentUser.role !== "OWNER" && currentUser.role !== "ADMIN")
    ) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.brand.delete({
            where: { id: brandId },
        });

        revalidatePath("/dashboard/brands");
        revalidatePath("/dashboard/brands/pending");
        return { success: "Brand deleted successfully" };
    } catch (error) {
        console.error("Error deleting brand:", error);
        return { error: "Failed to delete brand" };
    }
}
