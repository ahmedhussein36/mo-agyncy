import { CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // لو بتستخدم shadcn
import React from "react";

type Status = "APPROVED" | "PENDING" | "REJECTED";

interface Props {
    status: Status;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
    const statusMap = {
        APPROVED: {
            color: "text-green-600 bg-lime-200",
            icon: <CheckCircle size={16} />,
            label: "Approved",
        },
        PENDING: {
            color: "text-yellow-600 bg-yellow-100",
            icon: <Clock size={16} />,
            label: "Pending",
        },
        REJECTED: {
            color: "text-red-600 bg-red-100",
            icon: <XCircle size={16} />,
            label: "Rejected",
        },
    };

    const current = statusMap[status];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
                current.color
            )}
        >
            {current.icon}
            {current.label}
        </span>
    );
};
