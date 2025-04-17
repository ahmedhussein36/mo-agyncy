// components/platform-icons.ts
import { JSX } from "react";
import {
    FaYoutube,
    FaInstagram,
    FaTiktok,
    FaFacebook,
    FaTwitter,
} from "react-icons/fa";

export function platformIcons(platform: string) {
    const map: Record<string, JSX.Element> = {
        youtube: <FaYoutube className="h-4 w-4 text-slate-200" />,
        instagram: <FaInstagram className="h-4 w-4 text-slate-200" />,
        tiktok: <FaTiktok className="h-4 w-4 text-slate-200" />,
        facebook: <FaFacebook className="h-4 w-4 text-slate-200" />,
        twitter: <FaTwitter className="h-4 w-4 text-slate-200" />,
    };

    return map[platform.toLowerCase()] ?? null;
}
