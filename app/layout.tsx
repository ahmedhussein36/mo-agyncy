import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
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
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-zinc-900 text-foreground antialiased">
                <TopLoader />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
