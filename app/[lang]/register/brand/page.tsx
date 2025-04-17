import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandForm } from "@/components/brand-form";

export default async function BrandRegisterPage({
    params,
}: {
    params: { lang: Locale };
}) {
    const { lang } = params;
    const dict = (await getDictionary(lang)) || {};
    const navigation = dict.navigation || {};
    const brand = dict.register?.brand || {};
    const footer = dict.footer || {};

    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <BrandForm dict={brand} />
            </main>
            <Footer dict={footer} />
        </div>
    );
}
