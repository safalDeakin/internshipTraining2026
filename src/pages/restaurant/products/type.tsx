
export type ProductItem = {
    id: string;
    name: string;
    sku: string;
    description: string;
    calories: string;
    image: string;
};

export type ProductGroup = {
    id: string;
    name: string;
    code: string;
    status: "Active" | "Inactive";
    items: ProductItem[];
    attributes: string[][];
    tags: string[];
};
