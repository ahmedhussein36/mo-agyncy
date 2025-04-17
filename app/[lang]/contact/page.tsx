import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { ContactCTA } from "@/components/contact-cta";
import { getCurrentUser } from "@/lib/auth";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = (await getDictionary(lang)) || {};
    const isAdmin = await getCurrentUser();
    const navigation = dict.navigation || {};
    const contact = dict.contact || {};
    const footer = dict.footer || {};
    const about = dict.about || {};
    const faq = dict.faq || { title: "Frequently Asked Questions" };

    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <ContactForm dict={contact} isAdmin={isAdmin} />
                <FaqAccordion dict={faq} isAdmin={isAdmin} />
            </main>
            <ContactCTA dict={about.contact} lang={lang} isAdmin={isAdmin} />
            <Footer dict={footer} />
        </div>
    );
}
