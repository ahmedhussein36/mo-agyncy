"use client";

import type React from "react";

import { useState, useRef, useTransition } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
    audienceSizes,
    creatorCategories,
    InfluencerTextFields,
    InputField,
    platforms,
    SelectField,
} from "./form/form-field";
import { useForm } from "react-hook-form";
import { createInfluencer } from "@/actions/influencer-actions";
import { useToast } from "./ui/use-toast";

export function InfluencerForm({ dict }: { dict: any }) {
    const formRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(formRef, { once: true, amount: 0.2 });
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [socialLinks, setSocialLinks] = useState<
        { platform: string; url: string; followers: number }[]
    >([]);

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
            status: "PENDING",
            bio: "",
            gender: "",
            category: "",
            country: "",
            followers: "",
        },
    });

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
        field: "followers" | "url",
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

    const [isPending, startTransition] = useTransition();
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
            try {
                const result = await createInfluencer(formData);
                if (result?.success) {
                    setIsSuccess(true);
                    toast({
                        title: "Success",
                        description: "Your request has been sent Successfully.",
                        variant: "default",
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Something went wrong.",
                        variant: "destructive",
                    });
                    console.log(result.error || "Something went wrong");

                }
            } catch (error) {
                toast({
                    title: "Error creating influencer",
                    description: "Something went wrong.",
                    variant: "destructive",
                });
                console.log(error || "Something went wrong");
            }
        });
    };

    return (
        <section className="py-24 bg-">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-2"
                    >
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {dict.title}
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            {dict.subtitle}
                        </p>
                    </motion.div>
                </div>
                <div
                    ref={formRef}
                    className="mx-auto mt-12 max-w-2xl bg-zinc-800 border-0 rounded-lg"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 50 }
                        }
                        transition={{ duration: 0.8 }}
                        className="rounded-lg border bg-zinc-900/50 p-6 shadow-sm"
                    >
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                                <div className="text-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-12 w-12"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold">
                                    Application Submitted!
                                </h3>
                                <p className="text-muted-foreground">
                                    Thank you for your interest in joining our
                                    influencer network. We'll review your
                                    application and get back to you shortly.
                                </p>
                                <Button
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-brand hover:bg-brand-dark"
                                >
                                    Submit Another Application
                                </Button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {InfluencerTextFields.map((input, index) => {
                                    return (
                                        <InputField
                                            key={index}
                                            name={input.name}
                                            register={register}
                                            type={input.type}
                                            label={dict.form[input.name]}
                                            required={input.required}
                                            errors={errors}
                                            className=" bg-zinc-700/50"
                                        />
                                    );
                                })}
                                <div className=" flex-grow flex justify-between items-center gap-4">
                                    {/* Gender */}
                                    <SelectField
                                        control={control}
                                        name="gender"
                                        label={dict.form.gender}
                                        options={["Male", "Female"]}
                                        errors={errors}
                                        className=" bg-zinc-700/50"
                                    />

                                    {/* Category */}
                                    <SelectField
                                        control={control}
                                        name="category"
                                        label={dict.form.category}
                                        options={creatorCategories}
                                        errors={errors}
                                        className=" bg-zinc-700/50"
                                    />

                                    {/* Audience Size */}
                                    <SelectField
                                        control={control}
                                        name="followers"
                                        label={dict.form.audience}
                                        options={audienceSizes}
                                        errors={errors}
                                        className=" bg-zinc-700/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-zinc-300">
                                        {dict.form.bio}
                                    </label>
                                    <Textarea
                                        {...register("bio")}
                                        placeholder="Bio"
                                        className=" border-gray-400 bg-zinc-700/50"
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
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPlatforms.includes(
                                                        platform
                                                    )}
                                                    onChange={() =>
                                                        togglePlatform(platform)
                                                    }
                                                    className="accent-brand"
                                                />
                                                <span>{platform}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {selectedPlatforms.map((platform) => {
                                        return (
                                            <div
                                                key={platform}
                                                className="grid sm:grid-cols-2 gap-2 mt-2"
                                            >
                                                <Input
                                                    placeholder={`${platform} Link`}
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

                                <Button
                                    type="submit"
                                    className="w-full bg-brand hover:bg-brand-dark"
                                    disabled={isPending}
                                >
                                    {isPending
                                        ? "Submitting..."
                                        : dict.form.submit}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
