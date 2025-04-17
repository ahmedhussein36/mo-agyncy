import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InfluencerForm } from "@/components/influencer-form";

export default async function InfluencerRegisterPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = (await getDictionary(lang)) || {};
    const navigation = dict.navigation || {};
    const influencer = dict.register?.influencer || {};
    const footer = dict.footer || {};

    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <InfluencerForm dict={influencer} />
            </main>
            <Footer dict={footer} />
        </div>
    );
}
