import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
    const { slug, jsonPath, data } = await req.json();

    const page = await prisma.page.findUnique({
        where: { slug: slug },
    });

    if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const updatedContent = updateNestedField(page.content, jsonPath, data);

    await prisma.page.update({
        where: { slug: slug },
        data: { content: updatedContent },
    });

    return NextResponse.json({ success: true });
}


// Helper Function to handle nested obj..
export function updateNestedField(obj: any, path: string, newData: any) {
    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (typeof newData === "object" && !Array.isArray(newData)) {
        current[lastKey] = {
            ...(current[lastKey] || {}),
            ...newData,
        };
    } else {
        current[lastKey] = newData;
    }

    return obj;
}
