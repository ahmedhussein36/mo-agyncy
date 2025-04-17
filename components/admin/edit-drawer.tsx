import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";

interface EditDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    sectionId: string;
    sectionType: "title" | "content" | "mixed" | "image";
    initialData: {
        title?: string;
        content?: string;
        imageUrl?: string;
    };
    onSave: (data: any) => Promise<boolean>; // Now returns a Promise
}

export function EditDrawer({
    isOpen,
    onClose,
    sectionId,
    sectionType,
    initialData,
    onSave,
}: EditDrawerProps) {
    const { toast } = useToast();
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [image, setImage] = useState(initialData.imageUrl || "");
    const [isLoading, setIsLoading] = useState(false);

    // Reset form when initialData changes
    useEffect(() => {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = {
                ...(sectionType === "title" || sectionType === "mixed"
                    ? { title }
                    : {}),
                ...(sectionType === "content" || sectionType === "mixed"
                    ? { content }
                    : {}),
            };

            // Call the onSave prop which should now return a Promise
            const success = await onSave(data);

            if (success) {
                toast({
                    title: "Changes saved",
                    description: "Your changes have been successfully saved.",
                });
                onClose();
            } else {
                throw new Error("Failed to save changes");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save changes. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-md bg-black/80 border-gray-800 backdrop-blur-md">
                <SheetHeader>
                    <SheetTitle>Edit Section</SheetTitle>
                    <SheetDescription>
                        Make changes to the section content. Click save when
                        you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {(sectionType === "title" || sectionType === "mixed") && (
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                                className="bg-background/50"
                            />
                        </div>
                    )}

                    {(sectionType === "content" || sectionType === "mixed") && (
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter content"
                                className="min-h-[200px] bg-background/50"
                            />
                        </div>
                    )}
                    {sectionType === "image" && (
                        <div className="space-y-2">
                            <Label htmlFor="image">Title</Label>
                            <Input
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Enter image URL"
                                className="bg-background/50"
                            />
                        </div>
                    )}

                    <SheetFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-brand hover:bg-brand-dark"
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
