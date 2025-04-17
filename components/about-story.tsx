"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableSection } from "./admin/editable-section";

export function AboutStory({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin: boolean;
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
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1"
                    >
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1661310038586-a99299befcc9?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Our journey"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-sm font-medium bg-brand text-white px-3 py-1 rounded-full">
                                Our Journey
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={
                            isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: 50 }
                        }
                        transition={{ duration: 0.8 }}
                        className="space-y-4 order-1 md:order-2"
                    >
                        <EditableSection
                            jsonPath="about.story"
                            id="about-story"
                            type="mixed"
                            isAdmin={isAdmin}
                            initialData={{
                                title: dict.title,
                                content: dict.content,
                            }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
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

                            <div className="pt-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="h-px bg-gray-700 flex-grow"></div>
                                    <span className="text-brand font-medium">
                                        2024
                                    </span>
                                    <div className="h-2 w-2 rounded-full bg-brand"></div>
                                    <span className="text-brand font-medium">
                                        Present
                                    </span>
                                    <div className="h-px bg-gray-700 flex-grow"></div>
                                </div>
                            </div>
                        </EditableSection>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
