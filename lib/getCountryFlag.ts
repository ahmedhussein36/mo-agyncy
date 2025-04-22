export function getCountryCodeFromName(countryName: string): string | null {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

    const isoCountries = Array.from({ length: 26 ** 2 }, (_, i) => {
        const a = String.fromCharCode(65 + Math.floor(i / 26));
        const b = String.fromCharCode(65 + (i % 26));
        return a + b;
    });

    for (const code of isoCountries) {
        const name = regionNames.of(code);
        if (name?.toLowerCase() === countryName.toLowerCase()) {
            return code;
        }
    }

    return null;
}
