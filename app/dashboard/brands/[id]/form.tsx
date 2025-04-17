// /app/brand/[id]/form.tsx
"use client";

import { updateBrand } from "@/actions/brand-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function EditBrandForm({ brand }: { brand: any }) {
    const { register, handleSubmit } = useForm({ defaultValues: brand });
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (const key in data) formData.append(key, data[key]);

        startTransition(async () => {
            const result = await updateBrand(brand.id, formData);
            if (result?.success) {
                toast({
                    title: "Brand updated successfully",
                    description: "Your brand has been updated.",
                });
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description:
                        (result.error as string) || "Something went wrong",
                    variant: "destructive",
                });
                console.log(result.error || "Something went wrong");
            }
        });
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-4 w-full lg:w-1/2"
        >
            <Input {...register("name")} placeholder="Name" required />
            <Input
                {...register("email")}
                placeholder="Email"
                required
                type="email"
            />
            <Input {...register("phone")} placeholder="Phone" />
            <Input {...register("website")} placeholder="Website" />
            <Input {...register("logo")} placeholder="Logo URL" />
            <Input {...register("industry")} placeholder="Industry" />
            <Textarea
                {...register("description")}
                placeholder="Description"
                className="bg-transparent border border-gray-400"
            />
            <Input {...register("country")} placeholder="Country" />
            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
            </Button>
        </form>
    );
}
