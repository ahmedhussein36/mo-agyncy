"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeartComponent from "./developer";

export function Footer({ dict = {} }: { dict: any }) {
    const { lang } = useLanguage();

    return (
        <footer className="bg-black/80 py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <img src="/uploads/brand-logo.png" width={150} />
                        <p className="text-sm text-muted-foreground">
                            "© 2024 Moe Agency. All rights reserved.
                        </p>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">
                            {dict.social?.follow || "Follow us"}
                        </h3>
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                Instagram
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                Twitter
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                LinkedIn
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-brand"
                            >
                                YouTube
                            </Link>
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Links</h3>
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href={"/" + lang + "/privacy-policy"}
                                className="text-muted-foreground hover:text-brand"
                            >
                                {dict.links?.privacy || "Privacy Policy"}
                            </Link>
                            <Link
                                href={"/" + lang + "/terms"}
                                className="text-muted-foreground hover:text-brand"
                            >
                                {dict.links?.terms || "Terms of Service"}
                            </Link>
                            <Link
                                href={"/" + lang + "/contact"}
                                className="text-muted-foreground hover:text-brand"
                            >
                                {dict.links?.contact || "Contact Us"}
                            </Link>
                            <Link
                                href={"/" + lang + "/contact/#faqs"}
                                className="text-muted-foreground hover:text-brand"
                            >
                                {dict.links?.faq || "FAQ"}
                            </Link>
                        </nav>
                    </div>
                    <div className="space-y-4 flex flex-col justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold mb-4">
                                {dict.newsletter?.title ||
                                    "Subscribe to our newsletter"}
                            </h3>
                            <form className="flex w-full max-w-sm items-center space-x-2 rtl:space-x-reverse">
                                <Input
                                    type="email"
                                    placeholder={
                                        dict.newsletter?.placeholder ||
                                        "Your email"
                                    }
                                    className="bg-background/50"
                                />
                                <Button
                                    type="submit"
                                    className="bg-brand hover:bg-brand-dark"
                                >
                                    {dict.newsletter?.submit || "Subscribe"}
                                </Button>
                            </form>
                        </div>

                        <HeartComponent />
                    </div>
                </div>
            </div>
        </footer>
    );
}
