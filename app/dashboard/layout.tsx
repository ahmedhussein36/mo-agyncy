import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    await requireAuth();

    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="flex h-screen bg-background dark:bg-gray-900">
            <Sidebar user={user} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header user={user} />
                <main className="flex-1 overflow-y-auto py-2 px-6  bg-gray-100 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}
