"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableSection } from "@/components/admin/editable-section";

export function AboutWhoWeAre({
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
                            jsonPath="about.whoWeAre"
                            id="about-who-we-are"
                            type="mixed"
                            isAdmin={isAdmin}
                            initialData={{
                                title: dict.title,
                                content: dict.content,
                            }}
                        >
                            <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">
                                {dict.title}
                            </h2>
                            <div className="space-y-4">
                                {dict.content.split('\n').map(
                                    (line: string, index: number) => (
                                        <p
                                            key={index}
                                            className=" text-muted-foreground md:text-lg"
                                        >
                                            {line}
                                        </p>
                                    )
                                )}
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
                        <EditableSection
                            jsonPath="about.whoWeAre.imageUrl"
                            id="about-who-we-are-image"
                            type="image"
                            isAdmin={isAdmin}
                            initialData={{
                                imageUrl:
                                    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744451580/uploads/Strategic-Planning-Blog-Image-1-2_ktyerm.jpg?q=auto&f=auto",
                            }}
                            className="aspect-video"
                        >
                            <Image
                                src="https://res.cloudinary.com/ds04j5ge0/image/upload/v1744451580/uploads/Strategic-Planning-Blog-Image-1-2_ktyerm.jpg?q=auto&f=auto"
                                alt="Our team"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="text-sm font-medium bg-brand text-white px-3 py-1 rounded-full">
                                    Our Team
                                </span>
                            </div>
                        </EditableSection>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
