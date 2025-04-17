import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const brand = await prisma.brand.create({ data });
    return NextResponse.json(brand);
}
