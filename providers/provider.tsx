// app/providers.tsx
"use client";
import { LanguageProvider } from "@/components/language-provider";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/use-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({
    children,
    locale,
}: {
    children: ReactNode;
    locale: "en" | "ar";
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <LanguageProvider lang={locale}>
                <ToastProvider>
                    <PageTransition>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </PageTransition>
                </ToastProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
