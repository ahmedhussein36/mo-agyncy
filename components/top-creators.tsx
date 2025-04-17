// components/TopCreators.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import { CreatorCard } from "./top-creator-card";
import { Creator } from "./creator-card";

type TopCreatorsProps = {
    creators: Creator[];
    dict?: {
        title: string;
        subtitle: string;
    };
};

export function TopCreators({
    creators,
    dict = {
        title: "Top Creators",
        subtitle: "Connect with our network of influential creators",
    },
}: TopCreatorsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [isPaused, setIsPaused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const displayedCreators = creators.slice(0, 8);

    useEffect(() => {
        if (!isPaused && carouselRef.current) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % displayedCreators.length);
                const cardWidth = carouselRef.current
                    ? carouselRef.current.scrollWidth / displayedCreators.length
                    : 0;
                if (carouselRef.current) {
                    carouselRef.current.scrollTo({
                        left:
                            ((activeIndex + 1) % displayedCreators.length) *
                            cardWidth,
                        behavior: "smooth",
                    });
                }
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [isPaused, activeIndex, displayedCreators.length]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
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

                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        ref={carouselRef}
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex h-full space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {displayedCreators.map((creator) => (
                            <CreatorCard
                                key={creator.id}
                                creator={creator as any}
                            />
                        ))}
                    </motion.div>

                    <div className="flex justify-center space-x-2 mt-6">
                        {displayedCreators.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (carouselRef.current) {
                                        const cardWidth =
                                            carouselRef.current.scrollWidth /
                                            displayedCreators.length;
                                        carouselRef.current.scrollTo({
                                            left: index * cardWidth,
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    activeIndex === index
                                        ? "bg-brand w-4"
                                        : "bg-gray-500"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
