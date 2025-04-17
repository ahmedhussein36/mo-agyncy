import prisma from "@/lib/prisma";
import { cache } from "react";

export const useDashboardStats = cache(async () => {
    const [
        totalInfluencersCount,
        influencersCount,
        pendingInfluencersCount,
        brandsCount,
        pendingBrandsCount,
        usersCount,
        recentApprovedInfluencers,
        latestPendingInfluencers,
        recentBrands,
        latestPendingBrands,
    ] = await Promise.all([
        prisma.influencer.count(),
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
        prisma.brand.findMany({
            where: { status: "PENDING" },
            orderBy: { createdAt: "desc" },
            take: 3,
        }),
    ]);

    const stats = [
        {
            title: "Total Influencers",
            value: totalInfluencersCount,
            href: "/dashboard/influencers/pending",
            icon: require("lucide-react").Users,
            color: "green",
        },
        {
            title: "Active Influencers",
            value: influencersCount,
            href: "/dashboard/influencers",
            icon: require("lucide-react").UserCheck,
            color: "cyan",
        },
        {
            title: "Active Brands",
            value: brandsCount,
            href: "/dashboard/brands",
            icon: require("lucide-react").Building,
            color: "purple",
        },
        // {
        //     title: "Pending Brands",
        //     value: pendingBrandsCount,
        //     href: "/dashboard/brands/pending",
        //     icon: require("lucide-react").Building,
        //     color: "blue",
        // },
        {
            title: "Users",
            value: usersCount,
            href: "/dashboard/users",
            icon: require("lucide-react").Users,
            color: "red",
        },
    ];

    const chartData = [
        { name: "Total", value: influencersCount + pendingInfluencersCount },
        { name: "Approved", value: influencersCount },
        { name: "Pending", value: pendingInfluencersCount },
    ];

    const influencerStats = {
        total: influencersCount + pendingInfluencersCount,
        approved: influencersCount,
        pending: pendingInfluencersCount,
    };

    return {
        stats,
        chartData,
        recentApprovedInfluencers,
        latestPendingInfluencers,
        recentBrands,
        latestPendingBrands,
        influencerStats,
        brandsCount,
        pendingBrandsCount,
    };
});
