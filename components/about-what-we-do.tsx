"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Users, BarChart, PenTool, LineChart } from "lucide-react";
import { EditableSection } from "./admin/editable-section";

export function AboutWhatWeDo({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const icons = [
        <Users key="users" className="h-10 w-10 text-brand" />,
        <BarChart key="barchart" className="h-10 w-10 text-brand" />,
        <PenTool key="pentool" className="h-10 w-10 text-brand" />,
        <LineChart key="linechart" className="h-10 w-10 text-brand" />,
    ];

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
            <div className="container px-4 md:px-6">
                <EditableSection
                    jsonPath="about.whatWeDo.header"
                    id="about.whatWeDo.header"
                    isAdmin={isAdmin}
                    fields={[
                        {
                            name: "title",
                            type: "text",
                            label: "Title",
                        },
                        {
                            name: "subtitle",
                            type: "text",
                            label: "Subtitle",
                        },
                    ]}
                    initialData={{
                        title: dict.header.title,
                        subtitle: dict.header.subtitle,
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
                            {dict.header.title}
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                            {dict.header.subtitle ||
                                ` We offer comprehensive influencer marketing
                            solutions tailored to your brand's unique needs.`}
                        </p>
                    </motion.div>
                </EditableSection>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {dict.services.map((service: any, index: number) => (
                        <EditableSection
                            key={index}
                            jsonPath={`about.whatWeDo.services.${index}`}
                            id={`about.whatWeDo.services.${index}`}
                            isAdmin={isAdmin}
                            fields={[
                                {
                                    name: "title",
                                    type: "text",
                                    label: "Title",
                                },
                                {
                                    name: "description",
                                    type: "textarea",
                                    label: "description",
                                },
                            ]}
                            initialData={{
                                title: service.title,
                                description: service.description,
                            }}
                        >
                            <motion.div
                                variants={item}
                                className="bg-gradient-to-r from-purple-300/10 to-zinc-700/20 rounded-lg p-8 service-card-container transition-all duration-300 flex items-start space-x-6 rtl:space-x-reverse"
                            >
                                <div className="flex-shrink-0">
                                    {icons[index]}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        </EditableSection>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
