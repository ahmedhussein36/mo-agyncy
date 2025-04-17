"use client";

import React from "react";
import TopCreatorCard from "./top-creator-card";
import { Creator } from "../creator-card";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const TopCreatorsGrid = ({
    dict,
    creators,
}: {
    dict: { title: string; subtitle: string };
    creators: Creator[];
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const IsEvenCard = (index: number) => {
        return index % 2 === 0
            ? "transform translateY-0 "
            : "transform translate-y-12";
    };
    return (
        <section ref={ref} className="h-full py-20 bg-black/40">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
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
                            {dict.title}
                        </h2>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            {dict.subtitle}
                        </p>
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
                    {creators?.map((creator, index: number) => (
                        <div
                            key={creator.id}
                            className={`${IsEvenCard(index)}`}
                        >
                            <TopCreatorCard
                                topCreators={creator}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCreatorsGrid;
