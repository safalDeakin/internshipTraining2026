export interface Reservation {
    reservationId: string;
    accommodationId: string;
    guestName: string;
    guestNo: string;
    roomNumber: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    status: "Pending" | "Confirmed" | "Checked In" | "Checked Out" | "Cancelled";
    paymentStatus: "Unpaid" | "Partial" | "Paid" | "Refunded";
    bookingSource: "Direct" | "Booking.com" | "Agoda" | "Other";
    roomCharge: number;
    contact: string;
    tax: number;
    discount: number;
    totalAmount: number;
    paidAmount: number;
    advance: number;
    remainingAmount: number;
    refund: number;
    reason: string;
    createdAt: string;
    cancelDate?: string;
}