"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {EditableSection} from "@/components/admin/editable-section";

export function About({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-black/30">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -50 }
                        }
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <EditableSection
                            jsonPath="about"
                            id="about-section"
                            type="mixed"
                            isAdmin={isAdmin}
                            initialData={{
                                title: dict.title,
                                content: dict.description,
                            }}
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                {dict.title}
                            </h2>
                            <p className="text-muted-foreground md:text-lg">
                                {dict.description}
                            </p>
                        </EditableSection>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: 50 }
                        }
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="rounded-lg border bg-card p-6">
                            <EditableSection
                                jsonPath="about.mission"
                                id="about-mission"
                                type="mixed"
                                isAdmin={isAdmin}
                                initialData={{
                                    title: "Mission",
                                    content: dict.mission,
                                }}
                            >
                                <h3 className="text-xl font-bold mb-2">
                                    Mission
                                </h3>
                                <p className="text-muted-foreground">
                                    {dict.mission}
                                </p>
                            </EditableSection>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <EditableSection
                                jsonPath="about.vision"
                                id="about-vision"
                                type="mixed"
                                isAdmin={isAdmin}
                                initialData={{
                                    title: "Vision",
                                    content: dict.vision,
                                }}
                            >
                                <h3 className="text-xl font-bold mb-2">
                                    Vision
                                </h3>
                                <p className="text-muted-foreground">
                                    {dict.vision}
                                </p>
                            </EditableSection>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
