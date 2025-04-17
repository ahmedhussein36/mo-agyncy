"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createBrand } from "@/actions/brand-actions";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function CreateBrandPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = (data: any) => {
        const formData = new FormData();
        for (const key in data) formData.append(key, data[key]);

        startTransition(async () => {
            const result = await createBrand(formData);
            if (result?.success) {
                toast({
                    title: "Brand created successfully",
                    description: "Your brand has been created.",
                    variant: "default",
                });
                router.push("/dashboard/brands");
            } else {
                toast({
                    title: "Error creating brand",
                    description:
                        (result?.error as string) || "Something went wrong.",
                    variant: "destructive",
                });
                console.log(result.error || "Something went wrong");
            }
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Create New Brand</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-4 w-full lg:w-1/2"
            >
                <Input
                    {...register("name")}
                    placeholder="Name"
                    required
                    className={errors.name ? "border-red-500" : ""}
                />
                <Input
                    {...register("email")}
                    placeholder="Email"
                    required
                    type="email"
                    className={errors.email ? "border-red-500" : ""}
                />
                <Input {...register("phone")} placeholder="Phone" />
                <Input
                    {...register("website")}
                    placeholder="Website"
                    className={errors.website ? "border-red-500" : ""}
                />
                <Input
                    {...register("logo")}
                    placeholder="Logo URL"
                    className={errors.logo ? "border-red-500" : ""}
                />
                <Input {...register("industry")} placeholder="Industry" />
                <Textarea
                    {...register("description")}
                    placeholder="Description"
                    className="bg-transparent border border-gray-400"
                />
                <Input {...register("country")} placeholder="Country" />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Creating..." : "Create Brand"}
                </Button>
            </form>
        </div>
    );
}
