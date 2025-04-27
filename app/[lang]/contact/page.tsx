import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { ContactCTA } from "@/components/contact-cta";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const slug = "contact";
    const { lang } = await params;

    const pageContent = await prisma.page.findUnique({ where: { slug } });
    const faqs = await prisma.page.findUnique({ where: { slug: "faq" } });
    const about = await prisma.page.findUnique({ where: { slug: "about" } })as{
        content: {
            contact: any
        }
    } | null

    const dict = (await getDictionary(lang)) || {};
    const isAdmin = await getCurrentUser();
    const navigation = dict.navigation || {};
    const footer = dict.footer || {};

    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <ContactForm dict={pageContent?.content} isAdmin={isAdmin} />
                <FaqAccordion dict={faqs?.content as any} isAdmin={isAdmin} />
            </main>
            <ContactCTA
                slug="about"
                dict={about?.content?.contact}
                lang={lang}
                isAdmin={isAdmin}
            />
            <Footer dict={footer} />
        </div>
    );
}
