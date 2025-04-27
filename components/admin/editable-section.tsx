import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import { useToast } from "@/components/ui/use-toast";

// أنواع الحقول المدعومة حاليًا
export type FieldType = "text" | "textarea" | "image" | "richText" | "array";

// تعريف كل حقل
export interface EditableField {
    name: string;
    type: FieldType;
    label?: string;
    itemFields?: EditableField[]; // للحقول من نوع array
}

interface EditableSectionProps {
    id: string;
    jsonPath: string;
    slug: string;
    isAdmin?: boolean;
    initialData: Record<string, any>;
    fields: EditableField[];
    children: React.ReactNode;
    className?: string;
}

export const EditableSection = ({
    id,
    slug,
    jsonPath,
    isAdmin = false,
    initialData,
    fields,
    children,
    className,
}: EditableSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState(initialData);
    const router = useRouter();
    const locale = useLocale();
    const { toast } = useToast();

    const handleFieldChange = (name: string, value: any) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (
        fieldName: string,
        index: number,
        key: string,
        value: any
    ) => {
        const updatedArray = [...(data[fieldName] || [])];
        updatedArray[index] = { ...updatedArray[index], [key]: value };
        setData((prev) => ({ ...prev, [fieldName]: updatedArray }));
    };

    const handleSave = async () => {
        setIsEditing(true);
        try {
            const updatedData = { ...initialData, ...data };

           {/* await saveSectionData(jsonPath, updatedData, locale); */}
            await saveData(slug, jsonPath, updatedData);
            router.refresh();
            toast({
                title: "Success",
                description: "item has been updated",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update item",
                variant: "destructive",
            });
            console.log(error);
        } finally {
            setIsEditing(false);
        }
    };

    if (!isAdmin) return <>{children}</>;

    return (
        <div className={cn("relative group", className)}>
            {isEditing && (
                <div className="absolute top-0 end-0 z-20 space-x-2 rtl:space-x-reverse">
                    <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-brand hover:bg-brand-light"
                    >
                        Save
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                </div>
            )}
            {!isEditing && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                className=" rounded-full hover:opacity-75 transition-all bg-brand p-2 border border-white absolute top-0 end-0 z-20 hidden group-hover:block text-xs text-muted-foreground underline"
                                onClick={() => setIsEditing(true)}
                            >
                                <Pencil className=" w-4 h-4 text-white " />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Click to edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            {isEditing ? (
                <div className="space-y-4 border border-border rounded-xl p-4 mt-4">
                    {fields.map(({ name, type, label, itemFields }) => (
                        <div key={name} className="space-y-2">
                            {label && (
                                <label className="block text-sm font-medium mb-1">
                                    {label}
                                </label>
                            )}

                            {type === "text" && (
                                <Input
                                    value={data[name] || ""}
                                    onChange={(e) =>
                                        handleFieldChange(name, e.target.value)
                                    }
                                />
                            )}

                            {type === "textarea" && (
                                <Textarea
                                    value={data[name] || ""}
                                    onChange={(e) =>
                                        handleFieldChange(name, e.target.value)
                                    }
                                    rows={4}
                                />
                            )}

                            {type === "image" && (
                                <Input
                                    type="url"
                                    value={data[name] || ""}
                                    onChange={(e) =>
                                        handleFieldChange(name, e.target.value)
                                    }
                                    placeholder="رابط الصورة"
                                />
                            )}

                            {type === "array" &&
                                itemFields &&
                                Array.isArray(data[name]) && (
                                    <div className="space-y-4">
                                        {data[name].map(
                                            (item: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="border rounded-lg p-3 space-y-2"
                                                >
                                                    {itemFields.map(
                                                        (subField) => (
                                                            <div
                                                                key={
                                                                    subField.name
                                                                }
                                                            >
                                                                {subField.label && (
                                                                    <label className="block text-sm font-medium mb-1">
                                                                        {
                                                                            subField.label
                                                                        }
                                                                    </label>
                                                                )}
                                                                {subField.type ===
                                                                    "text" && (
                                                                    <Input
                                                                        value={
                                                                            item[
                                                                                subField
                                                                                    .name
                                                                            ] ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleArrayChange(
                                                                                name,
                                                                                idx,
                                                                                subField.name,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                                {subField.type ===
                                                                    "textarea" && (
                                                                    <Textarea
                                                                        value={
                                                                            item[
                                                                                subField
                                                                                    .name
                                                                            ] ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleArrayChange(
                                                                                name,
                                                                                idx,
                                                                                subField.name,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

// export const saveSectionData = async (
//     jsonPath: string,
//     formData: any,
//     locale: "en" | "ar"
// ) => {
//     try {
//         const response = await fetch(`/api/content/${locale}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 jsonPath,
//                 data: formData,
//             }),
//         });

//         const result = await response.json();
//         if (result.success) {
//             console.log("Data saved successfully!");
//         } else {
//             console.error("Error saving data:", result.error);
//         }
//     } catch (error) {
//         console.error("Failed to save section data:", error);
//     }
// };

export const saveData = async (
    slug: string,
    jsonPath: string,
    formData: any
) => {
    try {
        const response = await fetch(`/api/content/${slug}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                slug,
                jsonPath,
                data: formData,
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || "Unknown error occurred");
        }

        console.log("Data updated successfully:", result);
        return result;
    } catch (error) {
        console.error("Failed to update section data:", error);
        throw error;
    }
};
