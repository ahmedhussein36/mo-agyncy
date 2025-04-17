"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { EditableSection } from "@/components/admin/editable-section";

export function ContactCTA({
    dict,
    lang,
    isAdmin = false,
}: {
    dict: any;
    lang: Locale;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            className="py-20 bg-gradient-to-b from-black/40 to-background"
        >
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <EditableSection
                        id="contact-cta"
                        type="mixed"
                        isAdmin={isAdmin}
                        initialData={{
                            title: dict.title,
                            content: dict.subtitle,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                                isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 20 }
                            }
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.title}
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                {dict.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="pt-6"
                    >
                        <div className="flex w-full justify-center items-center space-x-2 rtl:space-x-reverse">
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="rounded-full transition-all border-brand duration-300 hover:border-brand button-hover"
                            >
                                <Link href={`/${lang}/register/influencer`}>
                                    {dict.register?.influencer ||
                                        "Join as Influencer"}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="sm"
                                className="bg-brand hover:bg-brand-dark rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(var(--brand),0.3)] hover:shadow-[0_0_15px_rgba(var(--brand),0.5)] button-hover"
                            >
                                <Link href={`/${lang}/register/brand`}>
                                    {dict.register?.brand || "Partner with Us"}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
