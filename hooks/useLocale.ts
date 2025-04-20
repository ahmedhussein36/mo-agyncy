"use client";

import { usePathname } from "next/navigation";
import { i18n, Locale } from "@/i18n.config";

export const useLocale = (): Locale => {
    const pathname = usePathname();
    const firstSegment = pathname.split("/")[1];

    // تأكد إن اللغة موجودة ضمن i18n.locales
    if (i18n.locales.includes(firstSegment as Locale)) {
        return firstSegment as Locale;
    }

    // fallback للغة الافتراضية
    return i18n.defaultLocale;
};
