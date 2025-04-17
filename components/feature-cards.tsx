"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableSection } from "@/components/admin/editable-section";

// Sample data for feature cards
const featureCards = [
    {
        id: 1,
        title: "Strategic Partnerships",
        description:
            "Connect your brand with the perfect influencers who align with your values and target audience. Our proprietary matching algorithm ensures authentic partnerships that drive real results.",
        image: "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744450337/uploads/video_poster.ad5dd042f80bd76106661a111da1ece9_nftl3k.png?q=auto&f=auto",
    },
    {
        id: 2,
        title: "Data-Driven Campaigns",
        description:
            "Leverage our advanced analytics to optimize your influencer marketing campaigns. Get detailed insights into performance metrics, audience engagement, and ROI to make informed decisions.",
        image: "https://res.cloudinary.com/ds04j5ge0/image/upload/v1744333498/uploads/influencer_analysis_tool_e7fl8k.webp?f=auto&q=auto",
    },
    {
        id: 3,
        title: "Creative Content Strategy",
        description:
            "Our team of experts helps develop compelling content strategies that resonate with your target audience. From concept to execution, we ensure your message is delivered effectively.",
        image: "https://images.ctfassets.net/nfpsrlop6sws/5ByCsTWjAyWJHns43AfT06/9befc9d6befe10834d4828e4a7cc88a2/manage-influencers-centralize-communication-performance-payouts.png?w=1136&h=960&q=70&fm=webp",
    },
];

export function FeatureCards({
    dict,
    isAdmin = false,
}: {
    dict: {
        title: string;
        subtitle: string;
        items: {
            id: number;
            title: string;
            content: string;
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
                        jsonPath="home.featureCards"
                        id="feature-cards-header"
                        type="mixed"
                        isAdmin={isAdmin}
                        initialData={{
                            title: dict.title,
                            content: dict.subtitle,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-2"
                        >
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                {dict.title}
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {dict.subtitle}
                            </p>
                        </motion.div>
                    </EditableSection>
                </div>

                <div className="space-y-32 md:space-y-40">
                    {dict?.items?.map((card: any, index: number) => (
                        <div
                            key={card.id}
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
                                    <EditableSection
                                        jsonPath={`home.featureCards.items.${index}.image`}
                                        id={`feature-card-image-${index}`}
                                        type="image"
                                        isAdmin={isAdmin}
                                        initialData={{
                                            imageUrl: card.image,
                                        }}
                                    >
                                        <div className=" rounded-lg overflow-visible">
                                            <Image
                                                src={
                                                    card.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={card.title}
                                                width={500}
                                                height={100}
                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                    </EditableSection>
                                </div>

                                <div className="w-full md:w-1/2 space-y-4">
                                    <EditableSection
                                        jsonPath={`home.featureCards.items.${index}`}
                                        id={`feature-card-content-${index}`}
                                        type="mixed"
                                        isAdmin={isAdmin}
                                        initialData={{
                                            title: card.title,
                                            content: card.content,
                                        }}
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
                                            {card.content}
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
