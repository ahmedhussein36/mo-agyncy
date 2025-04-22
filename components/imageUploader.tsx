"use client";

import { useRef, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil, UploadCloud, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const ImageUploader = ({ id }: { id: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!data.url) throw new Error("Upload failed");
            await updateImage(id, data.url);
        } catch (err) {
            toast({ title: "Error", description: "Faild to Change Image" });
        }
    };

    const handleExternalImage = async () => {
        if (!imageUrl.startsWith("http")) {
            toast({ title: "Error", description: "invalid image url" });
            return;
        }

        setPreview(imageUrl);

        try {
            await updateImage(id, imageUrl);
        } catch (err) {
            toast({ title: "Error", description: "Faild to Change Image" });
        }
    };

    const updateImage = async (id: string, image: string) => {
        const res = await fetch("/api/influencer/update-image", {
            method: "POST",
            body: JSON.stringify({ id, image }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            router.refresh();
            toast({
                title: "Success!",
                description: "Image updated successfully",
            });
        } else {
            throw new Error("Database update failed");
        }
    };

    return (
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-cyan-700/10 hover:bg-cyan-700/30 hover:text-white text-cyan-500 border border-cyan-500 rounded-lg"
                    >
                        <Pencil size={16} />
                        Edit Image
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-72 space-y-3 bg-gray-900 border-gray-700">
                    <div className="flex flex-col gap-2">
                        {/* زر رفع من الجهاز */}
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleUpload}
                        />
                        <Button
                            variant="secondary"
                            onClick={() => inputRef.current?.click()}
                            className="w-full flex items-center gap-2"
                        >
                            <UploadCloud size={16} />
                            Upload from device
                        </Button>

                        {/* رابط خارجي */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Paste image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-sm text-white"
                            />
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={handleExternalImage}
                            >
                                <Check size={18} />
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
    );
};
