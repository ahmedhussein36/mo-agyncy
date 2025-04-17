"use client";

import { useState } from "react";

type Props = {
    onUpload: (url: string) => void; // يرجع الرابط للصورة المرفوعة
};

export default function ImageUploader({ onUpload }: Props) {
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // معاينة فورية
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // رفع الصورة
        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                onUpload(data.url);
            } else {
                alert(data.error || "فشل في رفع الصورة");
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("حدث خطأ أثناء الرفع");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p>جارٍ الرفع...</p>}
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="rounded w-32 h-32 object-cover border"
                />
            )}
        </div>
    );
}
