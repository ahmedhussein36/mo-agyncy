"use client";

import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateInfluencer } from "@/actions/influencer-actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
    audienceSizes,
    creatorCategories,
    InfluencerTextFields,
    InputField,
    platforms,
    SelectField,
} from "@/components/form/form-field";

export type Influencer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    dateOfBirth: Date;
    bio: string;
    gender: string;
    category: string;
    country?: string;
    followers: string;
    socialLinks: {
        platform: string;
        url: string;
        followers: string;
    }[];
};

export default function InfluencerForm({
    influencer,
}: {
    influencer: Influencer;
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [socialLinks, setSocialLinks] = useState<
        { platform: string; url: string; followers: string }[]
    >([]);

    // Load social links from influencer data
    useEffect(() => {
        if (influencer?.socialLinks?.length) {
            setSocialLinks(influencer.socialLinks);
            setSelectedPlatforms(
                influencer.socialLinks.map((s: any) => s.platform)
            );
        }
    }, [influencer]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...influencer,
            dateOfBirth:
                influencer.dateOfBirth.toISOString().slice(0, 10) || "",
        },
    });

    const togglePlatform = (platform: string) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));
            setSocialLinks((prev) =>
                prev.filter((p) => p.platform !== platform)
            );
        } else {
            setSelectedPlatforms((prev) => [...prev, platform]);
        }
    };

    const handleSocialLinksChange = (
        platform: string,
        field: "url" | "followers",
        value: string
    ) => {
        setSocialLinks((prev: any[]) => {
            const existing = prev.find((p) => p.platform === platform);
            if (existing) {
                return prev.map((p) =>
                    p.platform === platform
                        ? {
                              ...p,
                              [field]: field === "followers" ? value : value,
                          }
                        : p
                );
            }
            return [
                ...prev,
                {
                    platform,
                    url: field === "url" ? value : "",
                    followers: field === "followers" ? value : 0,
                },
            ];
        });
    };

    const onSubmit = (data: any) => {
        const formData = new FormData();

        for (const key in data) {
            if (key !== "socialLinks") {
                formData.append(key, data[key]);
            }
        }

        formData.append("socialLinks", JSON.stringify(socialLinks));

        startTransition(async () => {
            try {
                const res = await updateInfluencer(influencer.id, formData);
                if (res.success) {
                    toast({
                        title: "Success",
                        description:
                            res.success || "Influencer updated successfully.",
                    });
                    router.refresh();
                    router.back();
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to update influencer",
                        variant: "destructive",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl mx-auto p-6 bg-gray-800/50 rounded-2xl"
        >
            {/* Hidden social links */}
            <input
                type="hidden"
                value={JSON.stringify(socialLinks)}
                {...register("socialLinks")}
            />
            {InfluencerTextFields.map((input, index) => {
                return (
                    <InputField
                        key={index}
                        name={input.name}
                        register={register}
                        type={input.type}
                        label={input.label}
                        required={input.required}
                        errors={errors}
                    />
                );
            })}
            <div className=" flex-grow flex justify-between items-center gap-4">
                {/* Gender */}
                <SelectField
                    control={control}
                    name="gender"
                    label="Choose Gender"
                    options={["Male", "Female"]}
                    errors={errors}
                />

                {/* Category */}
                <SelectField
                    control={control}
                    name="category"
                    label="Choose Category"
                    options={creatorCategories}
                    errors={errors}
                />

                {/* Audience Size */}
                <SelectField
                    control={control}
                    name="followers"
                    label="Choose Audience Size"
                    options={audienceSizes}
                    errors={errors}
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                    Write a short bio for influencer
                </label>
                <Textarea
                    {...register("bio")}
                    placeholder="Bio"
                    className=" border-gray-400 bg-gray-700/50"
                />
            </div>

            {/* Social platforms checkboxes */}
            <div>
                <p className="text-sm font-semibold text-zinc-300">
                    Social Platforms
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {platforms.map((platform) => (
                        <label
                            key={platform}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPlatforms.includes(
                                    platform.toLowerCase()
                                )}
                                onChange={() => togglePlatform(platform)}
                                className="accent-brand"
                            />
                            <span>{platform}</span>
                        </label>
                    ))}
                </div>

                {selectedPlatforms.map((platform) => {
                    const existing = socialLinks.find(
                        (p) => p.platform === platform
                    );
                    return (
                        <div
                            key={platform}
                            className="grid sm:grid-cols-2 gap-2 mt-2"
                        >
                            <Input
                                placeholder={`${platform} Link`}
                                defaultValue={existing?.url || ""}
                                onChange={(e) =>
                                    handleSocialLinksChange(
                                        platform,
                                        "url",
                                        e.target.value
                                    )
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Followers"
                                defaultValue={existing?.followers || ""}
                                onChange={(e) =>
                                    handleSocialLinksChange(
                                        platform,
                                        "followers",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    );
                })}
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
