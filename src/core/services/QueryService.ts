import type { Repo } from "../repositories/Repo";
import type { ReservationFilter } from "../domain/reservation";

export class QueryService {
    private readonly repo: Repo;
    constructor(repo: Repo) {
        this.repo = repo;
    }

    // RESERVATIONS

    getReservations(
        filter?: ReservationFilter
    ) {
        return this.repo.reservations.getAll(filter);
    }

    getReservation(id: string) {
        return this.repo.reservations.getById(id);
    }

    subscribeReservations(
        listener: () => void
    ) {
        return this.repo.reservations.subscribe(listener);
    }

    // ROOMS

    getRooms() {
        return this.repo.rooms.getAll();
    }

    getRoom(id: string) {
        return this.repo.rooms.getById(id);
    }

    // GUESTS

    getGuests() {
        return this.repo.guests.getAll();
    }

    getGuest(id: string) {
        return this.repo.guests.getById(id);
    }

    searchGuests(query: string) {
        return this.repo.guests.search(query);
    }

    // FOLIO

    getFolioItems(
        reservationId: string
    ) {
        return this.repo.folios.getByReservationId(
            reservationId
        );
    }

    // PAYMENTS

    getPayments(
        reservationId: string
    ) {
        return this.repo.payments.getByReservationId(
            reservationId
        );
    }

    getPayment(id: string) {
        return this.repo.payments.getById(id);
    }

    // PRODUCTS

    getProducts() {
        return this.repo.products.getAll();
    }

    getProduct(id: string) {
        return this.repo.products.getById(id);
    }

    searchProducts(query: string) {
        return this.repo.products.search(query);
    }

    // KITCHEN ORDERS

    getKitchenOrders() {
        return this.repo.kitchenOrders.getAll();
    }

    getKitchenOrder(id: string) {
        return this.repo.kitchenOrders.getById(id);
    }

    getKitchenOrdersByStatus(
        status: Parameters<
            typeof this.repo.kitchenOrders.getByStatus
        >[0]
    ) {
        return this.repo.kitchenOrders.getByStatus(
            status
        );
    }

    // INVENTORY

    getInventory() {
        return this.repo.inventory.getAll();
    }

    // CALENDAR

    getCalendarEvents() {
        return this.repo.calendar.getAll();
    }

    getCalendarEvent(id: number) {
        return this.repo.calendar.getById(id);
    }
}