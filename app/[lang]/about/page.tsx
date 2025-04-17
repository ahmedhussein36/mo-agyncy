import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutHero } from "@/components/about-hero";
import { AboutWhoWeAre } from "@/components/about-who-we-are";
import { AboutCulture } from "@/components/about-culture";
import { AboutStory } from "@/components/about-story";
import { AboutWhatWeDo } from "@/components/about-what-we-do";
import { ContactCTA } from "@/components/contact-cta";
import { getCurrentUser } from "@/lib/auth";

export default async function AboutPage({
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

    return (
        <div className="flex min-h-screen flex-col">
            <Header dict={navigation} />
            <main className="flex-1">
                <AboutHero dict={about} isAdmin={isAdmin} />
                <AboutWhoWeAre dict={about.whoWeAre} isAdmin={isAdmin} />
                <AboutCulture dict={about.culture} isAdmin={isAdmin} />
                <AboutStory dict={about.story} isAdmin={isAdmin} />
                <AboutWhatWeDo dict={about.whatWeDo} isAdmin={isAdmin} />
                <ContactCTA
                    dict={about.contact}
                    lang={lang}
                    isAdmin={isAdmin}
                />
            </main>
            <Footer dict={footer} />
        </div>
    );
}
