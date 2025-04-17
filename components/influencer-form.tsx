"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import SocialMediaInputs from "./social-inputs";

export function InfluencerForm({ dict }: { dict: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(formRef, { once: true, amount: 0.2 });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const categories = [
        "Fashion & Style",
        "Beauty & Makeup",
        "Fitness & Health",
        "Travel & Adventure",
        "Food & Cooking",
        "Technology & Gaming",
        "Business & Finance",
        "Lifestyle & Home",
        "Entertainment",
        "Other",
    ];

    const audienceSizes = [
        "1K - 10K",
        "10K - 50K",
        "50K - 100K",
        "100K - 500K",
        "500K - 1M",
        "1M+",
    ];

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
                <div ref={formRef} className="mx-auto mt-12 max-w-2xl">
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.name}
                                    </label>
                                    <Input id="name" required />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.email}
                                    </label>
                                    <Input id="email" type="email" required />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.phone}
                                    </label>
                                    <Input id="phone" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Date Of Birth
                                    </label>
                                    <Input id="dateOfBirth" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="gender"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Gender
                                    </label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem key={1} value="male">
                                                Male
                                            </SelectItem>
                                            <SelectItem key={1} value="female">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 mt-16">
                                    <h3 className="text-sm font-medium leading-none pb-2 border-b">
                                        {dict.form.social.title}
                                    </h3>
                                    <SocialMediaInputs />
                                    {/* <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="instagram"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Instagram
                                            </label>
                                            <Input id="instagram" />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="tiktok"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Tiktok
                                            </label>
                                            <Input id="tiktok" />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="youtube"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Youtube
                                            </label>
                                            <Input id="youtube" />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="facebook"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                               Facebook
                                            </label>
                                            <Input id="facebook" />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="twitter"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Twitter
                                            </label>
                                            <Input id="tiwtter" />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="twitter"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Other
                                            </label>
                                            <Input id="other" />
                                        </div>
                                    </div> */}
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="category"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.category}
                                    </label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(
                                                (category, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={category
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="audience"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.audience}
                                    </label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select audience size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {audienceSizes.map(
                                                (size, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={size
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}
                                                    >
                                                        {size}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="bio"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.bio}
                                    </label>
                                    <Textarea
                                        id="bio"
                                        className="min-h-[100px] bg-background/50"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-brand hover:bg-brand-dark"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
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
