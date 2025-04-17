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

// Sample FAQ data
const defaultFaqs = [
    {
        question: "What services do you offer?",
        answer: "We offer a comprehensive range of influencer marketing services including influencer matching, campaign management, content creation, and detailed analytics and reporting.",
    },
    {
        question: "How do you select influencers for brands?",
        answer: "We use a proprietary algorithm that matches brands with influencers based on audience demographics, engagement rates, content quality, and brand alignment to ensure authentic partnerships.",
    },
    {
        question: "What platforms do your influencers work with?",
        answer: "Our network includes influencers across all major social media platforms including Instagram, TikTok, YouTube, Twitter, and emerging platforms to ensure maximum reach.",
    },
    {
        question: "How do you measure campaign success?",
        answer: "We provide comprehensive analytics including reach, engagement, conversion rates, ROI, and audience insights to measure the success of each campaign against predefined KPIs.",
    },
    {
        question: "What is your pricing structure?",
        answer: "Our pricing varies based on campaign requirements, influencer tiers, and deliverables. We offer customized packages to suit different budgets and objectives.",
    },
    {
        question: "How long does it take to launch a campaign?",
        answer: "Typically, we can launch a campaign within 2-4 weeks from initial briefing, depending on the complexity and scale of the campaign.",
    },
];

export function FaqAccordion({
    dict = { title: "Frequently Asked Questions" },
    isAdmin = false,
}: {
    dict?: any;
    isAdmin?: boolean;
}) {
    const [faqs] = useState(defaultFaqs);

    return (
        <section id="faqs" className="py-16 bg-black/20 scroll-mt-10">
            <div className="container px-4 md:px-6">
                <EditableSection
                    id="faq-header"
                    type="title"
                    isAdmin={isAdmin}
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
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-gray-800 rounded-lg overflow-hidden bg-black/30 backdrop-blur-sm"
                            >
                                <EditableSection
                                    id={`faq-item-${index}`}
                                    type="mixed"
                                    isAdmin={isAdmin}
                                    initialData={{
                                        title: faq.question,
                                        content: faq.answer,
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
