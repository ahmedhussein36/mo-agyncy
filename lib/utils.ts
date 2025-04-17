import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitize from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function sanitizeHtml(content: string) {
    return sanitize(content, {
        allowedTags: [
            "p",
            "b",
            "i",
            "em",
            "strong",
            "a",
            "ul",
            "ol",
            "li",
            "br",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
        },
    });
}
