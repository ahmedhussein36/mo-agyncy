import React from "react";
import InfluencerForm from "./form";
import prisma from "@/lib/prisma";
import { Pencil } from "lucide-react";

const AddNewInfluencer = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const influencer = await prisma.influencer.findUnique({
        where: { id: id },
    });

    return (
        <div>
            <div className=" flex justify-center items-center gap-2 p-2 mb-4">
                <Pencil />
                <h1 className=" font-bold text-4xl text-center">
                    Edit Influencer
                </h1>
            </div>
            <InfluencerForm influencer={influencer as any} />
        </div>
    );
};

export default AddNewInfluencer;
