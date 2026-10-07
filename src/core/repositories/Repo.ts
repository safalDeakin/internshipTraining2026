import type {
    ReservationRepository,
} from "./contracts/ReservationRepository";

import type {
    RoomRepository,
} from "./contracts/RoomRepository";

import type {
    GuestRepository,
} from "./contracts/GuestRepository";

import type {
    FolioRepository,
} from "./contracts/FolioRepository";

import type {
    PaymentRepository,
} from "./contracts/PaymentRepository";

import type {
    ProductRepository,
} from "./contracts/ProductRepository";

import type {
    KitchenOrderRepository,
} from "./contracts/KitchenOrderRepository";

import type {
    InventoryRepository,
} from "./contracts/InventoryRepository";

import type {
    CalendarRepository,
} from "./contracts/CalendarRepository";

export interface RepoDependencies {
    reservations: ReservationRepository;
    rooms: RoomRepository;
    guests: GuestRepository;
    folios: FolioRepository;
    payments: PaymentRepository;
    products: ProductRepository;
    kitchenOrders: KitchenOrderRepository;
    inventory: InventoryRepository;
    calendar: CalendarRepository;
}

export class Repo {
    readonly reservations: ReservationRepository;
    readonly rooms: RoomRepository;
    readonly guests: GuestRepository;
    readonly folios: FolioRepository;
    readonly payments: PaymentRepository;
    readonly products: ProductRepository;
    readonly kitchenOrders: KitchenOrderRepository;
    readonly inventory: InventoryRepository;
    readonly calendar: CalendarRepository;

    constructor(dependencies: RepoDependencies) {
        this.reservations = dependencies.reservations;
        this.rooms = dependencies.rooms;
        this.guests = dependencies.guests;
        this.folios = dependencies.folios;
        this.payments = dependencies.payments;
        this.products = dependencies.products;
        this.kitchenOrders = dependencies.kitchenOrders;
        this.inventory = dependencies.inventory;
        this.calendar = dependencies.calendar;
    }
}