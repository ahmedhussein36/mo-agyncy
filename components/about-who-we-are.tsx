"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableSection } from "@/components/admin/editable-section";

export function AboutWhoWeAre({
    dict,
    isAdmin = false,
    slug,
}: {
    dict: any;
    isAdmin?: boolean;
    slug: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-black/30">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 items-center">
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
                            slug={slug}
                            jsonPath="whoWeAre"
                            id="about-who-we-are"
                            isAdmin={isAdmin}
                            fields={[
                                { name: "title", type: "text", label: "Title" },
                                {
                                    name: "content",
                                    type: "textarea",
                                    label: "Content",
                                },
                                {
                                    name: "image",
                                    type: "text",
                                    label: "Image URL",
                                },
                            ]}
                            initialData={{
                                title: dict.title,
                                content: dict.content,
                                image:
                                    dict.image ||
                                    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744451580/uploads/Strategic-Planning-Blog-Image-1-2_ktyerm.jpg",
                            }}
                        >
                            <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
                                {dict.title}
                            </h2>
                            <div className="space-y-4">
                                {dict.content
                                    .split("\n")
                                    .map((line: string, index: number) => (
                                        <p
                                            key={index}
                                            className=" text-muted-foreground md:text-lg"
                                        >
                                            {line}
                                        </p>
                                    ))}
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
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                    >
                        <div className="relative aspect-video">
                            <Image
                                src={
                                    dict.image ||
                                    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744451580/uploads/Strategic-Planning-Blog-Image-1-2_ktyerm.jpg"
                                }
                                alt="Our team"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-sm font-medium bg-brand text-white px-3 py-1 rounded-full">
                                    Our Team
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
