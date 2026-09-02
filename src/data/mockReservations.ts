import { type Reservation, type KitchenOrder } from "../repo/Repo";

export const mockReservations: Reservation[] = [
    {
        id: "res-001",
        accommodationId: "acc-001",
        status: "CONFIRMED",
        name: "John Doe",
        room: "101",
    },
    {
        id: "res-002",
        accommodationId: "acc-001",
        status: "CHECKED_IN",
        name: "Sarah Smith",
        room: "102",
    },
    {
        id: "res-003",
        accommodationId: "acc-002",
        status: "PENDING",
        name: "Michael Brown",
        room: "201",
    },
    {
        id: "res-004",
        accommodationId: "acc-002",
        status: "CONFIRMED",
        name: "Emily Johnson",
        room: "202",
    },
];

export const mockKitchenOrders: KitchenOrder[] = [
    {
        id: "order-001",
        restaurantId: "rest-001",
        status: "PENDING",
    },
    {
        id: "order-002",
        restaurantId: "rest-001",
        status: "PREPARING",
    },
    {
        id: "order-003",
        restaurantId: "rest-002",
        status: "READY",
    },
    {
        id: "order-004",
        restaurantId: "rest-002",
        status: "COMPLETED",
    },
    {
        id: "order-005",
        restaurantId: "rest-003",
        status: "PENDING",
    },
    {
        id: "order-006",
        restaurantId: "rest-003",
        status: "PREPARING",
    },
    {
        id: "order-007",
        restaurantId: "rest-001",
        status: "READY",
    },
    {
        id: "order-008",
        restaurantId: "rest-002",
        status: "CANCELLED",
    },
];