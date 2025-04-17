import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "./empty-state";
import { Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Request {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

interface PendingRequestsProps {
    requests: Request[];
}

export function PendingRequests({ requests }: PendingRequestsProps) {
    if (!requests.length) {
        return (
            <EmptyState
                icon={Clock}
                title="No pending requests"
                description="There are no pending influencer requests at the moment."
                actionLabel="View Approved Influencers"
                actionLink="/dashboard/influencers"
            />
        );
    }

    return (
        <div className="grid gap-4 grid-cols-1">
            {requests.map((request) => (
                <Card
                    key={request.id}
                    className="overflow-hidden transition-all hover:shadow-md bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm"
                >
                    <CardHeader className="p-4 pb-2 flex flex-row items-center space-x-4">
                        <Avatar className="h-10 w-10 bg-white ">
                            <AvatarFallback className="text-primary bg-transparent">
                                {request.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="font-medium leading-none">
                                {request.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {request.email}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 pb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            Submitted{" "}
                            {formatDistanceToNow(new Date(request.createdAt), {
                                addSuffix: true,
                            })}
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-2 flex justify-end">
                        <Button asChild size="sm">
                            <Link
                                href={`/dashboard/influencers/pending?id=${request.id}`}
                            >
                                Review Request
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
