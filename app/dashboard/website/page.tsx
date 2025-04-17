import { requireAuth } from "@/lib/auth";
import { getWebsite } from "@/actions/website-actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateWebsite } from "@/actions/website-actions";
import Image from "next/image";

export default async function WebsitePage() {
    await requireAuth();

    const { website, error } = await getWebsite();

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const handelSubmit = async (formData: FormData) => {
        await updateWebsite(formData);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Website Settings
                </h1>
                <p className="text-muted-foreground">
                    Manage your website information and settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Website Information</CardTitle>
                    <CardDescription>
                        Update your website details and branding.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Website Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={website?.name || ""}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="url"
                                className="text-sm font-medium"
                            >
                                Website URL
                            </label>
                            <Input
                                id="url"
                                name="url"
                                type="url"
                                defaultValue={website?.url || ""}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="logo"
                                className="text-sm font-medium"
                            >
                                Logo URL
                            </label>
                            <Input
                                id="logo"
                                name="logo"
                                type="url"
                                defaultValue={website?.logo || ""}
                            />
                            {website?.logo && (
                                <div className="mt-2 p-2 border rounded-md">
                                    <Image
                                        src={website.logo || "/placeholder.svg"}
                                        alt="Website Logo"
                                        width={200}
                                        height={100}
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Website Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                rows={4}
                                defaultValue={website?.description || ""}
                            />
                        </div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
