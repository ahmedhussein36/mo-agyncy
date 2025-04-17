import { createInfluencer } from "@/actions/influencer-actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const result = await createInfluencer(formData);
    return NextResponse.json(result);
}
