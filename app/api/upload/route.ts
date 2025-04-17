// app/api/upload/route.ts
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), {
            status: 400,
        });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "uploads", filename);

    await writeFile(filePath, buffer);

    return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
        status: 200,
    });
}
