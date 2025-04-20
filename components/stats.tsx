"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { EditableSection } from "@/components/admin/editable-section";

export function Stats({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [counts, setCounts] = useState<number[]>([]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    // Extract numeric values from the stats
    useEffect(() => {
        const statValues = dict.items.map((stat: any) => {
            const numericValue = Number.parseInt(stat.value.replace(/\D/g, ""));
            return isNaN(numericValue) ? 0 : numericValue;
        });

        // Initialize with zeros
        setCounts(statValues.map(() => 0));
    }, [dict.items]);

    // Animate the counters when in view
    useEffect(() => {
        if (!isInView || counts.length === 0) return;

        const statValues = dict.items.map((stat: any) => {
            const numericValue = Number.parseInt(stat.value.replace(/\D/g, ""));
            return isNaN(numericValue) ? 0 : numericValue;
        });

        const duration = 2000; // 2 seconds for the animation
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);

        let frame = 0;
        const timerId = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;

            if (frame === totalFrames) {
                setCounts(statValues);
                clearInterval(timerId);
            } else {
                setCounts(
                    statValues?.map((value: number) =>
                        Math.floor(progress * value)
                    )
                );
            }
        }, frameDuration);

        return () => clearInterval(timerId);
    }, [isInView, dict.items, counts.length]);

    return (
        <section
            ref={ref}
            className="py-20 bg-gradient-to-b from-black/50 to-background"
        >
            <div className="container px-4 md:px-6">
                <EditableSection
                    jsonPath="home.stats.title"
                    id="home.state.title"
                    isAdmin={isAdmin}
                    fields={[{ name: "title", type: "text", label: "Title" }]}
                    initialData={{
                        title: dict.title,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {dict.title}
                        </h2>
                    </motion.div>
                </EditableSection>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-2 gap-8 md:grid-cols-4"
                >
                    {dict?.items &&
                        dict?.items?.map((stat: any, index: number) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="flex flex-col items-center justify-center space-y-2 border-r border-gray-800 last:border-r-0 px-4"
                            >
                                <EditableSection
                                    jsonPath={`home.stats.items.${index}`}
                                    id={`stats.item-${index}`}
                                    isAdmin={isAdmin}
                                    fields={[
                                        {
                                            name: "value",
                                            type: "text",
                                            label: "Value",
                                        },
                                        {
                                            name: "label",
                                            type: "text",
                                            label: "Label",
                                        },
                                    ]}
                                    initialData={{
                                        value: stat.value,
                                        label: stat.label,
                                    }}
                                >
                                    <div className="text-4xl font-bold text-brand md:text-5xl">
                                        {counts[index] || 0}
                                        {stat.value.includes("M") ? "M" : ""}
                                        {stat.value.includes("K") ? "K" : ""}
                                        {stat.value.includes("+") ? "+" : "+"}
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground md:text-base text-center mt-4">
                                        {stat.label}
                                    </div>
                                </EditableSection>
                            </motion.div>
                        ))}
                </motion.div>
            </div>
        </section>
    );
}
