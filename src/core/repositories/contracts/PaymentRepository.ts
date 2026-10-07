import type {
    Payment,
    PaymentInput,
} from "../../domain/payment";
import type { ObservableRepository } from "./ObservableRepository";

export interface PaymentRepository extends ObservableRepository {
    getByReservationId(
        reservationId: string
    ): Promise<Payment[]>;

    getById(
        id: string
    ): Promise<Payment | null>;

    create(
        input: PaymentInput
    ): Promise<Payment>;

    refund(
        id: string,
        amount: number
    ): Promise<Payment>;


}