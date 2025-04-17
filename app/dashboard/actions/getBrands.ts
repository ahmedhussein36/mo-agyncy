import prisma from "@/lib/prisma";

interface GetBrandsParams {
    params: {
        name?: string;
        eamil?: string;
        industry?: string;
        country?: string;
        status?: string;
    };
}

export const getApprovedBrands = async ({ params }: GetBrandsParams) => {
    const { name, country, status, eamil, industry } = params;
    let query: any = {};
    if (name) {
        query.name = {
            contains: name,
            mode: "insensitive",
        };
    }
    if (country) {
        query.country = {
            contains: country,
            mode: "insensitive",
        };
    }
    if (status) {
        query.status = status;
    }
    if (eamil) {
        query.email = {
            contains: eamil,
            mode: "insensitive",
        };
    }
    if (industry) {
        query.industry = {
            contains: industry,
            mode: "insensitive",
        };
    }

    const brands = await prisma.brand.findMany({
        where: { ...query, status: "approved" },
    });

    return brands.map((brand) => ({
        ...brand,
        createdAt: brand.createdAt.toISOString(),
        updatedAt: brand.updatedAt.toISOString(),
    }));
};

export const gePendingBrands = async ({ params }: GetBrandsParams) => {
    const { name, country, status, eamil, industry } = params;
    let query: any = {};
    if (name) {
        query.name = {
            contains: name,
            mode: "insensitive",
        };
    }
    if (country) {
        query.country = {
            contains: country,
            mode: "insensitive",
        };
    }
    if (status) {
        query.status = status;
    }
    if (eamil) {
        query.email = {
            contains: eamil,
            mode: "insensitive",
        };
    }
    if (industry) {
        query.industry = {
            contains: industry,
            mode: "insensitive",
        };
    }

    const brands = await prisma.brand.findMany({
        where: { ...query, status: "pending" },
    });

    return brands.map((brand) => ({
        ...brand,
        createdAt: brand.createdAt.toISOString(),
        updatedAt: brand.updatedAt.toISOString(),
    }));
};
