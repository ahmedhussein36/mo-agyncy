// data/brands.ts

export type Brand = {
    id: number;
    name: string;
    logo: string; // Black & white logo URL
};

export const brands: Brand[] = [
    { id: 1, name: "Zentrix", logo: "/partners/partner1.svg" },
    { id: 2, name: "Nexora", logo: "/partners/partner2.svg" },
    { id: 3, name: "Veltrix", logo: "/partners/partner3.svg" },
    { id: 4, name: "Lumora", logo: "/partners/partner4.svg" },
    { id: 5, name: "Quantico", logo: "/partners/partner5.svg" },
    { id: 6, name: "Fynix", logo: "/partners/partner6.svg" },
];
