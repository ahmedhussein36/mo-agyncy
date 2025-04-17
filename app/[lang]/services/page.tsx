import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServiceDetails } from "@/components/service-details";
import { getCurrentUser } from "@/lib/auth";

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = (await getDictionary(lang)) || {};
    const isAdmin = await getCurrentUser();
    const navigation = dict.navigation || {};
    const services = dict.services || {};
    const footer = dict.footer || {};

    return (
        <div className="w-full flex min-h-screen flex-col gap-16">
            <Header dict={navigation} />
            <main className="flex-1">
                <ServiceDetails dict={services} isAdmin={isAdmin} />
            </main>
            <Footer dict={footer} />
        </div>
    );
}
