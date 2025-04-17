import type React from "react";
import type { Locale } from "@/i18n.config";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@/components/analytics";
import { PageTransition } from "@/components/page-transition";
import { ToastProvider } from "@/components/ui/use-toast";
import { i18n } from "@/i18n.config";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata = {
    title: "Influence Agency",
    description: "Connect with top influencers and brands",
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}) {
    const locale = (await params).lang;

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <LanguageProvider lang={locale}>
                        <ToastProvider>
                            <PageTransition>{children}</PageTransition>
                            <Analytics />
                        </ToastProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
