"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { platformIcons } from "../platform-icons";
import { delay, motion, useInView } from "framer-motion";
const TopCreatorCard = ({
    topCreators,
    index,
}: {
    topCreators: any;
    index: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0 });

    return (
        <motion.div
            ref={ref}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 1 }}
            transition={{delay: 0.12 * index} }
            exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
            className="w-full h-full group hover:cursor-pointer border-2 rounded-xl duration-500 transition-all ease-linear
            border-transparent hover:border-indigo-500/70 hover:shadow-2xl hover:shadow-indigo-400/40 "
        >
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={topCreators.image}
                    alt={topCreators.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute h-full inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-1">
                    <div className="flex flex-col items-center justify-end h-full pb-12 ">
                        <div className="text-white text-lg font-bold">
                            {topCreators.name}
                        </div>
                        <div className="flex w-full items-center justify-center space-x-4">
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
