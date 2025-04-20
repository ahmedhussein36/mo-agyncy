"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableSection } from "@/components/admin/editable-section";

export function FeatureCards({
    dict,
    isAdmin = false,
}: {
    dict: {
        header: { title: string; subtitle: string };
        items: {
            id: number;
            title: string;
            description: string;
            image: string;
        }[];
    };
    isAdmin?: boolean;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create individual refs for each card
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    // Check if each card is in view
    const isCard1InView = useInView(card1Ref, { once: false, amount: 0.5 });
    const isCard2InView = useInView(card2Ref, { once: false, amount: 0.5 });
    const isCard3InView = useInView(card3Ref, { once: false, amount: 0.5 });

    // Array of card refs and their in-view states for easier mapping
    const cardRefsAndStates = [
        { ref: card1Ref, isInView: isCard1InView },
        { ref: card2Ref, isInView: isCard2InView },
        { ref: card3Ref, isInView: isCard3InView },
    ];

    return (
        <section
            ref={containerRef}
            className="py-24 bg-gradient-to-b from-black/30 to-background"
        >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <EditableSection
                        jsonPath="home.featureCards.header"
                        id="home.featureCards.header"
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
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.header.title}
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {dict.header.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>
                </div>

                <div className="space-y-32 md:space-y-40">
                    {dict.items.map((card: any, index: number) => (
                        <div
                            key={index}
                            ref={cardRefsAndStates[index].ref}
                            className="relative"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={
                                    cardRefsAndStates[index].isInView
                                        ? {
                                              opacity: 1,
                                              y: 0,
                                              transition: {
                                                  duration: 0.8,
                                                  delay: 0.1,
                                                  type: "spring",
                                                  stiffness: 100,
                                                  damping: 15,
                                              },
                                          }
                                        : { opacity: 0, y: 100 }
                                }
                                className={`flex flex-col ${
                                    index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                } items-center gap-8 md:gap-12`}
                            >
                                <div className="w-full md:w-1/2">
                                    <div className=" rounded-lg overflow-visible">
                                        <Image
                                            src={
                                                card.image || "/placeholder.svg"
                                            }
                                            alt={card.title}
                                            width={500}
                                            height={100}
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 space-y-4">
                                    <EditableSection
                                        jsonPath={`home.featureCards.items.${index}`}
                                        id={`feature-card-content-${index}`}
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
                                            {
                                                name: "image",
                                                type: "text",
                                                label: "Image",
                                            },
                                        ]}
                                        initialData={{
                                            title: card.title,
                                            description: card.description,
                                            image: card.image,
                                        }}
                                        className="space-y-4"
                                    >
                                        <motion.h3
                                            className="text-2xl md:text-3xl font-bold text-brand"
                                            initial={{
                                                opacity: 0,
                                                x: index % 2 === 0 ? 50 : -50,
                                            }}
                                            animate={
                                                cardRefsAndStates[index]
                                                    .isInView
                                                    ? {
                                                          opacity: 1,
                                                          x: 0,
                                                          transition: {
                                                              duration: 0.6,
                                                              delay: 0.3,
                                                          },
                                                      }
                                                    : {
                                                          opacity: 0,
                                                          x:
                                                              index % 2 === 0
                                                                  ? 50
                                                                  : -50,
                                                      }
                                            }
                                        >
                                            {card.title}
                                        </motion.h3>

                                        <motion.p
                                            className="text-muted-foreground md:text-lg"
                                            initial={{
                                                opacity: 0,
                                                x: index % 2 === 0 ? 50 : -50,
                                            }}
                                            animate={
                                                cardRefsAndStates[index]
                                                    .isInView
                                                    ? {
                                                          opacity: 1,
                                                          x: 0,
                                                          transition: {
                                                              duration: 0.6,
                                                              delay: 0.5,
                                                          },
                                                      }
                                                    : {
                                                          opacity: 0,
                                                          x:
                                                              index % 2 === 0
                                                                  ? 50
                                                                  : -50,
                                                      }
                                            }
                                        >
                                            {card.description}
                                        </motion.p>
                                    </EditableSection>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={
                                            cardRefsAndStates[index].isInView
                                                ? {
                                                      opacity: 1,
                                                      y: 0,
                                                      transition: {
                                                          duration: 0.6,
                                                          delay: 0.7,
                                                      },
                                                  }
                                                : { opacity: 0, y: 20 }
                                        }
                                    >
                                        <div className="h-1 w-20 bg-gradient-to-r from-brand to-brand-light rounded-full"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
