import { allCreators } from "@/data/creators";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (const creator of allCreators) {
        // const totalFollowers = Object.values(creator?.followers)
        //     .map((val) => {
        //         if (val.toLowerCase().includes("k")) {
        //             return parseFloat(val) * 1_000;
        //         } else if (val.toLowerCase().includes("m")) {
        //             return parseFloat(val) * 1_000_000;
        //         }
        //         return parseFloat(val);
        //     })
        //     .reduce((acc, val) => acc + val, 0);

        // const socialLinks = Object.entries(creator.followers).map(
        //     ([platform, count]) => ({
        //         platform,
        //         url: `https://www.${platform}.com/${generateUsername(
        //             creator.name,
        //             platform
        //         )}`,
        //     })
        // );

        await prisma.influencer.create({
            data: {
                name: creator.name,
                email:
                    creator.email || `${creator.name.toLowerCase()}@gmail.com`,
                phone: creator.phone,
                bio: creator.bio,
                image: creator.image,
                category: creator.category,
                status: "APPROVED",
                followers: creator.followers,
                country: creator.country,
                gender: creator.gender || "Not specified",
                dateOfBirth: new Date(creator.dateOfBirth),
                socialLinks: creator.socialLinks?.map((link) => ({
                    ...link,
                })),
                approvedAt: new Date(),
            },
        });
    }
}

function generateUsername(name: string, platform: string): string {
    return `${name.toLowerCase().replace(/\s/g, "_")}_${platform}`;
}

function generateRandomPhone(): string {
    const num = Math.floor(Math.random() * 9000000000 + 1000000000);
    return `+1${num}`;
}

main()
    .then(() => {
        console.log("✅ Seeding completed");
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error("❌ Seeding failed", e);
        return prisma.$disconnect();
    });
