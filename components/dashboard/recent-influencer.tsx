import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "./empty-state";
import { ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface Influencer {
    id: string;
    image: string;
    name: string;
    email: string;
    category?: string;
    updatedAt?: Date;
}

interface RecentInfluencersProps {
    influencers: Influencer[];
}

export function RecentInfluencers({ influencers }: RecentInfluencersProps) {
    if (!influencers.length) {
        return (
            <EmptyState
                icon={UserCheck}
                title="No approved influencers"
                description="You haven't approved any influencers yet."
                actionLabel="View Pending Requests"
                actionLink="/dashboard/influencers/pending"
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Profile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Approved</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {influencers.map((influencer) => (
                        <TableRow key={influencer.id}>
                            <TableCell className="w-[80px]">
                                <img
                                    src={influencer.image || "/uploads/1744823198469-images.png"}
                                    alt={influencer.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                    loading="lazy"
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                {influencer.name}
                            </TableCell>
                            <TableCell>
                                {influencer.category || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground ">
                                {influencer.updatedAt
                                    ? formatDistanceToNow(
                                          new Date(influencer.updatedAt),
                                          { addSuffix: true }
                                      )
                                    : "N/A"}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button asChild size="sm" className=" bg-blue-600 hover:bg-blue-500">
                                    <Link
                                        href={`/dashboard/influencers/${influencer.id}`}
                                    >
                                        View 
                                        <ArrowRight className="ms-1 h-4 w-4" />
                                    </Link>
                                    
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
