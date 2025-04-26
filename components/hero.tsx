"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { WavyBackground } from "@/components/WavyBackground";
import { EditableSection } from "./admin/editable-section";

export function Hero({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin: boolean;
}) {
    const { lang } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);

    // Floating animation for background elements
    const floatingControls = useAnimation();

    useEffect(() => {
        // Start floating animation for background elements
        floatingControls.start({
            y: [0, -10, 0, 10, 0],
            transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: "easeInOut",
            },
        });
    }, [floatingControls]);

    const imageVariants = {
        initial: {
            opacity: 0,
            x: 40,
        },
        animate: {
            opacity: 1,
            x: -20,
            y: -10,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1,
                delay: 0.25,
            },
        },
    };

    return (
        <WavyBackground waveOpacity={0.1}>
            <section
                ref={containerRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="container relative z-10 px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <EditableSection
                            jsonPath="home.hero"
                            id="home.hero"
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "title",
                                    type: "text",
                                    label: "Title",
                                },
                                {
                                    name: "subtitle",
                                    type: "textarea",
                                    label: "Subtitle",
                                },
                                {
                                    name: "cta",
                                    type: "text",
                                    label: "Button lable",
                                },
                                {
                                    name: "image",
                                    type: "image",
                                    label: "Image",
                                },
                            ]}
                            initialData={{
                                title: dict.title,
                                subtitle: dict.subtitle,
                                cta: dict.cta,
                                image: dict.image,
                            }}
                        >
                            {/* Text content - aligned to start */}
                            <div className="flex flex-col items-center md:items-start text-left space-y-8">
                                <motion.div className="space-y-4">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-brand"
                                    >
                                        {dict.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                        className="max-w-[500px] text-slate-100 md:text-xl"
                                    >
                                        {dict.subtitle}
                                    </motion.p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-brand hover:bg-brand-dark relative overflow-hidden group smooth-transition"
                                    >
                                        <Link href={`/${lang}/register/brand`}>
                                            <span className="relative z-10">
                                                {dict.cta}
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            <span className="absolute -inset-[3px] bg-gradient-to-r from-brand to-brand-light rounded-lg opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300 group-hover:duration-200"></span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </EditableSection>
                        {/* Image - aligned to end */}
                        <motion.div
                            className="justify-end items-center hidden md:flex"
                            variants={imageVariants}
                            initial="initial"
                            animate={"animate"}
                        >
                            <Image
                                src={
                                    dict.image ||
                                    "/uploads/our-services-image.png"
                                }
                                width={600}
                                height={500}
                                alt="Hero illustration"
                                className="object-contain max-w-full h-auto"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
                {/* Scroll down indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-sm text-muted-foreground">
                            {lang === "en" ? "Scroll Down" : "مرر لأسفل"}
                        </span>
                        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
                            <motion.div
                                animate={{
                                    y: [0, 12, 0],
                                }}
                                transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1.5,
                                }}
                                className="w-1 h-1 bg-brand rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>
        </WavyBackground>
    );
}
