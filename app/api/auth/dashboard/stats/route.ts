import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    const IsAdmin = await getCurrentUser(); // Replace with actual admin check logic
    if (!IsAdmin) {
        throw new Error(
            "Unauthorized access. Only admins can view dashboard stats."
        );
    }

    const [
        influencersCount,
        pendingInfluencersCount,
        brandsCount,
        pendingBrandsCount,
        usersCount,
        recentApprovedInfluencers,
        latestPendingInfluencers,
        recentBrands,
    ] = await Promise.all([
        prisma.influencer.count({ where: { status: "APPROVED" } }),
        prisma.influencer.count({ where: { status: "PENDING" } }),
        prisma.brand.count({ where: { status: "APPROVED" } }),
        prisma.brand.count({ where: { status: "PENDING" } }),
        prisma.user.count(),
        prisma.influencer.findMany({
            where: { status: "APPROVED" },
            orderBy: { approvedAt: "desc" },
            take: 6,
        }),
        prisma.influencer.findMany({
            where: { status: "PENDING" },
            orderBy: { createdAt: "desc" },
            take: 3,
        }),
        prisma.brand.findMany({
            where: { status: "APPROVED" },
            orderBy: { approvedAt: "desc" },
            take: 3,
        }),
    ]);

    return NextResponse.json({
        influencersCount,
        pendingInfluencersCount,
        brandsCount,
        pendingBrandsCount,
        usersCount,
        recentApprovedInfluencers,
        latestPendingInfluencers,
        recentBrands,
    });
}
