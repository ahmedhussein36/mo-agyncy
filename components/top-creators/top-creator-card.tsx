"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { platformIcons } from "../platform-icons";
import { motion, useInView } from "framer-motion";
const TopCreatorCard = ({
    topCreators,
    index,
}: {
    topCreators: any;
    index: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                type: "spring",
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut",
                bounce: 0.4,
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
            className="w-full h-full group hover:cursor-pointer border-2 rounded-xl scale-125
            border-transparent hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-400/40 transition-all duration-300"
        >
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={topCreators.image}
                    alt={topCreators.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70">
                    <div className="flex flex-col items-center justify-end h-full space-x-2">
                        <div className="text-white text-lg font-bold">
                            {topCreators.name}
                        </div>
                        <div className="flex w-full items-center justify-center space-x-4 mb-4">
                            {topCreators.socialLinks.map(
                                (social: any, index: number) => (
                                    <div
                                        key={index}
                                        className="text-white text-sm space-x-1 flex items-center justify-center"
                                    >
                                        <span>
                                            {platformIcons(social.platform)}
                                        </span>
                                        <span>{social.followers}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TopCreatorCard;
