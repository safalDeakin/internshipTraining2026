import type {
    ReservationInput,
    ReservationUpdate,
} from "../domain/reservation";

import type {
    GuestInput,
    GuestUpdate,
} from "../domain/guest";

import type {
    RoomInput,
    RoomUpdate,
} from "../domain/room";

import type {
    FolioItemInput,
    FolioItemUpdate,
} from "../domain/folio";

import type {
    PaymentInput,
    RefundInput,
} from "../domain/payment";

import type {
    ProductInput,
    ProductUpdate,
} from "../domain/product";

import type {
    KitchenOrder,
    KitchenOrderUpdate,
    KitchenOrderStatus,
} from "../domain/KitchenOrder";

import type {
    StockMovementInput,
} from "../domain/inventory";

import type {
    CalendarEventInput,
    CalendarEventUpdate,
} from "../domain/calendar";

import type { Repo } from "../repositories/Repo";

export class CommandService {
    private readonly repo: Repo;

    constructor(repo: Repo) {
        this.repo = repo;
    }

    // =========================================================
    // RESERVATIONS
    // =========================================================

    createReservation(
        input: ReservationInput
    ) {
        return this.repo.reservations.create(input);
    }

    updateReservation(
        id: string,
        input: ReservationUpdate
    ) {
        return this.repo.reservations.update(
            id,
            input
        );
    }

    deleteReservation(id: string) {
        return this.repo.reservations.delete(id);
    }

    cancelReservation(
        id: string,
        reason?: string
    ) {
        return this.repo.reservations.cancel(
            id,
            reason
        );
    }

    checkInReservation(id: string) {
        return this.repo.reservations.checkIn(id);
    }

    checkOutReservation(id: string) {
        return this.repo.reservations.checkOut(id);
    }

    // =========================================================
    // GUESTS
    // =========================================================

    createGuest(
        input: GuestInput
    ) {
        return this.repo.guests.create(input);
    }

    updateGuest(
        id: string,
        input: GuestUpdate
    ) {
        return this.repo.guests.update(
            id,
            input
        );
    }

    deleteGuest(id: string) {
        return this.repo.guests.delete(id);
    }

    // =========================================================
    // ROOMS
    // =========================================================

    createRoom(
        input: RoomInput
    ) {
        return this.repo.rooms.create(input);
    }

    updateRoom(
        id: string,
        input: RoomUpdate
    ) {
        return this.repo.rooms.update(
            id,
            input
        );
    }

    deleteRoom(id: string) {
        return this.repo.rooms.delete(id);
    }

    // =========================================================
    // FOLIO
    // =========================================================

    addFolioItem(
        reservationId: string,
        input: FolioItemInput
    ) {
        return this.repo.folios.addItem(
            reservationId,
            input
        );
    }

    updateFolioItem(
        itemId: string,
        input: FolioItemUpdate
    ) {
        return this.repo.folios.updateItem(
            itemId,
            input
        );
    }

    deleteFolioItem(itemId: string) {
        return this.repo.folios.deleteItem(
            itemId
        );
    }

    // =========================================================
    // PAYMENTS
    // =========================================================

    createPayment(
        input: PaymentInput
    ) {
        return this.repo.payments.create(input);
    }

    refundPayment(
        input: RefundInput
    ) {
        return this.repo.payments.refund(
            input.paymentId,
            input.amount
        );
    }

    // =========================================================
    // PRODUCTS
    // =========================================================

    createProduct(
        input: ProductInput
    ) {
        return this.repo.products.create(input);
    }

    updateProduct(
        id: string,
        input: ProductUpdate
    ) {
        return this.repo.products.update(
            id,
            input
        );
    }

    deleteProduct(id: string) {
        return this.repo.products.delete(id);
    }

    // =========================================================
    // KITCHEN ORDERS
    // =========================================================

    createKitchenOrder(
        order: KitchenOrder
    ) {
        return this.repo.kitchenOrders.create(
            order
        );
    }

    updateKitchenOrder(
        id: string,
        input: KitchenOrderUpdate
    ) {
        return this.repo.kitchenOrders.update(
            id,
            input
        );
    }

    updateKitchenOrderStatus(
        id: string,
        status: KitchenOrderStatus
    ) {
        return this.repo.kitchenOrders.updateStatus(
            id,
            status
        );
    }

    deleteKitchenOrder(id: string) {
        return this.repo.kitchenOrders.delete(
            id
        );
    }

    // =========================================================
    // INVENTORY
    // =========================================================

    addStock(
        input: StockMovementInput
    ) {
        return this.repo.inventory.addStock(
            input
        );
    }

    removeStock(
        input: StockMovementInput
    ) {
        return this.repo.inventory.removeStock(
            input
        );
    }

    // =========================================================
    // CALENDAR
    // =========================================================

    createCalendarEvent(
        input: CalendarEventInput
    ) {
        return this.repo.calendar.create(input);
    }

    updateCalendarEvent(
        id: number,
        input: CalendarEventUpdate
    ) {
        return this.repo.calendar.update(
            id,
            input
        );
    }

    deleteCalendarEvent(id: number) {
        return this.repo.calendar.delete(id);
    }
}