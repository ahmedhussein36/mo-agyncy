"use client";

import { useState } from "react";
import { EditDrawer } from "@/components/admin/edit-drawer";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";

interface EditableSectionProps {
    id: string;
    type: "title" | "content" | "mixed" | "image";
    isAdmin?: boolean;
    children: React.ReactNode;
    initialData: {
        title?: string;
        content?: string;
        imageUrl?: string;
    };
    className?: string;
    jsonPath: string;
}

export function EditableSection({
    id,
    type,
    isAdmin = false,
    children,
    initialData,
    className,
    jsonPath,
}: EditableSectionProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [data, setData] = useState(initialData);

    const handleSave = async (newData: any) => {
        try {
            // Call your API endpoint to update the JSON file
            const response = await fetch("/api/content", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    [jsonPath]: newData,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save content");
            }

            // Update local state
            setData(newData);
            return true; // Indicate success
        } catch (error) {
            console.error("Error saving content:", error);
            return false; // Indicate failure
        }
    };

    return (
        <div className={cn("relative group space-y-4", className)}>
            {isAdmin && (
                <>
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="absolute -top-3 -right-3 bg-brand text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                        <EditIcon className="h-4 w-4" />
                    </button>

                    <EditDrawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        sectionId={id}
                        sectionType={type}
                        initialData={data}
                        onSave={handleSave}
                    />
                </>
            )}
            {children}
        </div>
    );
}
