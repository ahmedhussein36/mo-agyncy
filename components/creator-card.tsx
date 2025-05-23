"use client";

import { formatNumberShort } from "@/lib/number-formate";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { CountryFlag } from "./country-flag";

// Platform icon mapping
export const platformIcons = (platform: string) => {
    switch (platform) {
        case "instagram":
            return <FaInstagram className="h-4 w-4" />;
        case "tiktok":
            return <FaTiktok className="h-4 w-4" />;
        case "youtube":
            return <FaYoutube className="h-4 w-4" />;
        case "twitter":
            return <FaTwitter className="h-4 w-4" />;
        case "facebook":
            return <FaFacebook className="h-4 w-4" />;
        default:
            return null;
    }
};

export type Creator = {
    id: string;
    email: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    name: string;
    image?: string;
    bio: string;
    followers?: string;
    country?: string;
    category: string;
    socialLinks?: {
        platform: string;
        url: string;
        followers: number;
    }[];
};

export function CreatorCard({
    creator,
    index,
}: {
    creator: Creator;
    index: number;
}) {
    const formatedFollowers = formatNumberShort;
    const hidden = true;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                duration: 0.5,
                delay: (index % 18) * 0.12,
                ease: "easeInOut",
                bounce: 0.4,
            }}
            className=" h-[520px] bg-gradient-to-bl from-brand/10 to-transparent rounded-lg shadow-lg overflow-hidden "
        >
            <div className="service-card-container border h-full group  ">
                <div className=" service-card relative service-card h-full overflow-hidden rounded-2xl border-none transition-all duration-500 hover:shadow-lg flex flex-col">
                    {/* Full card background image */}
                    <div className=" w-full h-full ">
                        <Image
                            src={creator.image || "/placeholder.svg"}
                            alt={creator.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Spacer to push content to bottom */}
                    <div className="flex-grow"></div>

                    {/* Creator details with backdrop blur - positioned at the bottom */}
                    <div
                        className={`${
                            hidden
                                ? "hidden"
                                : " relative z-10 p-4 backdrop-blur-sm bg-black/70 flex flex-col"
                        }`}
                    >
                        <div className=" relative w-full flex items-center justify-start gap-2">
                            <CountryFlag
                                country={creator.country || ""}
                                style={{ width: "20px", height: "16px" }}
                            />
                            <h3 className="text-lg font-bold truncate">
                                {creator.name}
                            </h3>
                            {/* Category badge */}
                            <div className="absolute top-0 end-3 bg-brand text-white text-xs px-2 py-1 rounded-full z-10">
                                {creator.category}
                            </div>
                        </div>

                        <p className="text-sm mb-4 line-clamp-2">
                            {creator.bio}
                        </p>

                        <div className="grid grid-cols-4 gap-2 text-sm">
                            {creator.socialLinks?.map((link) => (
                                <Link
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    className="flex items-center justify-center text-muted-foreground
                                    hover:bg-indigo-500/20 rounded-full p-2 gap-1
                                    hover:text-brand-light transition-colors duration-200"
                                >
                                    <span>{platformIcons(link.platform)}</span>
                                    <span className="ml-1">
                                        {formatedFollowers(link.followers)}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
