type Service = {
    header: {
        title: string;
        subtitle: string;
    };
    locale?: string;
    slug: string;
    items?: {
        title: string;
        description: string;
        features: {
            value: string;
        }[];
    }[];
    button: string;
};

export const services: Service = {
    locale: "en",
    slug: "Services",
    header: {
        title: "Our Services",
        subtitle: "Comprehensive solutions tailored to your needs.",
    },

    items: [
        {
            title: "Influencer Matching",
            description:
                "We connect brands with influencers who align with their values and target audience. Our proprietary matching algorithm ensures the perfect fit for every campaign.",
            features: [
                {
                    value: "Demographic targeting",
                },
                {
                    value: "Interest-based matching",
                },
                {
                    value: "Performance history analysis",
                },
                {
                    value: "Audience authenticity verification",
                },
            ],
        },
        {
            title: "Campaign Management",
            description:
                "From concept to execution, we handle every aspect of your influencer campaigns. Our experienced team ensures smooth operation and maximum impact.",
            features: [
                {
                    value: "Campaign strategy development",
                },
                {
                    value: "Content briefing and approval",
                },
                {
                    value: "Timeline management",
                },
                {
                    value: "Performance tracking",
                },
            ],
        },
        {
            title: "Content Creation",
            description:
                "Our network of creators produces high-quality, engaging content that resonates with your target audience and drives results.",
            features: [
                {
                    value: "Creative concept development",
                },
                {
                    value: "Professional production",
                },
                {
                    value: "Multi-platform optimization",
                },
                {
                    value: "Brand guideline compliance",
                },
            ],
        },
        {
            title: "Analytics & Reporting",
            description:
                "Gain valuable insights into your campaigns with our comprehensive analytics and reporting tools.",
            features: [
                {
                    value: "Real-time performance tracking",
                },
                {
                    value: "Engagement analysis",
                },
                {
                    value: "ROI calculation",
                },
                {
                    value: "Competitive benchmarking",
                },
            ],
        },
    ],
    button: "Get Started",
};
