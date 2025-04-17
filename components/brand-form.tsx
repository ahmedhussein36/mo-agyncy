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

export function BrandForm({ dict }: { dict: any }) {
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

    const industries = [
        "Fashion & Apparel",
        "Beauty & Cosmetics",
        "Health & Wellness",
        "Travel & Hospitality",
        "Food & Beverage",
        "Technology",
        "Finance & Banking",
        "Home & Lifestyle",
        "Entertainment",
        "Education",
        "Other",
    ];

    const budgetRanges = [
        "Under $5,000",
        "$5,000 - $10,000",
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "$50,000 - $100,000",
        "$100,000+",
    ];

    const timelines = [
        "Immediate (within 1 month)",
        "Short-term (1-3 months)",
        "Medium-term (3-6 months)",
        "Long-term (6+ months)",
    ];

    return (
        <section className="py-24 bg-zinc-800">
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
                                    Inquiry Submitted!
                                </h3>
                                <p className="text-muted-foreground">
                                    Thank you for your interest in partnering
                                    with us. Our team will review your inquiry
                                    and get back to you shortly.
                                </p>
                                <Button
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-brand hover:bg-brand-dark"
                                >
                                    Submit Another Inquiry
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="company"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.name}
                                    </label>
                                    <Input
                                        id="company"
                                        required
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contact"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.contact}
                                    </label>
                                    <Input
                                        id="contact"
                                        required
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.email}
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.phone}
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="website"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.website}
                                    </label>
                                    <Input
                                        id="website"
                                        type="url"
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="industry"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.industry}
                                    </label>
                                    <Select>
                                        <SelectTrigger className="bg-background/50">
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {industries.map(
                                                (industry, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={industry
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}
                                                    >
                                                        {industry}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="goals"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.goals}
                                    </label>
                                    <Textarea
                                        id="goals"
                                        className="min-h-[100px] bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="budget"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.budget}
                                    </label>
                                    <Select>
                                        <SelectTrigger className="bg-background/50">
                                            <SelectValue placeholder="Select budget range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {budgetRanges.map(
                                                (range, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={range
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}
                                                    >
                                                        {range}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="timeline"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.timeline}
                                    </label>
                                    <Select>
                                        <SelectTrigger className="bg-background/50">
                                            <SelectValue placeholder="Select timeline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timelines.map(
                                                (timeline, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={timeline
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )}
                                                    >
                                                        {timeline}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
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
