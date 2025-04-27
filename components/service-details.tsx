"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EditableSection } from "@/components/admin/editable-section";
import { Button } from "./ui/button";

const serviceImages = [
    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744537083/uploads/Screenshot_2025-04-13_113402_kn9y3y.png",
    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744544779/uploads/Screenshot_2025-04-13_134331_ec3u7f.png",
    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744546360/uploads/Who-are-the-top-youtube-beauty-influencers-in-2024_ligbk9.jpg",
    "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744547054/uploads/Screenshot_2025-04-13_142326_mwgmrb.png",
];

export function ServiceDetails({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
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
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.5,
                delay: 0.1,
            },
        },
    };

    const imageVariants = (isImageLeft: boolean) => ({
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            x: isImageLeft ? -20 : 20,
            y: -50,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1,
                delay: 0.2,
            },
        },
    });

    return (
        <section className="py-24 bg-black/30">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center gap-16 space-y-4 text-center">
                    <EditableSection
                        slug="services"
                        jsonPath="header"
                        id="service.details.header"
                        isAdmin={isAdmin}
                        fields={[
                            { name: "title", type: "text" },
                            { name: "subtitle", type: "textarea" },
                        ]}
                        initialData={{
                            title: dict.header.title,
                            subtitle: dict.header.subtitle,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-2"
                        >
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.header.title}
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {dict.header.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>
                </div>

                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className="mx-auto mt-12 grid max-w-[1150px] gap-8"
                >
                    {dict.items.map((service: any, index: number) => {
                        const isImageLeft = index % 2 === 0;
                        const cardRef = useRef(null);
                        const cardInView = useInView(cardRef, {
                            once: true,
                            amount: 0.3,
                        });

                        return (
                            <motion.div
                                key={index}
                                ref={cardRef}
                                variants={item}
                                initial="hidden"
                                animate={cardInView ? "show" : "hidden"}
                                className="group bg-gradient-to-t from-transparent to-slate-700/80 rounded-lg p-6"
                            >
                                <div
                                    className={`relative flex flex-col items-center gap-6 lg:gap-12 lg:flex-row ${
                                        isImageLeft ? "" : "lg:flex-row-reverse"
                                    }`}
                                >
                                    {/* الصورة */}
                                    {serviceImages && (
                                        <motion.img
                                            src={serviceImages[index]}
                                            alt={`${service.title} image`}
                                            variants={imageVariants(
                                                isImageLeft
                                            )}
                                            initial="initial"
                                            animate={
                                                cardInView
                                                    ? "animate"
                                                    : "initial"
                                            }
                                            className={`shadow-2x object-cover -top-12 ${
                                                isImageLeft
                                                    ? "left-0"
                                                    : "right-0"
                                            } right-12 w-full lg:w-[40%] rounded-xl hover:scale-105`}
                                        />
                                    )}

                                    {/* المحتوى */}
                                    <div className="w-full lg:w-1/2 space-y-4 flex flex-col gap-4">
                                        <EditableSection
                                            slug="services"
                                            jsonPath={`items.${index}`}
                                            id={`service-detail-${index}`}
                                            isAdmin={isAdmin}
                                            fields={[
                                                { name: "title", type: "text" },
                                                {
                                                    name: "description",
                                                    type: "textarea",
                                                },
                                                {
                                                    name: "features",
                                                    type: "array",
                                                    itemFields: [
                                                        {
                                                            name: "value",
                                                            type: "text",
                                                        },
                                                    ],
                                                },
                                            ]}
                                            initialData={{
                                                title: service.title,
                                                description:
                                                    service.description,
                                                features: service.features.map(
                                                    (f: { value: string }) => ({
                                                        value: f.value,
                                                    })
                                                ),
                                            }}
                                        >
                                            <h2
                                                className="bg-clip-text text-transparent bg-gradient-to-r p-2
                        text-xl md:text-3xl lg:text-4xl mb-8 font-bold tracking-tighter from-brand to-slate-50"
                                            >
                                                {service.title}
                                            </h2>
                                            <p className="text-muted-foreground">
                                                {service.description}
                                            </p>

                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {service.features.map(
                                                    (
                                                        feature: {
                                                            value: string;
                                                        },
                                                        featureIndex: number
                                                    ) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="flex items-center space-x-2 rtl:space-x-reverse"
                                                        >
                                                            <Check className="h-5 w-5 text-brand" />
                                                            <span>
                                                                {feature.value}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            <Button
                                                variant="default"
                                                className="w-fit flex justify-center items-center my-8"
                                            >
                                                <a
                                                    href="/contact"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {dict.button}
                                                </a>
                                            </Button>
                                        </EditableSection>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
