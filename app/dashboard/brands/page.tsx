import { getBrands } from "@/actions/brand-actions";
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
import { PlusCircle } from "lucide-react";

export default async function BrandsPage({
    searchParams,
}: {
    searchParams: {
        page?: string;
        search?: string;
        industry?: string;
        country?: string;
    };
}) {
    const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;
    const search = searchParams.search || "";
    const industry = searchParams.industry || "";
    const country = searchParams.country || "";

    const { brands, pagination, error } = await getBrands(
        page,
        10,
        "APPROVED",
        search,
        industry,
        country
    );

    if (error) {
        return <div className="text-red-500">No brands found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Approved Brands
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your approved brands here.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/brands/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Brand
                    </Link>
                </Button>
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
                            name="industry"
                            defaultValue={industry}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">All Industries</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Technology">Technology</option>
                            <option value="Food & Beverage">
                                Food & Beverage
                            </option>
                            <option value="Health & Wellness">
                                Health & Wellness
                            </option>
                            <option value="Travel">Travel</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Finance">Finance</option>
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
                            <TableHead>Phone</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Approved At</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brands && brands.length > 0 ? (
                            brands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell className="font-medium">
                                        {brand.name}
                                    </TableCell>
                                    <TableCell>{brand.email}</TableCell>
                                    <TableCell>{brand.phone}</TableCell>
                                    <TableCell>
                                        {brand.industry || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {brand.country || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {brand.approvedAt
                                            ? formatDate(brand.approvedAt)
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={`/dashboard/brands/${brand.id}`}
                                                >
                                                    Edit
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
                                    No brands found.
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
                                    href={`/dashboard/brands?page=${pageNum}${
                                        search ? `&search=${search}` : ""
                                    }${
                                        industry ? `&industry=${industry}` : ""
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
