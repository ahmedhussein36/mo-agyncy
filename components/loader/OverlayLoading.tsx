"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    QueryClientProvider,
    useIsFetching,
    useIsMutating,
} from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingOverlay() {
    const isRouteChanging = useRouterEvents();
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    const isLoading = isRouteChanging || isFetching > 0 || isMutating > 0;

    return (
        <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    >
                        <Spinner />
                    </motion.div>
                )}
        </AnimatePresence>
    );
}

export function Spinner() {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 rounded-full border-4 border-solid border-white border-t-transparent"
        />
    );
}

export function useRouterEvents() {
    const [isRouteChanging, setIsRouteChanging] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleStart = () => setIsRouteChanging(true);
        const handleComplete = () => setIsRouteChanging(false);

        // In Next.js 13+, we don't have direct access to router events
        // So we'll simulate based on pathname changes
        handleStart();
        const timeout = setTimeout(handleComplete, 300); // Adjust timing as needed

        return () => clearTimeout(timeout);
    }, [pathname]);

    return isRouteChanging;
}
