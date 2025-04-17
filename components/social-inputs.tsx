"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const platforms = [
    "Instagram",
    "Tiktok",
    "Youtube",
    "Facebook",
    "Twitter",
    "Other",
];

export default function SocialMediaInputs() {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    const handlePlatformChange = (platform: string, checked: boolean) => {
        if (checked) {
            setSelectedPlatforms((prev) => [...prev, platform]);
        } else {
            setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));
        }
    };

    return (
        <div className="space-y-2 mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
                {platforms.map((platform) => (
                    <div key={platform} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id={platform}
                                onCheckedChange={(checked) =>
                                    handlePlatformChange(
                                        platform,
                                        Boolean(checked)
                                    )
                                }
                            />
                            <label
                                htmlFor={platform}
                                className="text-sm font-medium capitalize"
                            >
                                {platform}
                            </label>
                        </div>

                        {selectedPlatforms.includes(platform) && (
                            <div className="space-y-2">
                                <Input
                                    id={`${platform.toLowerCase()}-url`}
                                    placeholder={`${platform} Account URL`}
                                />
                                <Input
                                    id={`${platform.toLowerCase()}-followers`}
                                    placeholder={`Followers Count`}
                                    type="number"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
