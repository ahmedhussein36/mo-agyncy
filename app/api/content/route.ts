import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const contentFilePath = path.join(process.cwd(), "/dictionaries/en.json");

function setNestedValue(obj: any, path: string, value: any) {
    const keys = path.split(".");
    let current = obj;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            if (!current[key] || typeof current[key] !== "object") {
                current[key] = {};
            }
            current = current[key];
        }
    });
}

export async function PUT(request: Request) {
    try {
        const updates = await request.json();

        if (typeof updates !== "object" || Array.isArray(updates)) {
            return NextResponse.json(
                { error: "Invalid updates format" },
                { status: 400 }
            );
        }

        const currentContent = JSON.parse(
            await fs.readFile(contentFilePath, "utf-8")
        );

        const updatedContent = { ...currentContent };

        for (const path in updates) {
            setNestedValue(updatedContent, path, updates[path]);
        }

        await fs.writeFile(
            contentFilePath,
            JSON.stringify(updatedContent, null, 2)
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update content" },
            { status: 500 }
        );
    }
}
