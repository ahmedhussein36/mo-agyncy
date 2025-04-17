"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    UserCog,
    Building,
    Settings,
    LogOut,
    Menu,
    X,
    Hexagon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface SidebarProps {
    user?: any;
}

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isAdmin = user?.role === "ADMIN" || user?.role === "OWNER";

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            name: "Approved Influencers",
            href: "/dashboard/influencers",
            icon: <UserCheck className="h-5 w-5" />,
        },
        {
            name: "Pending Influencers",
            href: "/dashboard/influencers/pending",
            icon: <UserCog className="h-5 w-5" />,
        },
        {
            name: "Approved Brands",
            href: "/dashboard/brands",
            icon: <Building className="h-5 w-5" />,
        },
        {
            name: "Pending Brands",
            href: "/dashboard/brands/pending",
            icon: <Building className="h-5 w-5" />,
        },
        ...(isAdmin
            ? [
                  {
                      name: "User Management",
                      href: "/dashboard/users",
                      icon: <Users className="h-5 w-5" />,
                  },
              ]
            : []),
        {
            name: "Website Settings",
            href: "/dashboard/website",
            icon: <Settings className="h-5 w-5" />,
        },
    ];

    return (
        <>
            {/* Mobile menu button */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link
                            href={"/dashboard"}
                            className="flex items-start space-x-2"
                        >
                            <Hexagon className="h-8 w-8 text-cyan-500" />
                            <div className=" flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    NEXOS
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Expert
                                </span>
                            </div>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={closeSidebar}
                            className="md:hidden"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                            pathname === item.href
                                                ? "bg-gray-100 dark:bg-gray-700 text-cyan-500"
                                                : "text-gray-700 dark:text-gray-300"
                                        }`}
                                        onClick={closeSidebar}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t">
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start space-x-2 text-red-500"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Log out</span>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
