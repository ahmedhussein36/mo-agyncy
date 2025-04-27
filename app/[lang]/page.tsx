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
import prisma from "@/lib/prisma";

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

    const pageContent = (await prisma.page.findUnique({
        where: { slug: "home" },
    })) as {
        content: {
            hero?: any;
            services?: any;
            stats?: any;
            about?: any;
            topCreators?: any;
            featureCards?: any;
            partners?: any;
        };
    } | null;

    const contact = (await prisma.page.findUnique({
        where: { slug: "about" },
    })) as {
        content: {
            contact: any;
        };
    } | null;

    const dict = (await getDictionary(lang)) || {};
    const navigation = dict?.navigation || {};
    const hero = pageContent?.content?.hero || {};
    const about = pageContent?.content?.about || {};
    const services = pageContent?.content?.services || {};
    const stats = pageContent?.content?.stats || {};
    const topCreators = pageContent?.content?.topCreators || {};
    const featureCards = pageContent?.content?.featureCards || {};
    const partners = pageContent?.content?.partners || {};
    const footer = dict.footer || {};

    const { influencers, error } = await getInfluencers(1, 8, "APPROVED");
    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <Hero dict={hero} isAdmin={isAdmin} />
                <About dict={about} isAdmin={isAdmin} />
                <Services dict={services} isAdmin={isAdmin} />
                {/* <TopCreators dict={topCreators} creators={influencers as any} /> */}
                {error ? (
                    ""
                ) : (
                    <TopCreatorsGrid
                        dict={topCreators}
                        creators={influencers as any}
                    />
                )}
                <Partners dict={partners} isAdmin={isAdmin} />
                <Stats dict={stats} isAdmin={isAdmin} />
                <FeatureCards dict={featureCards as any} isAdmin={isAdmin} />
            </main>
            <ContactCTA
                slug="about"
                dict={contact?.content.contact}
                lang={lang}
                isAdmin={isAdmin}
            />
            <Footer dict={footer} />
        </div>
    );
}
