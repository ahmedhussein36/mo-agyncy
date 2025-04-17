import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditBrandForm from "./form";

export default async function EditBrandPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const brand = await prisma.brand.findUnique({ where: { id: id } });

    if (!brand) return notFound();

    return <EditBrandForm brand={brand} />;
}
