type Service = {
    id: number;
    locale?: string;
    name: string;
    description: string;
    image: string;
    features?: string[];
};

export const services: Service[] = [
    {
        id: 1,
        locale: "en",
        name: "Web Development",
        description:
            "We create stunning and responsive websites that cater to your business needs.",
        image: "/images/services/web-development.jpg",
        features: [
            "Responsive Design",
            "SEO Optimization",
            "E-commerce Integration",
            "Content Management System (CMS)",
            "Performance Optimization",
        ],
    },
];
