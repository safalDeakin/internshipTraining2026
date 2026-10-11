export type StockMovementType =
    | "IN"
    | "OUT"
    | "ADJUSTMENT";

export interface InventoryItem {
    id: string;

    productId: string;

    quantity: number;
    minimumQuantity: number;

    unit: string;
}

export interface StockMovement {
    id: string;

    productId: string;

    type: StockMovementType;

    quantity: number;

    reason?: string;

    createdAt: string;
}

export interface StockMovementInput {
    productId: string;

    type: StockMovementType;

    quantity: number;

    reason?: string;
}