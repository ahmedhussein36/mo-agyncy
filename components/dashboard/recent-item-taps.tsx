"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "./empty-state";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Request {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

interface PendingRequestsTabsProps {
    influencerRequests: Request[];
    brandRequests: Request[];
}

export function PendingRequestsTabs({
    influencerRequests,
    brandRequests,
}: PendingRequestsTabsProps) {
    const [activeTab, setActiveTab] = useState("influencers");

    const renderRequests = (
        requests: Request[],
        type: "influencers" | "brands"
    ) => {
        if (!requests.length) {
            return (
                <EmptyState
                    icon={Clock}
                    title={`No pending ${
                        type === "influencers" ? "influencer" : "brand"
                    } requests`}
                    description={`There are no pending ${
                        type === "influencers" ? "influencer" : "brand"
                    } requests at the moment.`}
                    actionLabel={`View Approved ${
                        type === "influencers" ? "Influencers" : "Brands"
                    }`}
                    actionLink={`/dashboard/${type}`}
                />
            );
        }

        return (
            <div className="grid gap-4 grid-cols-1">
                {requests.map((request) => (
                    <Card
                        key={request.id}
                        className="overflow-hidden transition-all hover:shadow-md bg-gray-50 dark:bg-gray-900/70 shadow-sm"
                    >
                        <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center space-x-4 ">
                            <CardTitle className="flex items-center space-x-4 text-base font-medium">
                                <Avatar className="h-10 w-10 bg-primary/10">
                                    <AvatarFallback className="text- bg-gradient-to-tr from-purple-500 to-pink-500  text-white">
                                        {request.name
                                            .substring(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h3 className="font-medium leading-none">
                                        {request.name}
                                    </h3>
                                </div>
                            </CardTitle>
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="bg-transparent border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-500"
                            >
                                <Link
                                    href={`/dashboard/${type}/pending?id=${request.id}`}
                                >
                                    Review
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 pb-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                Submitted{" "}
                                {formatDistanceToNow(
                                    new Date(request.createdAt),
                                    { addSuffix: true }
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div>
            <Tabs defaultValue="influencers" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-50 dark:bg-gray-700 rounded-md p-1">
                    <TabsTrigger value="influencers">Influencers</TabsTrigger>
                    <TabsTrigger value="brands">Brands</TabsTrigger>
                </TabsList>
                <TabsContent value="influencers">
                    {renderRequests(influencerRequests, "influencers")}
                </TabsContent>
                <TabsContent value="brands">
                    {renderRequests(brandRequests, "brands")}
                </TabsContent>

                <Button
                    variant="ghost"
                    className=" mt-4 hover:bg-blue-500 w-full"
                >
                    <Link
                        className="flex items-center justify-center w-full"
                        href={
                            activeTab === "influencers"
                                ? "/dashboard/influencers/pending"
                                : "/dashboard/brands/pending"
                        }
                    >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </Tabs>
        </div>
    );
}
