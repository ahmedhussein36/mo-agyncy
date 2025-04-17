import { requireAuth } from "@/lib/auth";
import { getInfluencers } from "@/actions/influencer-actions";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

interface PindingInfluencersProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
        country?: string;
    }>;
}

export default async function PendingInfluencersPage({
    searchParams,
}: PindingInfluencersProps) {
    await requireAuth();

    const page = (await searchParams).page;
    const search = (await searchParams).search || "";
    const category = (await searchParams).category || "";
    const country = (await searchParams).country || "";

    const parsedPage = page ? Number.parseInt(page) : 1;

    const { influencers, pagination, error } = await getInfluencers(
        parsedPage,
        5,
        "PENDING",
        search,
        category,
        country
    );

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Pending Influencers
                </h1>
                <p className="text-muted-foreground">
                    Review and approve influencer applications.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b">
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search by name or email"
                            defaultValue={search}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <select
                            name="category"
                            defaultValue={category}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">All Categories</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Technology">Technology</option>
                            <option value="Gaming">Gaming</option>
                        </select>
                        <select
                            name="country"
                            defaultValue={country}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">All Countries</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="India">India</option>
                        </select>
                        <Button type="submit">Filter</Button>
                    </form>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {influencers && influencers.length > 0 ? (
                            influencers.map((influencer) => (
                                <TableRow key={influencer.id}>
                                    <TableCell className="font-medium">
                                        {influencer.name}
                                    </TableCell>
                                    <TableCell>{influencer.email}</TableCell>
                                    <TableCell>
                                        {influencer.category || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {influencer.country || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(influencer.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={`/dashboard/influencers/${influencer.id}`}
                                                >
                                                    View
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="text-green-500"
                                            >
                                                <Link
                                                    href={`/dashboard/influencers/${influencer.id}/approve`}
                                                >
                                                    <CheckCircle className="mr-1 h-4 w-4" />
                                                    Approve
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="text-red-500"
                                            >
                                                <Link
                                                    href={`/dashboard/influencers/${influencer.id}/reject`}
                                                >
                                                    <XCircle className="mr-1 h-4 w-4" />
                                                    Reject
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-4"
                                >
                                    No pending influencers found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center p-4 border-t">
                        <div className="flex space-x-2">
                            {Array.from(
                                { length: pagination.totalPages },
                                (_, i) => i + 1
                            ).map((pageNum) => (
                                <Link
                                    key={pageNum}
                                    href={`/dashboard/influencers/pending?page=${pageNum}${
                                        search ? `&search=${search}` : ""
                                    }${
                                        category ? `&category=${category}` : ""
                                    }${country ? `&country=${country}` : ""}`}
                                    className={`px-3 py-1 rounded ${
                                        pageNum === pagination.page
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                                >
                                    {pageNum}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
