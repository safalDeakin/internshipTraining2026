import type {
    Reservation,
    ReservationInput,
    ReservationUpdate,
    ReservationFilter,
} from "../../domain/reservation";
import type { ObservableRepository } from "./ObservableRepository";

export interface ReservationRepository extends ObservableRepository {
    //Read
    getAll(
        filter?: ReservationFilter
    ): Promise<Reservation[]>;

    getById(
        id: string
    ): Promise<Reservation | null>;


    // Write
    create(
        input: ReservationInput
    ): Promise<Reservation>;

    update(
        id: string,
        input: ReservationUpdate
    ): Promise<Reservation>;

    delete(
        id: string
    ): Promise<void>;

    cancel(
        id: string,
        reason?: string
    ): Promise<Reservation>;

    checkIn(
        id: string
    ): Promise<Reservation>;

    checkOut(
        id: string
    ): Promise<Reservation>;


}