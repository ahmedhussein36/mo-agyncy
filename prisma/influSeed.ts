import { allCreators } from "@/data/creators";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (const creator of allCreators) {
        await prisma.influencer.updateMany({
            where: { email: creator.email },
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

main()
    .then(() => {
        console.log("✅ Seeding completed");
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error("❌ Seeding failed", e);
        return prisma.$disconnect();
    });
