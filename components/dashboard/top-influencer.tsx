"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Globe } from "lucide-react";
import Link from "next/link";
import {
    FaAward,
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface SocialMedia {
    platform?: string;
    url?: string;
    followers?: string;
}

type TopInfluencerProps = {
    influencer: {
        id: string;
        name: string;
        username: string;
        image: string;
        totalFollowers: string;
        totalViews: string;
        socialLinks?: SocialMedia[];
    };
};

export function TopInfluencerCard({ influencer }: TopInfluencerProps) {
    const router = useRouter();

    const socialIcons = (platform: string) => {
        switch (platform) {
            case "instagram":
                return <FaInstagram size={16} className="text-white" />;
            case "youtube":
                return <FaYoutube size={16} className="text-white" />;
            case "facebook":
                return <FaFacebook size={16} className="text-white" />;
            case "twitter":
                return <FaXTwitter size={16} className="text-white" />;
            case "tiktok":
                return <FaTiktok size={16} className="text-white" />;
            default:
                return <Globe size={16} className="text-white" />;
        }
    };

    return (
        <Card
            onClick={() =>
                router.push(`/dashboard/influencers/${influencer.id}`)
            }
            className="relative bg-gradient-to-br from-purple-600 to-indigo-600 
             cursor-pointer hover:opacity-80 transition-all
            text-white shadow-lg overflow-hidden p-4 rounded-xl"
        >
            <FaAward className="absolute top-4 right-4 text-slate-100 h-8 w-8" />
            <h3 className=" text-xl font-bold ">Top Creator</h3>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <CardHeader className="items-center text-center space-y-2">
                    <Image
                        src={influencer.image}
                        alt={influencer.name}
                        width={120}
                        height={120}
                        className="rounded-full border-2 border-white object-cover w-[150px] h-[150px]"
                    />
                    <CardTitle className="text-2xl font-bold">
                        {influencer.name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex justify-around items-center gap-4">
                        <div className="text-center">
                            <p className="text-xl font-semibold">
                                {influencer?.totalFollowers?.toLocaleString() ||
                                    0}
                            </p>
                            <p className="text-sm text-indigo-100">
                                Total Followers
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-semibold">
                                {influencer.totalViews || 0}
                            </p>
                            <p className="text-sm text-indigo-100">
                                Total Video Views
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        {influencer.socialLinks?.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                target="_blank"
                                aria-label={`Visit ${link.platform} profile`}
                                className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition duration-200 ease-in-out"
                            >
                                {socialIcons(
                                    link?.platform?.toLowerCase() || ""
                                )}
                                <span className="text-sm">
                                    {link?.followers}
                                </span>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </motion.div>
        </Card>
    );
}
