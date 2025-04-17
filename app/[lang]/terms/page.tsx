import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TermsContent } from "@/components/terms-content";

export default async function TermsOfServicesPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = (await getDictionary(lang)) || {};
    const navigation = dict.navigation || {};
    const footer = dict.footer || {};
    return (
        <div>
            <Header dict={navigation} />

            <main className="max-w-4xl mx-auto px-4 py-24">
                <TermsContent lang={lang} />
            </main>
            <Footer dict={footer} />
        </div>
    );
}
