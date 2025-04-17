"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

export function DashboardCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Example upcoming events - in a real app, these would come from your database
    const upcomingEvents = [
        {
            id: 1,
            title: "Campaign Review",
            date: addDays(new Date(), 2),
        },
        {
            id: 2,
            title: "New Influencer Onboarding",
            date: addDays(new Date(), 5),
        },
        {
            id: 3,
            title: "Brand Partnership Meeting",
            date: addDays(new Date(), 7),
        },
    ];

    return (
        <div className="space-y-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-muted-foreground"
            />

            {/* <div className="space-y-2">
                <h3 className="font-medium">Upcoming Events</h3>
                {upcomingEvents.map((event) => (
                    <Card key={event.id} className="p-2">
                        <CardContent className="p-2 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {event.date.toLocaleDateString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div> */}
        </div>
    );
}
