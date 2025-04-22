"use client";

import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { getCountryCodeFromName } from "@/lib/getCountryFlag";

export const CountryFlag = ({ country }: { country: string }) => {
    const [code, setCode] = useState<string>("");

    useEffect(() => {
        const result = getCountryCodeFromName(country);
        if (result) setCode(result);
    }, [country]);

    return (
        <div>
            {code && (
                <ReactCountryFlag
                    countryCode={code}
                    alt={country}
                    svg
                    style={{
                        width: "24px",
                        height: "18px",
                    }}
                />
            )}
        </div>
    );
};
