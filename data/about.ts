type AboutPageContent = {
    id: number;
    locale?: string;
    title: string;
    subtitle?: string;
    exrept?: string;
    mission?: string;
    vision?: string;
    culture?: {
        title: string;
        subtitle?: string;
        values?: {
            id: number;
            title: string;
            description?: string;
            image?: string;
        }[];
    };
    content: {
        id: number;
        title: string;
        description?: string[];
        image?: string;
    }[];
};

export const aboutPageContent: AboutPageContent = {
    id: 1,
    locale: "en",
    title: "About Mo Agency",
    subtitle:
        "Connecting Brands with Influencers for Maximum Impact, Learn more about our agency and our mission.",
    exrept: "We are a leading influencer marketing agency connecting brands with influential creators. Our mission is to create authentic partnerships that drive real results.",
    mission:
        "Our mission is to revolutionize the way brands connect with audiences through authentic influencer partnerships. To empower brands and influencers to achieve their goals through authentic collaborations.",
    vision: "We envision a world where every brand can harness the power of influence to create meaningful connections. To be the leading influencer marketing agency recognized for innovation and excellence.",
    culture: {
        title: "Our Culture, Values and Commitment",
        subtitle:
            "We believe in the power of authentic connections and the impact of genuine storytelling.",
        values: [
            {
                id: 1,
                title: "Innovation",
                description:
                    "We constantly push the boundaries of what's possible in influencer marketing.",
            },

            {
                id: 2,
                title: "Authenticity",
                description:
                    "We believe in genuine connections between brands and creators.",
            },
            {
                id: 3,
                title: "Diversity",
                description:
                    "We celebrate diversity and inclusion in all our partnerships.",
            },
            {
                id: 4,
                title: "Excellence",
                description:
                    "We strive for excellence in everything we do, from strategy to execution.",
            },
        ],
    },
    content: [
        {
            id: 1,
            title: "Who Mo Agency Is",
            description: [
                "Mo Agency is a leading influencer marketing agency that specializes in connecting brands with the right influencers to create impactful campaigns.",
                "We understand the power of social media and the influence it has on consumer behavior.",
                "Our team of experts is dedicated to helping brands navigate the complex world of influencer marketing, ensuring that every partnership is authentic and effective.",
                "With a focus on data-driven strategies, we leverage our extensive network of influencers to deliver measurable results for our clients.",
                "Whether you're looking to increase brand awareness, drive sales, or engage with your audience, Mo Agency has the expertise to help you achieve your goals.",
                "We pride ourselves on our ability to adapt to the ever-changing landscape of social media and influencer marketing, ensuring that our clients stay ahead of the curve.",
            ],
            image: "/images/agency-en.jpg",
        },
        {
            id: 2,
            title: "Our Story",
            description: [
                "Founded in 2020, we started with a simple mission: to revolutionize the way brands connect with audiences through authentic influencer partnerships.",
                "What started as a small team with big dreams has grown into a global agency with a network of thousands of influencers across various platforms and niches.",
                "Throughout our journey, we've remained committed to our core values of authenticity, innovation, and excellence, helping brands and influencers create meaningful connections that drive real results.",
                "Our team is passionate about what we do, and we take pride in our ability to adapt to the ever-changing landscape of social media and influencer marketing.",
                "We believe in the power of storytelling and the impact of genuine connections, and we strive to bring that to every campaign we undertake.",
            ],
            image: "/images/story-en.jpg",
        },
        {
            id: 3,
            title: "What We Do",
            description: [
                "At Mo Agency, we specialize in influencer marketing, helping brands connect with the right influencers to create impactful campaigns.",
                "Our services include influencer identification, campaign strategy, content creation, and performance analysis.",
                "We work closely with our clients to understand their goals and develop tailored strategies that drive results.",
                "Our team of experts is dedicated to ensuring that every partnership is authentic and effective, leveraging our extensive network of influencers to deliver measurable results.",
                "Whether you're looking to increase brand awareness, drive sales, or engage with your audience, Mo Agency has the expertise to help you achieve your goals.",
            ],
            image: "",
        },
    ],
};
