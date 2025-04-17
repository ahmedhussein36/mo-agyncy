import { prisma } from "@/lib/prisma";
import InfluencerProfile from "@/components/dashboard/influencer-profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, PenIcon, PinIcon } from "lucide-react";

export default async function EditBrandPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const influencer = await prisma.influencer.findUnique({
        where: { id: id },
    });

    if (!influencer) return <div>No influencer found!</div>;

    return (
        <div>
            <InfluencerProfile influencer={influencer} />
        </div>
    );
}
