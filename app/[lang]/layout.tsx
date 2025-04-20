import type React from "react";
import type { Locale } from "@/i18n.config";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@/components/analytics";
import { PageTransition } from "@/components/page-transition";
import { ToastProvider } from "@/components/ui/use-toast";
import { i18n } from "@/i18n.config";
import "@/app/globals.css";
import TopLoader from "@/components/top-loader";

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
    params: { lang: Locale };
}) {
    const { lang: locale } = params; 

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <body className="bg-zinc-900 text-foreground antialiased">
                <TopLoader />
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
