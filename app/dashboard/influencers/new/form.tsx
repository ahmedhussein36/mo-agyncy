"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { createInfluencer } from "@/actions/influencer-actions";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const platforms = [
    "Instagram",
    "Tiktok",
    "Youtube",
    "Facebook",
    "Twitter",
    "Other",
];

export default function InfluencerForm({ categories, audienceSizes }: any) {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [socialLinks, setSocialLinks] = useState<
        { platform: string; url: string; followers: number }[]
    >([]);

    const togglePlatform = (platform: string) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms(
                selectedPlatforms.filter((p) => p !== platform)
            );
            setSocialLinks((prev) =>
                prev.filter((p) => p.platform !== platform)
            );
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    const handleSocialLinksChange = (
        platform: string,
        field: "url" | "followers",
        value: string
    ) => {
        setSocialLinks((prev) => {
            const existing = prev.find((p) => p.platform === platform);
            if (existing) {
                return prev.map((p) =>
                    p.platform === platform
                        ? {
                              ...p,
                              [field]:
                                  field === "followers" ? Number(value) : value,
                          }
                        : p
                );
            }
            return [
                ...prev,
                {
                    platform,
                    url: field === "url" ? value : "",
                    followers: field === "followers" ? Number(value) : 0,
                },
            ];
        });
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            image: "",
            dateOfBirth: "",
            bio: "",
            gender: "",
            category: "",
            country: "",
            followers: 0 || "",
            socialLinks: "",
        },
    });

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const onSubmit = (data: any) => {
        const formData = new FormData();

        for (const key in data) {
            if (key !== "socialLinks") {
                formData.append(key, data[key]);
            }
        }

        formData.append("socialLinks", JSON.stringify(socialLinks));

        startTransition(async () => {
            const result = await createInfluencer(formData);
            if (result?.success) {
                toast({
                    title: "Influencer created successfully",
                    description: "Influencer has been created.",
                    variant: "default",
                });
                router.push("/dashboard/influencers");
            } else {
                toast({
                    title: "Error creating influencer",
                    description: "Something went wrong.",
                    variant: "destructive",
                });
                console.log(result.error || "Something went wrong");
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl mx-auto p-6 bg-gray-800/50 rounded-2xl "
        >
            <input
                type="hidden"
                value={JSON.stringify(socialLinks)}
                {...register("socialLinks")}
            />

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Name
                </label>
                <Input
                    {...register("name")}
                    required
                    className="bg-gray-800 border-gray-500 text-white"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Email
                </label>
                <Input
                    {...register("email")}
                    type="email"
                    required
                    className="bg-gray-800 border-gray-500 text-white"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Phone
                </label>
                <Input
                    {...register("phone")}
                    type="tel"
                    className="bg-gray-800 border-gray-500 text-white"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Date of Birth
                </label>
                <Input
                    {...register("dateOfBirth")}
                    type="date"
                    className="bg-gray-800 border-gray-500 text-white"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Gender</label>
                <Controller
                    control={control}
                    name="gender"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="bg-gray-800 text-white border-gray-500">
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.gender && (
                    <span className="text-red-500 text-sm">
                        Gender is required
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Category
                </label>
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="bg-gray-800 text-white border-gray-500">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white">
                                {categories.map(
                                    (cat: string, index: number) => (
                                        <SelectItem
                                            key={index}
                                            value={cat
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}
                                        >
                                            {cat}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.category && (
                    <span className="text-red-500 text-sm">
                        Category is required
                    </span>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Audience Size
                </label>
                <Controller
                    control={control}
                    name="followers"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="bg-gray-800 text-white border-gray-500">
                                <SelectValue placeholder="Select audience size" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white">
                                {audienceSizes.map(
                                    (size: { id: string; size: string }) => (
                                        <SelectItem
                                            key={size.id}
                                            value={size.size
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}
                                        >
                                            {size.size}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Bio
                </label>
                <Textarea
                    {...register("bio")}
                    placeholder="Enter bio..."
                    className="min-h-[100px] bg-gray-800 border-gray-500 text-white"
                />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-semibold text-zinc-300">
                    Social Platforms
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {platforms.map((platform) => (
                        <label
                            key={platform}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPlatforms.includes(platform)}
                                onChange={() => togglePlatform(platform)}
                                className="accent-brand"
                            />
                            <span className="text-zinc-200">{platform}</span>
                        </label>
                    ))}
                </div>

                {selectedPlatforms.map((platform) => (
                    <div
                        key={platform}
                        className="grid sm:grid-cols-2 gap-2 mt-2"
                    >
                        <Input
                            placeholder={`${platform} Link`}
                            className="bg-gray-800 border-gray-500 text-white"
                            onChange={(e) =>
                                handleSocialLinksChange(
                                    platform,
                                    "url",
                                    e.target.value
                                )
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Followers"
                            className="bg-gray-800 border-gray-500 text-white"
                            onChange={(e) =>
                                handleSocialLinksChange(
                                    platform,
                                    "followers",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
            </div>

            <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-white"
                disabled={isPending}
            >
                {isPending ? "Creating..." : "Create Influencer"}
            </Button>
        </form>
    );
}
