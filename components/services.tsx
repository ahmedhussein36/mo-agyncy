"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, BarChart, PenTool, LineChart } from "lucide-react";
import { EditableSection } from "@/components/admin/editable-section";
import Image from "next/image";

export function Services({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Update the icon colors
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
        <section ref={ref} className="py-20 ">
            <div className="container px-4 md:px-6 grid grid-cols-1">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <EditableSection
                        jsonPath="home.services.header"
                        id="home.services.header"
                        isAdmin={isAdmin}
                        fields={[
                            {
                                name: "title",
                                type: "text",
                                label: "Title",
                            },
                            {
                                name: "subtitle",
                                type: "textarea",
                                label: "Subtitle",
                            },
                            {
                                name: "image",
                                type: "image",
                                label: "Image",
                            },
                        ]}
                        initialData={{
                            title: dict.header.title,
                            subtitle: dict.header.subtitle,
                            image: dict.header.image,
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
                            className="space-y-2"
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.header.title}
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {dict.header.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>
                    <div className=" grid grid-cols-1 lg:grid-flow-col w-full gap-12 ">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                            }}
                        >
                            <Image
                                src={
                                    dict.header.image ||
                                    "/uploads/our-services-image.png"
                                }
                                alt="our-services-image"
                                width={480}
                                height={100}
                                className="col-span-1  object-cover h-auto"
                            />
                        </motion.div>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate={isInView ? "show" : "hidden"}
                            className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-4 mt-8"
                        >
                            {dict.items?.map((service: any, index: number) => (
                                <EditableSection
                                    jsonPath={`home.services.items.${index}`}
                                    id={`home.services.items.${index}`}
                                    key={index}
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
                                            label: "Description",
                                        },
                                    ]}
                                    initialData={{
                                        title: service.title,
                                        description: service.description,
                                    }}
                                >
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="service-card h-full overflow-hidden border-none bg-black/40 backdrop-blur-sm transition-all duration-500 hover:bg-black/60 relative">
                                            <CardHeader>
                                                <motion.div className="mb-2 transition-transform duration-500 group-hover:scale-105">
                                                    {icons[index]}
                                                </motion.div>
                                                {/* Update the card title hover color */}
                                                <CardTitle className="text-xl group-hover:text-brand transition-colors duration-300">
                                                    {service.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                                                    {service.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </EditableSection>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
