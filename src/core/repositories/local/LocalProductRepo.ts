import { LocalStore } from "./LocalStore";
import type { ProductRepository } from "../contracts/ProductRepository";
import type { Product, ProductInput, ProductUpdate } from "../../domain/product";

export class LocalProductRepo extends LocalStore implements ProductRepository {
    private products: Product[] = [];

    async getAll(): Promise<Product[]> {
        return [...this.products];
    }

    async getById(id: string): Promise<Product | null> {
        return this.products.find((product) => product.id === id) ?? null;
    }

    async search(query: string): Promise<Product[]> {
        const lowerQuery = query.toLowerCase();
        return this.products.filter((product) =>
            product.name.toLowerCase().includes(lowerQuery)
        );
    }

    async create(input: ProductInput): Promise<Product> {
        const product: Product = {
            ...input,
            id: Math.random().toString(36).substr(2, 9),
            active: input.active ?? true,
        };
        this.products.push(product);
        return product;
    }

    async update(id: string, input: ProductUpdate): Promise<Product> {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error("Product not found.");
        }
        this.products[productIndex] = { ...this.products[productIndex], ...input };
        return this.products[productIndex];
    }

    async delete(id: string): Promise<void> {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error("Product not found.");
        }
        this.products.splice(productIndex, 1);
    }
}