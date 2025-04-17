// components/CreatorCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { platformIcons } from "./platform-icons";
import { Creator } from "./creator-card";
export function CreatorCard({ creator }: { creator: Creator }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="min-w-full sm:min-w-[320px] md:min-w-[320px] snap-center"
        >
            <div className="service-card-container border h-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg overflow-hidden">
                <div className="service-card h-full overflow-hidden rounded-lg border-none backdrop-blur-sm transition-all duration-500 hover:bg-black/60 relative">
                    <div className="relative z-10 p-6 flex flex-col h-full backdrop-blur-sm bg-black/30">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-brand flex-shrink-0">
                                <Image
                                    src={creator.image || "/placeholder.svg"}
                                    alt={creator.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">
                                    {creator.name}
                                </h3>
                                <div className="flex space-x-2 mt-1">
                                    {creator?.socialLinks &&
                                        creator?.socialLinks.map((platform) => (
                                            <div
                                                key={platform.platform}
                                                className="text-slate-300"
                                            >
                                                {platformIcons(
                                                    platform.platform
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm italic mb-4 line-clamp-3 text-white/70">
                            &#x201F;{creator.bio}&#x201D;
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {creator?.socialLinks?.map((platform) => (
                                <div
                                    key={platform.platform}
                                    className="flex items-center justify-center space-x-2"
                                >
                                    {platformIcons(platform.platform)}
                                    <span className="text-sm text-white/70">
                                        {platform.followers}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
