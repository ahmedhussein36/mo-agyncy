import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth";
import {
    Users,
    CalendarDays,
    ChartBar,
    AlarmClock,
    Award,
} from "lucide-react";
import { InfluencerChart } from "@/components/dashboard/influencer-chart";
import { RecentBrands } from "@/components/dashboard/recent-brands";
import { RecentInfluencers } from "@/components/dashboard/recent-influencer";
import { DashboardCalendar } from "@/components/dashboard/calender";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { PendingRequestsTabs } from "@/components/dashboard/recent-item-taps";
import { TopInfluencerCard } from "@/components/dashboard/top-influencer";

export default async function DashboardPage() {
    await requireAuth();

    const {
        stats,
        recentApprovedInfluencers,
        latestPendingInfluencers,
        recentBrands,
        influencerStats,
        latestPendingBrands,
    } = await useDashboardStats();

    const getColor = (color: string) => {
        switch (color) {
            case "cyan":
                return "from-cyan-500 to-blue-500 border-cyan-500/30";
            case "green":
                return "from-green-500 to-emerald-500 border-green-500/30";
            case "blue":
                return "from-blue-500 to-indigo-500 border-blue-500/30";
            case "purple":
                return "from-purple-500 to-pink-500 border-purple-500/30";
            case "red":
                return "from-pink-500 to-red-500 border-pink-500/30";
            default:
                return "from-cyan-500 to-blue-500 border-cyan-500/30";
        }
    };

    const getIcon = (icon: string) => {
        switch (icon) {
            case "cyan":
                return "text-cyan-400";
            case "green":
                return "text-green-400";
            case "blue":
                return "text-blue-400";
            case "purple":
                return "text-purple-400";
            case "red":
                return "text-red-400";
            default:
                return "text-cyan-400";
        }
    };

    const topInfluencer = recentApprovedInfluencers[3];
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your influencer and brand management system.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        className={`
                            relative overflow-hidden
                            ${getColor(stat.color.trim())}
                            hover:shadow-md 
                            transition-shadow 
                            bg-white 
                            dark:bg-gray-800 p-2 
                            `}
                    >
                        <CardHeader className="flex flex-row items-center justify-between p-2 pb-0">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon
                                className={`h-6 w-6 ${getIcon(stat.color)} `}
                            />
                        </CardHeader>
                        <CardContent className="p-2 pt-0">
                            <div className="text-3xl font-semibold text-gray-200">
                                {stat.value}
                            </div>
                        </CardContent>
                        <div className="absolute -bottom-4 -right-1 h-14 w-14 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
                    </Card>
                ))}
            </div>

            {/* Influencer Chart */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 ">
                <Card className=" col-span-1 lg:col-span-2 bg-gray-50 dark:bg-gray-800 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-start gap-2 p-2">
                        <ChartBar className="h-8 w-8 p-1 text-purple-400" />
                        <CardTitle>Influencer Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InfluencerChart
                            totalCount={influencerStats.total}
                            approvedCount={influencerStats.approved}
                            pendingCount={influencerStats.pending}
                            className="col-span-1 lg:col-span-2"
                        />
                    </CardContent>
                </Card>
                <TopInfluencerCard
                    influencer={{
                        name: topInfluencer.name,
                        username: topInfluencer.email,
                        image:
                            topInfluencer.image || "/public/default-avatar.png",
                        totalFollowers: "7.5M",
                        totalViews: "84.5M",
                        socialLinks: [
                            {
                                platform: "Instagram",
                                url: "#",
                                followers: "1.2M",
                            },
                            {
                                platform: "YouTube",
                                url: "#",
                                followers: "2.5M",
                            },
                            {
                                platform: "TikTok",
                                url: "#",
                                followers: "3.8M",
                            },
                        ],
                    }}
                />
            </div>
            {/* Recent Influencers and Pending Requests */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 ">
                <Card className="bg-gray-50 dark:bg-gray-800 lg:col-span-2 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-start gap-2 p-2">
                        <Users className="h-8 w-8 p-1 text-lime-400" />
                        <CardTitle>Recently Approved Influencers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentInfluencers
                            influencers={recentApprovedInfluencers as any[]}
                        />
                    </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800 space-y-2 p-0">
                    <CardHeader className="flex flex-row items-center justify-start gap-2 p-2">
                        <AlarmClock className="h-8 w-8 p-1 text-orange-400" />
                        <CardTitle>Latest Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PendingRequestsTabs
                            influencerRequests={latestPendingInfluencers}
                            brandRequests={latestPendingBrands}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Brands and Calendar */}
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                <Card className="bg-gray-50 dark:bg-gray-800 lg:col-span-2 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-start gap-2 p-2">
                        <Award className="h-8 w-8 p-1 text-pink-400" />
                        <CardTitle>Recent Brands</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentBrands brands={recentBrands as any} />
                    </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800 space-y-2">
                    <CardHeader className="flex flex-row items-center justify-start gap-2 p-2">
                        <CalendarDays className="h-8 w-8 p-1 text-teal-400" />
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DashboardCalendar />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
