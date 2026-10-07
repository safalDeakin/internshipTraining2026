import type {
    KitchenOrder,
    KitchenOrderUpdate,
} from "../../domain/KitchenOrder";
import type { ObservableRepository } from "./ObservableRepository";

export interface KitchenOrderRepository extends ObservableRepository {
    getAll(): Promise<KitchenOrder[]>;

    getById(
        id: string
    ): Promise<KitchenOrder | null>;

    getByStatus(
        status: KitchenOrder["status"]
    ): Promise<KitchenOrder[]>;

    create(
        order: KitchenOrder
    ): Promise<KitchenOrder>;

    update(
        id: string,
        input: KitchenOrderUpdate
    ): Promise<KitchenOrder>;

    updateStatus(
        id: string,
        status: KitchenOrder["status"]
    ): Promise<KitchenOrder>;

    delete(
        id: string
    ): Promise<void>;

}