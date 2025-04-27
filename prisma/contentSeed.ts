// prisma/seed.ts

import { about } from "@/data/about";
import { contact, faqs } from "@/data/contact";
import { home } from "@/data/home";
import { services } from "@/data/services";
import prisma from "@/lib/prisma";

async function main() {
    const pages = [
        { slug: "home", content: home },
        { slug: "about", content: about },
        { slug: "services", content: services },
        { slug: "contact", content: contact },
        { slug: "faq", content: faqs },
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: { content: page.content },
            create: { slug: page.slug, content: page.content },
        });
    }

    console.log("✅ Seeding completed successfully.");
}

main()
    .catch((e) => {
        console.error("❌ Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
