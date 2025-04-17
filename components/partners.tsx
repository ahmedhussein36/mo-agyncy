"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/brands";

export function Partners({
    isAdmin = false,
    dict = {
        title: "Our Partners",
        subtitle: "Trusted by leading brands worldwide",
    },
}: {
    isAdmin?: boolean;
    dict?: any;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="py-16 bg-black/20">
            <div className="container p-4 md:px-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        {dict.title}
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        {dict.subtitle}
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full flex items-center justify-center">
                {/* Partner logos with animation trigger */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:p-4">
                    {brands.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            className="flex items-center justify-center h-16 w-40 mx-4 hover:bg-white/50 hover:scale-105 transition-all duration-300 bg-white/10 rounded-lg shadow-md"
                            initial={{ y: 20 }}
                            animate={
                                isInView
                                    ? { y: 0, opacity: 1, scale: 1.1 }
                                    : { y: 20, opacity: 0 }
                            }
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                delay: index * 0.1,
                                bounce: 0.25, // Bounce effect
                            }}
                        >
                            <Image
                                src={`/uploads/partner${index+1}.svg`}
                                alt={partner.name}
                                width={160}
                                height={64}
                                className="object-contain  p-2  filter invert grayscale opacity-60  transition-all duration-300"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
