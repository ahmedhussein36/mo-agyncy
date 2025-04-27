"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { EditableSection } from "./admin/editable-section";

export function AboutCulture({
    dict,
    isAdmin = false,
    slug,
}: {
    dict: any;
    isAdmin: boolean;
    slug: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

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
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <section ref={ref} className="py-20 bg-black/20">
            <EditableSection
                slug={slug}
                jsonPath="culture"
                id="about.culture"
                fields={[
                    { name: "title", type: "text", label: "Title" },
                    { name: "subtitle", type: "text", label: "Subtitle" },
                    {
                        name: "values",
                        type: "array",
                        label: "Values",
                        itemFields: [
                            { name: "title", type: "text", label: "Title" },
                            {
                                name: "description",
                                type: "textarea",
                                label: "Description",
                            },
                        ],
                    },
                ]}
                initialData={{
                    title: dict.title,
                    subtitle: dict.subtitle,
                    values: dict.values || [
                        {
                            title: "Integrity",
                            description:
                                "We are honest and transparent in our actions.",
                        },
                        {
                            title: "Innovation",
                            description:
                                "We embrace creativity and seek new solutions.",
                        },
                        {
                            title: "Collaboration",
                            description:
                                "We work together to achieve common goals.",
                        },
                        {
                            title: "Excellence",
                            description:
                                "We strive for the highest quality in everything we do.",
                        },
                    ],
                }}
                isAdmin={isAdmin}
            >
                <div className="container px-4 md:px-6">
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
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                            {dict.subtitle ||
                                "Our values guide everything we do and shape our approach to influencer marketing."}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {dict.values.map((value: any, index: number) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="bg-black/30 relative bg-gradient-to-br from-transparent to-zinc-400/10 border-brand-500/50
                            service-card-container 
                            rounded-lg p-6 border hover:border-brand/50 transition-all duration-300"
                            >
                                <div className="">
                                    <span className=" opacity-50 text-transparent bg-clip-text bg-gradient-to-b from-blue-400/50 to-teal-300/50 absolute top-0 left-0 text-6xl font-bold">
                                        {index + 1}
                                    </span>
                                </div>
                                <h3 className=" relative z-10 text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-slate-50">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </EditableSection>
        </section>
    );
}
