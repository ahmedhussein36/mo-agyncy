import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { Mail, Pencil, Phone } from "lucide-react";
import { platformIcons } from "../platform-icons";
import Link from "next/link";
import { formatNumberShort } from "@/lib/number-formate";
import { CountryFlag } from "../country-flag";
import { ImageUploader } from "../imageUploader";
import { StatusBadge } from "../StatusBadge";

export default function InfluencerProfile({ influencer }: { influencer: any }) {
    const gender = influencer?.gender || "female"; // can be "male" or "female"
    const calculateAge = (birthDate: string): number => {
        if (birthDate === null) return 25;
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const age = calculateAge(influencer?.dateOfBirth);
    const formatedFollowers = formatNumberShort;

    return (
        <div className="w-full p-6 flex justify-center items-center">
            <div className="w-full rounded-2xl shadow-lg bg-gray-900">
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-y-6 w-full">
                    {/* Profile Section */}
                    <div className="col-span-1 w-full gap-3 flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg">
                        <img
                            src={
                                influencer.image ||
                                "/uploads/1744823198469-images.png"
                            }
                            alt={influencer.name || "Creator Name"}
                            className="w-full h-full rounded-xl object-cover mb-4 border-2 border-gray-700"
                        />
                        <div className=" ">
                            <ImageUploader id={influencer.id} />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className=" col-span-2 w-full flex flex-col justify-start items-start gap-5">
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg shadow text-center space-y-3">
                                <StatusBadge status={influencer.status} />

                                <div className=" w-full flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">
                                        {influencer.name || "Creator Name"}
                                        <span className="ms-2 text-sm text-gray-400">
                                            ({influencer.country})
                                        </span>
                                    </h2>
                                    <CountryFlag country={influencer.country} />
                                </div>

                                <div className=" w-full flex justify-start items-center gap-3">
                                    <Mail className=" w-4 h-4 dark:text-slate-400" />
                                    <p>{influencer.email}</p>
                                </div>
                                <div className=" w-full flex justify-start items-center gap-3">
                                    <Phone className=" w-4 h-4 dark:text-slate-400" />
                                    <p>{influencer.phone}</p>
                                </div>
                                <div className="mt-6 gap-4 text-gray-400 flex justify-start items-center">
                                    <p> Age : {age} y</p>
                                    <span>|</span>
                                    <p className="flex items-center gap-1">
                                        {gender === "Male" ? (
                                            <IoMdMale className="inline-block text-blue-400" />
                                        ) : (
                                            <IoMdFemale className="inline-block text-pink-400" />
                                        )}
                                        {gender.charAt(0).toUpperCase() +
                                            gender.slice(1)}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg shadow text-center space-y-3">
                                <p className="text-gray-400">Audience Size</p>
                                <p className="text-lg font-bold flex items-center justify-center gap-1">
                                    {influencer.followers}
                                </p>
                                <div>
                                    <Badge className=" text-base">
                                        {influencer.category}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {influencer.socialLinks.length !== 0 &&
                                influencer.socialLinks.map((s: any) => (
                                    <div className="bg-gray-800 p-4 rounded-lg shadow text-center space-y-4">
                                        <p className="text-gray-400">
                                            {s.platform}
                                        </p>
                                        <p className="text-lg font-bold flex items-center justify-center gap-1">
                                            {platformIcons(s.platform)}
                                            {formatedFollowers(s.followers) ||
                                                0}
                                        </p>
                                        <Button
                                            variant={"link"}
                                            className=" text-brand-light"
                                        >
                                            <a
                                                href={s.url || "#"}
                                                target="_blank"
                                            >
                                                Visit Profile
                                            </a>
                                        </Button>
                                    </div>
                                ))}
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg shadow text-start col-span-2 w-full">
                            <h3>Bio</h3>
                            <p className="text-sm text-start my-4 dark:text-slate-200">
                                {influencer.bio ||
                                    "  Music producer and artist showcasing behind-the-scenes of music creation."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
