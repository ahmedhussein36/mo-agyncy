"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { EditableSection } from "@/components/admin/editable-section";

export function ContactForm({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
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

    return (
        <section className="py-24 bg-black/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <EditableSection
                        id="contact.header"
                        jsonPath="contact.header"
                        isAdmin={isAdmin}
                        fields={[
                            { name: "title", type: "text", label: "Title" },
                            {
                                name: "subtitle",
                                type: "textarea",
                                label: "Subtitle",
                            },
                        ]}
                        initialData={{
                            title: dict.header.title,
                            subtitle: dict.header.subtitle,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-2"
                        >
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.header.title}
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {dict.header.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>
                </div>
                <div
                    ref={formRef}
                    className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -50 }
                        }
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <EditableSection
                            jsonPath="contact.info.address"
                            id="contact.info.address"
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "label",
                                    type: "text",
                                    label: "Label",
                                },
                                {
                                    name: "address",
                                    type: "text",
                                    label: "Address",
                                },
                            ]}
                            initialData={{
                                label: dict.info.address.label,
                                address: dict.info.address.address,
                            }}
                        >
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <MapPin className="h-6 w-6 text-brand" />
                                <div>
                                    <h3 className="font-medium">
                                        {dict.info.address.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {dict.info.address.address}
                                    </p>
                                </div>
                            </div>
                        </EditableSection>

                        <EditableSection
                            jsonPath="contact.info.email"
                            id="contact.info.email"
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "label",
                                    type: "text",
                                    label: "Label",
                                },
                                {
                                    name: "email",
                                    type: "text",
                                    label: "Email",
                                },
                            ]}
                            initialData={{
                                label: dict.info.email.label,
                                email: dict.info.email.email,
                            }}
                        >
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <Mail className="h-6 w-6 text-brand" />
                                <div>
                                    <h3 className="font-medium">
                                        {dict.info.email.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {dict.info.email.email}
                                    </p>
                                </div>
                            </div>
                        </EditableSection>

                        <EditableSection
                            jsonPath="contact.info.phone"
                            id="contact.info.phone"
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "label",
                                    type: "text",
                                    label: "Label",
                                },
                                {
                                    name: "phone",
                                    type: "text",
                                    label: "Phone",
                                },
                            ]}
                            initialData={{
                                label: dict.info.phone.label,
                                phone: dict.info.phone.phone,
                            }}
                        >
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <Phone className="h-6 w-6 text-brand" />
                                <div>
                                    <h3 className="font-medium">
                                        {dict.info.phone.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {dict.info.phone.phone}
                                    </p>
                                </div>
                            </div>
                        </EditableSection>

                        <EditableSection
                            jsonPath="contact.info.location"
                            id="contact.info.location"
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "label",
                                    type: "text",
                                    label: "Label",
                                },
                                {
                                    name: "location",
                                    type: "text",
                                    label: "Location",
                                },
                            ]}
                            initialData={{
                                label: dict.info.location.label,
                                location: dict.info.location.location,
                            }}
                        >
                            <div className="aspect-video overflow-hidden rounded-lg">
                                {MapEmbed({
                                    place:
                                        dict.info.location.location || "maadi",
                                })}
                            </div>
                        </EditableSection>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: 50 }
                        }
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {isSuccess ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-lg border border-green-500 bg-green-500/10 p-8 text-center">
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
                                    Message Sent!
                                </h3>
                                <p className="text-muted-foreground">
                                    Thank you for contacting us. We'll get back
                                    to you shortly.
                                </p>
                                <Button
                                    onClick={() => setIsSuccess(false)}
                                    className="bg-brand hover:bg-brand-dark button-hover"
                                >
                                    Send Another Message
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
                                    <Input
                                        id="name"
                                        required
                                        className="bg-background/50 form-element"
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
                                        className="bg-background/50 form-element"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {dict.form.message}
                                    </label>
                                    <Textarea
                                        id="message"
                                        required
                                        className="min-h-[150px] bg-background/50 form-element"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-brand hover:bg-brand-dark button-hover"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
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

export function MapEmbed({ place }: { place: string }) {
    const location = `https://www.google.com/maps?q=${encodeURIComponent(
        place
    )}&output=embed`;

    return (
        <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
                src={location}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                title="Map"
            />
        </div>
    );
}
