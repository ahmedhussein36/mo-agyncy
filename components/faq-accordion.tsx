"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { EditableSection } from "@/components/admin/editable-section";

export function FaqAccordion({
    dict,
    isAdmin = false,
}: {
    dict: {
        title: string;
        items: { id: string; question: string; answer: string }[];
    };
    isAdmin?: boolean;
}) {
    return (
        <section id="faqs" className="py-16 bg-black/20 scroll-mt-10">
            <div className="container px-4 md:px-6">
                <EditableSection
                    jsonPath="faq.title"
                    id="faq.title"
                    isAdmin={isAdmin}
                    fields={[{ name: "title", type: "text", label: "Title" }]}
                    initialData={{
                        title: dict.title,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {dict.title}
                        </h2>
                    </motion.div>
                </EditableSection>

                <div className="max-w-3xl mx-auto">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-4"
                    >
                        {dict.items.map((faq, index) => (
                            <AccordionItem
                                key={faq.id}
                                value={`item-${index}`}
                                className="border border-gray-800 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm"
                            >
                                <EditableSection
                                    jsonPath={`faq.items.${index}`}
                                    id={`faq.items.${index}`}
                                    isAdmin={isAdmin}
                                    fields={[
                                        {
                                            name: "id",
                                            type: "text",
                                            label: "id",
                                        },
                                        {
                                            name: "question",
                                            type: "text",
                                            label: "Question",
                                        },
                                        {
                                            name: "answer",
                                            type: "textarea",
                                            label: "Answer",
                                        },
                                    ]}
                                    initialData={{
                                        id: faq.id,
                                        question: faq.question,
                                        answer: faq.answer,
                                    }}
                                >
                                    <AccordionTrigger className="px-6 py-4 hover:bg-black/40 transition-colors">
                                        <span className="text-left font-medium">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </EditableSection>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
