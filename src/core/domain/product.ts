export type ProductType =
    | "Food"
    | "Beverage";

export interface Product {
    id: string;

    name: string;
    type: ProductType;

    price: number;

    sku?: string;
    category?: string;

    unit?: string;

    active: boolean;
}

export interface ProductInput {
    name: string;
    type: ProductType;

    price: number;

    sku?: string;
    category?: string;

    unit?: string;

    active?: boolean;
}

export type ProductUpdate = Partial<ProductInput>;