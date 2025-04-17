"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface InfluencerChartProps {
    totalCount: number;
    approvedCount: number;
    pendingCount: number;
    className?: string;
}

export function InfluencerChart({
    totalCount,
    approvedCount,
    pendingCount,
    className,
}: InfluencerChartProps) {
    // Generate data for the last 6 months
    const generateMonthlyData = () => {
        const data = [];
        const now = new Date();

        // Create sample data for the last 6 months
        for (let i = 5; i >= 0; i--) {
            const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = month.toLocaleString("default", {
                month: "short",
            });

            // Generate some sample growth data
            // In a real app, you would fetch this from your database
            const growthFactor = 1 + i * 0.15; // Simulates growth over time
            const randomVariation = 0.8 + Math.random() * 0.4; // Adds some randomness

            data.push({
                name: monthName,
                Total: Math.round(
                    (totalCount * growthFactor * randomVariation) / (i + 1)
                ),
                Approved: Math.round(
                    (approvedCount * growthFactor * randomVariation) / (i + 1)
                ),
                Pending: Math.round(
                    (pendingCount * growthFactor * randomVariation) / (i + 1)
                ),
            });
        }

        // Add current month with actual counts
        data.push({
            name: new Date().toLocaleString("default", { month: "short" }),
            Total: totalCount,
            Approved: approvedCount,
            Pending: pendingCount,
        });

        return data;
    };

    const data = generateMonthlyData();

    // Custom colors for the areas
    const customColors = {
        Total: "hsl(var(--chart-1))",
        Approved: "hsl(var(--chart-2))",
        Pending: "hsl(var(--chart-3))",
    };

    return (
        <ChartContainer
            config={{
                Total: {
                    label: "Total Influencers",
                    color: customColors.Total,
                },
                Approved: {
                    label: "Approved Influencers",
                    color: customColors.Approved,
                },
                Pending: {
                    label: "Pending Influencers",
                    color: customColors.Pending,
                },
            }}
            className={cn("h-[300px] w-full", className)}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient
                            id="colorTotal"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={customColors.Total}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={customColors.Total}
                                stopOpacity={0.2}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorApproved"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={customColors.Approved}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={customColors.Approved}
                                stopOpacity={0.2}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorPending"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={customColors.Pending}
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor={customColors.Pending}
                                stopOpacity={0.2}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke={customColors.Total}
                        fillOpacity={0.3}
                        fill="url(#colorTotal)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="Approved"
                        stroke={customColors.Approved}
                        fillOpacity={0.3}
                        fill="url(#colorApproved)"
                        strokeWidth={2}
                    />
                    <Area
                        type="monotone"
                        dataKey="Pending"
                        stroke={customColors.Pending}
                        fillOpacity={0.3}
                        fill="url(#colorPending)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
