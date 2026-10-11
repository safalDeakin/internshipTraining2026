import type {
    Product,
    ProductInput,
    ProductUpdate,
} from "../../domain/product";
import type { ObservableRepository } from "./ObservableRepository";

export interface ProductRepository extends ObservableRepository {
    getAll(): Promise<Product[]>;

    getById(
        id: string
    ): Promise<Product | null>;

    search(
        query: string
    ): Promise<Product[]>;

    create(
        input: ProductInput
    ): Promise<Product>;

    update(
        id: string,
        input: ProductUpdate
    ): Promise<Product>;

    delete(
        id: string
    ): Promise<void>;

}