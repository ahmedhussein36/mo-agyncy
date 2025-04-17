import React from "react";
import InfluencerForm from "./form";
import { creatorCategories } from "@/data/creators";

const AddNewInfluencer = () => {
    const audienceSizes = [
        { id: "1", size: "0-10k" },
        { id: "2", size: "10k-50k" },
        { id: "3", size: "50k-100k" },
        { id: "4", size: "100k-500k" },
        { id: "5", size: "500k-1M" },
        { id: "6", size: "1M+" },
    ];

    return (
        <div>
            <InfluencerForm
                categories={creatorCategories}
                audienceSizes={audienceSizes}
            />
        </div>
    );
};

export default AddNewInfluencer;
