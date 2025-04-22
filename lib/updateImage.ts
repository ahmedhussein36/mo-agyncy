// lib/actions/updateImage.ts
import { prisma } from "@/lib/prisma";

export async function updateInfluencerImage(id: string, imagePath: string) {
    return await prisma.influencer.update({
        where: { id },
        data: { image: imagePath },
    });
}
