export type PaymentMethod =
    | "Cash"
    | "Card"
    | "Bank"
    | "Online"
    | "Other";

export type PaymentStatus =
    | "Unpaid"
    | "Partial"
    | "Paid"
    | "Refunded";

export interface Payment {
    refundedAmount: number;
    id: string;

    reservationId: string;

    amount: number;
    method: PaymentMethod;

    status: PaymentStatus;

    paidAt: string;

    reference?: string;
    notes?: string;
}

export interface PaymentInput {
    reservationId: string;

    amount: number;
    method: PaymentMethod;

    reference?: string;
    notes?: string;
}

export interface RefundInput {
    paymentId: string;
    amount: number;
    reason?: string;
}

export interface ReservationPaymentSummary {
    roomCharge: number;
    nights: number;
    taxAndFee: number;
    discount: number;
    totalAmount: number;
    advancePaid: number;
    outstandingBalance: number;
}