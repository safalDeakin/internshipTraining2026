export type KitchenOrderStatus =
    | "Pending"
    | "Preparing"
    | "Ready"
    | "Served"
    | "Cancelled";

export interface KitchenOrderItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface KitchenOrder {
    id: string;

    reservationId?: string;

    items: KitchenOrderItem[];

    status: KitchenOrderStatus;

    subtotal: number;
    tax: number;
    discount: number;
    total: number;

    createdAt: string;
    updatedAt: string;
}

export interface KitchenOrderItemInput {
    productId: string;
    quantity: number;
}

export interface KitchenOrderInput {
    reservationId?: string;
    items: KitchenOrderItemInput[];
}

export interface KitchenOrderUpdate {
    items?: KitchenOrderItem[];

    status?: KitchenOrderStatus;

    subtotal?: number;
    tax?: number;
    discount?: number;
    total?: number;
}