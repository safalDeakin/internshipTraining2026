import type {
    InventoryItem,
    StockMovement,
    StockMovementInput,
} from "../../domain/inventory";

import type { InventoryRepository } from "../contracts/InventoryRepository";

import { LocalStore } from "./LocalStore";

export class LocalInventoryRepo
    extends LocalStore
    implements InventoryRepository
{
    private inventory: InventoryItem[] = [];

    private movements: StockMovement[] = [];

    // =========================================================
    // GET ALL INVENTORY
    // =========================================================

    async getAll(): Promise<InventoryItem[]> {
        return this.inventory.map((item) => ({
            ...item,
        }));
    }

    // =========================================================
    // GET INVENTORY BY PRODUCT
    // =========================================================

    async getByProductId(
        productId: string
    ): Promise<InventoryItem | null> {
        const item = this.inventory.find(
            (item) => item.productId === productId
        );

        return item
            ? { ...item }
            : null;
    }

    // =========================================================
    // ADD STOCK
    // =========================================================

    async addStock(
        input: StockMovementInput
    ): Promise<void> {
        let existingItem =
            this.inventory.find(
                (item) =>
                    item.productId === input.productId
            );

        // Create inventory item if it doesn't exist
        if (!existingItem) {
            existingItem = {
                id: crypto.randomUUID(),
                productId: input.productId,
                quantity: 0,
                minimumQuantity: 0,
                unit: "unit",
            };

            this.inventory = [
                ...this.inventory,
                existingItem,
            ];
        }

        // Increase stock
        existingItem.quantity += input.quantity;

        // Record movement
        const movement: StockMovement = {
            id: crypto.randomUUID(),
            productId: input.productId,
            type: "IN",
            quantity: input.quantity,
            reason: input.reason,
            createdAt: new Date().toISOString(),
        };

        this.movements = [
            ...this.movements,
            movement,
        ];

        this.notify();
    }

    // =========================================================
    // REMOVE STOCK
    // =========================================================

    async removeStock(
        input: StockMovementInput
    ): Promise<void> {
        const existingItem =
            this.inventory.find(
                (item) =>
                    item.productId === input.productId
            );

        if (!existingItem) {
            throw new Error(
                "Inventory item not found"
            );
        }

        if (
            existingItem.quantity <
            input.quantity
        ) {
            throw new Error(
                "Insufficient stock to remove"
            );
        }

        // Decrease stock
        existingItem.quantity -= input.quantity;

        // Record movement
        const movement: StockMovement = {
            id: crypto.randomUUID(),
            productId: input.productId,
            type: "OUT",
            quantity: input.quantity,
            reason: input.reason,
            createdAt: new Date().toISOString(),
        };

        this.movements = [
            ...this.movements,
            movement,
        ];

        this.notify();
    }

    // =========================================================
    // GET STOCK MOVEMENTS
    // =========================================================

    async getMovements(
        productId?: string
    ): Promise<StockMovement[]> {
        const movements = productId
            ? this.movements.filter(
                  (movement) =>
                      movement.productId ===
                      productId
              )
            : this.movements;

        return movements.map((movement) => ({
            ...movement,
        }));
    }

    // =========================================================
    // REPLACE ALL INVENTORY
    // =========================================================

    replaceAll(
        inventory: InventoryItem[]
    ): void {
        this.inventory = inventory.map(
            (item) => ({
                ...item,
            })
        );

        this.notify();
    }

    // =========================================================
    // REPLACE ALL MOVEMENTS
    // =========================================================

    replaceAllMovements(
        movements: StockMovement[]
    ): void {
        this.movements = movements.map(
            (movement) => ({
                ...movement,
            })
        );

        this.notify();
    }
}