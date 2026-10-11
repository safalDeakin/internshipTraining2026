import type { Payment, PaymentInput } from "../../domain/payment";
import type { PaymentRepository } from "../contracts/PaymentRepository";
import { LocalStore } from "./LocalStore";

export class LocalPaymentRepo
    extends LocalStore
    implements PaymentRepository {
    private payments: Payment[] = [];

    async getByReservationId(
        reservationId: string
    ): Promise<Payment[]> {
        return this.payments.filter(
            (payment) => payment.reservationId === reservationId
        );
    }

    async getById(
        id: string
    ): Promise<Payment | null> {
        const payment = this.payments.find(
            (payment) => payment.id === id
        );
        return payment || null;
    }

    async create(input: PaymentInput): Promise<Payment> {
        const newPayment: Payment = {
            id: Date.now().toString(),
            ...input,
            status: "Unpaid",
            paidAt: "",
            refundedAmount: 0
        };

        this.payments = [...this.payments, newPayment];
        this.notify();

        return newPayment;
    }

    async refund(
        id: string,
        amount: number
    ): Promise<Payment> {
        const paymentIndex = this.payments.findIndex(
            (payment) => payment.id === id
        );

        if (paymentIndex === -1) {
            throw new Error("Payment not found");
        }

        const existingPayment = this.payments[paymentIndex];

        if (amount > existingPayment.amount) {
            throw new Error("Refund amount exceeds original payment");
        }

        const refundedPayment: Payment = {
            ...existingPayment,
            amount: existingPayment.amount - amount,
            refundedAmount: (existingPayment.refundedAmount || 0) + amount,
            status:
                existingPayment.amount - amount === 0
                    ? "Refunded"
                    : existingPayment.status,
        };

        this.payments[paymentIndex] = refundedPayment;
        this.notify();

        return refundedPayment;
    }
}