import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n.config";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is for the admin routes
    if (pathname.startsWith("/auth/admin") || pathname.includes("/admin/")) {
        // Check if the user is authenticated
        const adminSession = request.cookies.get("admin_session");

        // If the user is trying to access the login page and is already authenticated, redirect to home
        if (pathname === "/auth/admin" && adminSession) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // If the user is not authenticated and trying to access admin routes (except login), redirect to login
        if (
            !adminSession &&
            pathname !== "/auth/admin" &&
            !pathname.includes("/auth/verify") &&
            !pathname.includes("/auth/locked") &&
            !pathname.includes("/auth/banned")
        ) {
            const response = NextResponse.redirect(
                new URL("/auth/admin", request.url)
            );

            // Add a toast message via cookie (will be read and displayed by the client)
            response.cookies.set(
                "toast",
                JSON.stringify({
                    title: "Authentication Required",
                    description: "You must be logged in to access this page.",
                    variant: "destructive",
                }),
                { maxAge: 5 }
            ); // Short-lived cookie

            return response;
        }
    }

    // Handle i18n redirects
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = i18n.defaultLocale;
        return NextResponse.redirect(
            new URL(
                `/${locale}${
                    pathname.startsWith("/") ? pathname : `/${pathname}`
                }`,
                request.url
            )
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|dashboard|auth|uploads).*)",
    ],
};
