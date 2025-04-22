// app/api/influencers/update-image/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id, image } = await req.json();

    if (!id || !image) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updated = await prisma.influencer.update({
        where: { id },
        data: { image },
    });

    return NextResponse.json({ success: true, updated });
}
