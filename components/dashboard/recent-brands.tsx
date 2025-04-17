import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { EmptyState } from "./empty-state";
import { Building } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface Brand {
    id: string;
    name: string;
    industry?: string;
    approvedAt?: Date;
}

interface RecentBrandsProps {
    brands: Brand[];
}

export function RecentBrands({ brands }: RecentBrandsProps) {
    if (!brands.length) {
        return (
            <EmptyState
                icon={Building}
                title="No approved brands"
                description="You haven't approved any brands yet."
                actionLabel="View Pending Brands"
                actionLink="/dashboard/brands/pending"
            />
        );
    }

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {brands.map((brand) => (
                        <TableRow key={brand.id}>
                            <TableCell className="font-medium">
                                {brand.name}
                            </TableCell>
                            <TableCell>{brand.industry || "N/A"}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild variant="ghost" size="sm">
                                    <Link
                                        href={`/dashboard/brands?id=${brand.id}`}
                                    >
                                        View
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
