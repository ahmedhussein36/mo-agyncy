import type React from "react";
import type { Locale } from "@/i18n.config";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@/components/analytics";
import { PageTransition } from "@/components/page-transition";
import { ToastProvider } from "@/components/ui/use-toast";
import { i18n } from "@/i18n.config";
import "@/app/globals.css";
import LoadingOverlay from "@/components/loader/OverlayLoading";
import { Providers } from "@/providers/provider";
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
    const { lang: locale } = await params;

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <body className="bg-zinc-900 text-foreground antialiased">
                <Providers locale={locale}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
