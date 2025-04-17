import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CreatorsGrid } from "@/components/creators-grid";
import { ContactCTA } from "@/components/contact-cta";
import { getCurrentUser } from "@/lib/auth";
import { getInfluencers } from "@/actions/influencer-actions";

export default async function CreatorsPage({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = (await getDictionary(lang)) || {};
    const isAdmin = await getCurrentUser();
    const navigation = dict.navigation || {};
    const footer = dict.footer || {};
    const about = dict.about || {};
    const creators = dict.creators || {
        title: "Our Creators",
        subtitle: "Discover our network of influential creators",
    };

    const { influencers, pagination, error } = await getInfluencers(
        1,
        20,
        "APPROVED"
    );

    if (error) {
        console.error("Error fetching influencers:", error);
        return <div>Error fetching influencers</div>;
    }

    return (
        <div className="flex min-h-screen flex-col ">
            <Header dict={navigation} />
            <main className="flex-1 pt-2">
                <CreatorsGrid dict={creators} creators={influencers as any} />
            </main>
            <ContactCTA dict={about.contact} lang={lang} isAdmin={isAdmin} />
            <Footer dict={footer} />
        </div>
    );
}
