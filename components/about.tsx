"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { EditableSection } from "@/components/admin/editable-section";

export function About({
    dict,
    isAdmin = false,
}: {
    dict: any;
    isAdmin?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-20 bg-black/30 relative pt-36">
            <div
                className=" mb-8 opacity-15 absolute 
            left-20 top-24
            "
            >
                <h2 className="tracking-tighter font-bold text-3xl md:text-4xl lg:text-[8rem]">
                    About Us
                </h2>
            </div>
            <div className="container px-4 md:px-6">
                <div className="grid gap-0 md:grid-cols-2">
                    <EditableSection
                        slug="home"
                        jsonPath="about.aboutUs"
                        id="home.about,aboutUs"
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
                            title: dict.aboutUs.title,
                            description: dict.aboutUs.description,
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
                            className="h-full aboutus_item_1 rounded-lg bg-transparent border-0 space-y-4"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">
                                {dict.aboutUs.title}
                            </h2>
                            <p className="text-muted-foreground md:text-lg">
                                {dict.aboutUs.description}
                            </p>
                        </motion.div>{" "}
                    </EditableSection>

                    <EditableSection
                        slug="home"
                        jsonPath="about.mission"
                        id="about.mission"
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
                            title: dict.mission.title,
                            description: dict.mission.description,
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
                            className="aboutus_item_2 h-full rounded-lg bg-transparent border-0"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                {dict.mission.title}
                            </h3>
                            <p className="text-muted-foreground md:text-lg">
                                {dict.mission.description}
                            </p>
                        </motion.div>
                    </EditableSection>

                    <EditableSection
                        slug="home"
                        jsonPath="about.vision"
                        id="about.vision"
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
                            title: dict.vision.title,
                            description: dict.vision.description,
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
                            className="aboutus_item_1 h-full rounded-lg bg-transparent border-0"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                {dict.vision.title}
                            </h3>
                            <p className=" text-foreground/70">
                                {dict.vision.description}
                            </p>
                        </motion.div>
                    </EditableSection>
                    
                    <EditableSection
                        slug="home"
                        jsonPath="about.value"
                        id="about.value"
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
                            title: dict.value.title,
                            description: dict.value.description,
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
                            className="aboutus_item_1 h-full rounded-lg bg-transparent border-0"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                {dict.value.title}
                            </h3>
                            <p className=" text-foreground/70">
                                {dict.value.description}
                            </p>
                        </motion.div>
                    </EditableSection>
                </div>
            </div>
        </section>
    );
}
