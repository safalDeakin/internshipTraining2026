import type {
    KitchenOrder,
    KitchenOrderUpdate,
} from "../../domain/KitchenOrder";

import type { KitchenOrderRepository } from "../contracts/KitchenOrderRepository";

import { LocalStore } from "./LocalStore";

export class LocalKitchenOrderRepo
    extends LocalStore
    implements KitchenOrderRepository
{
    private orders: KitchenOrder[] = [];

    // GET ALL ORDERS
    async getAll(): Promise<KitchenOrder[]> {
        return [...this.orders];
    }

    // GET ORDER BY ID
    async getById(
        id: string
    ): Promise<KitchenOrder | null> {
        return (
            this.orders.find(
                (order) => order.id === id
            ) ?? null
        );
    }

    // GET ORDERS BY STATUS
    async getByStatus(
        status: KitchenOrder["status"]
    ): Promise<KitchenOrder[]> {
        return this.orders.filter(
            (order) => order.status === status
        );
    }

    // CREATE ORDER
    async create(
        order: KitchenOrder
    ): Promise<KitchenOrder> {
        this.orders = [
            ...this.orders,
            order,
        ];

        this.notify();

        return order;
    }

    // UPDATE ORDER
    async update(
        id: string,
        input: KitchenOrderUpdate
    ): Promise<KitchenOrder> {
        const existing = await this.getById(id);

        if (!existing) {
            throw new Error(
                `Kitchen order ${id} not found`
            );
        }

        const updated: KitchenOrder = {
            ...existing,
            ...input,
            updatedAt: new Date().toISOString(),
        };

        this.orders = this.orders.map(
            (order) =>
                order.id === id
                    ? updated
                    : order
        );

        this.notify();

        return updated;
    }

    // UPDATE ORDER STATUS
    async updateStatus(
        id: string,
        status: KitchenOrder["status"]
    ): Promise<KitchenOrder> {
        return this.update(id, {
            status,
        });
    }

    // DELETE ORDER
    async delete(id: string): Promise<void> {
        const existing = await this.getById(id);

        if (!existing) {
            throw new Error(
                `Kitchen order ${id} not found`
            );
        }

        this.orders = this.orders.filter(
            (order) => order.id !== id
        );

        this.notify();
    }

    // REPLACE ALL LOCAL DATA
    // Useful later for synchronization.
    replaceAll(
        orders: KitchenOrder[]
    ): void {
        this.orders = [...orders];

        this.notify();
    }
}