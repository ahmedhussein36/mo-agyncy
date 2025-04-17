import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const data = await req.json();
    const updated = await prisma.brand.update({
        where: { id: params.id },
        data,
    });

    return NextResponse.json(updated);
}
