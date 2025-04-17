"use client";

import { motion } from "framer-motion";
import { EditableSection } from "@/components/admin/editable-section";

export function AboutHero({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    return (
        <section className="relative py-20 bg-black/40 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto">
                    <EditableSection
                        jsonPath="about"
                        id="about-hero"
                        type="mixed"
                        isAdmin={isAdmin}
                        initialData={{
                            title: dict.title,
                            content: dict.subtitle,
                        }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl w-full font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-brand"
                        >
                            {dict.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-muted-foreground md:text-2xl max-w-[700px]"
                        >
                            {dict.subtitle}
                        </motion.p>
                    </EditableSection>
                </div>
            </div>
        </section>
    );
}
