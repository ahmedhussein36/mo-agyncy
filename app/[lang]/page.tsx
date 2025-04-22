import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FeatureCards } from "@/components/feature-cards";
import { Partners } from "@/components/partners";
import { getCurrentUser } from "@/lib/auth";
import { ContactCTA } from "@/components/contact-cta";
import { getInfluencers } from "@/actions/influencer-actions";
import TopCreatorsGrid from "@/components/top-creators/top-creators-grid";

export async function generateMetadata({
    params,
}: {
    params: { lang: Locale };
}) {
    const { lang } = params;
    const metaTitle = "MoeAgency | Influencer marketing Agency";
    const metaDescription =
        "Discover top influencers and grow your brand with our agency.";
    const altLangs = ["en", "ar"].filter((l) => l !== lang);

    return {
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            locale: lang,
            type: "website",
        },
        alternates: {
            languages: altLangs.reduce((acc, l) => {
                acc[l] = `/${l}`;
                return acc;
            }, {} as Record<string, string>),
        },
    };
}

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const isAdmin = await getCurrentUser();
    const dict = (await getDictionary(lang)) || {};
    const navigation = dict.navigation || {};
    const hero = dict.home?.hero || {};
    const services = dict.home?.services || {};
    const stats = dict.home?.stats || {};
    const about = dict.home?.about || {};
    const footer = dict.footer || {};
    const contact = dict?.about?.contact || {};
    const topCreators = dict.home?.topCreators || {};
    const featureCards = dict.home.featureCards || {};
    const partners = dict.home?.partners || {};

    const { influencers, error } = await getInfluencers(1, 8, "APPROVED");
    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <Hero dict={hero} isAdmin={isAdmin} />
                <About dict={about} isAdmin={isAdmin} />
                <Services dict={services} isAdmin={isAdmin} />
                {/* <TopCreators dict={topCreators} creators={influencers as any} /> */}
                <TopCreatorsGrid
                    dict={topCreators}
                    creators={influencers as any}
                />
                <Partners dict={partners} isAdmin={isAdmin} />
                <Stats dict={stats} isAdmin={isAdmin} />
                <FeatureCards dict={featureCards as any} isAdmin={isAdmin} />
            </main>
            <ContactCTA dict={contact} lang={lang} isAdmin={isAdmin} />
            <Footer dict={footer} />
        </div>
    );
}
