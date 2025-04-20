// app/api/content/route.ts
import { writeFile, readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // استلام البيانات من body
        const { jsonPath, data } = await req.json();

        // التأكد من صحة البيانات
        if (!jsonPath || typeof data !== "object") {
            return NextResponse.json(
                { error: "Invalid payload" },
                { status: 400 }
            );
        }

        // تحديد المسار إلى ملف en.json
        const filePath = path.join(process.cwd(), "/dictionaries/en.json");

        // قراءة محتوى ملف en.json
        const fileContent = await readFile(filePath, "utf-8");
        const json = JSON.parse(fileContent);

        // تحديث البيانات في المسار المحدد داخل JSON
        updateJsonAtPath(json, jsonPath, data);

        // حفظ البيانات المعدلة في ملف en.json
        await writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

        // إرجاع استجابة بنجاح العملية
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving section:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// دالة مساعدة لتحديث قيمة معينة داخل JSON بناءً على jsonPath
function updateJsonAtPath(obj: any, path: string, value: any) {
    const keys = path.replace(/^\./, "").split(".");
    let current = obj;

    // التنقل عبر الكائن للوصول إلى المكان المناسب
    for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        if (!(key in current)) {
            current[key] = {}; // إذا لم يكن المفتاح موجودًا، ننشئ كائنًا جديدًا
        }
        current = current[key];
    }

    // تحديد المفتاح الأخير وتحديثه بالقيمة الجديدة
    const lastKey = isNaN(Number(keys.at(-1)))
        ? keys.at(-1)!
        : Number(keys.at(-1));
    current[lastKey] = value;
}
