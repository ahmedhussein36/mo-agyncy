import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    secondaryActionLabel?: string;
    secondaryActionLink?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionLink,
    secondaryActionLabel,
    secondaryActionLink,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
                <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mb-6">{description}</p>
            <div className="flex flex-wrap gap-3 justify-center">
                {actionLabel && actionLink && (
                    <Button asChild>
                        <Link href={actionLink}>{actionLabel}</Link>
                    </Button>
                )}
                {secondaryActionLabel && secondaryActionLink && (
                    <Button asChild variant="outline">
                        <Link href={secondaryActionLink}>
                            {secondaryActionLabel}
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
