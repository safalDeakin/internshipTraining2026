import type {
    InventoryItem,
    StockMovement,
    StockMovementInput,
} from "../../domain/inventory";
import type { ObservableRepository } from "./ObservableRepository";

export interface InventoryRepository extends ObservableRepository {
    getAll(): Promise<InventoryItem[]>;

    getByProductId(
        productId: string
    ): Promise<InventoryItem | null>;

    addStock(
        input: StockMovementInput
    ): Promise<void>;

    removeStock(
        input: StockMovementInput
    ): Promise<void>;

    getMovements(
        productId?: string
    ): Promise<StockMovement[]>;


}