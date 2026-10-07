import type { Guest } from "./guest";
import type { Room } from "./room";
import type { FolioItem } from "./folio";
import type { PaymentStatus, ReservationPaymentSummary } from "./payment";

export type ReservationStatus =
    | "Pending"
    | "Confirmed"
    | "Checked In"
    | "Checked Out"
    | "Cancelled";

export type ReservationSource =
    | "Direct"
    | "Booking.com"
    | "Agoda"
    | "Other";

export interface Reservation {
    id: string;

    reservationNumber: string;
    accommodationId: string;

    bookingDate: string;

    status: ReservationStatus;
    source: ReservationSource;
    ratePlan: string;

    adults: number;
    children: number;

    expectedArrival: string;
    checkInTime: string;

    guest: Guest;
    room: Room;

    payment: ReservationPaymentSummary;

    notes: string;

    folioItems: FolioItem[];
}



export interface ReservationInput {
    reservationNumber: string;
    accommodationId: string;

    bookingDate: string;

    source: ReservationSource;
    ratePlan: string;

    adults: number;
    children: number;

    expectedArrival: string;
    checkInTime: string;

    guestId: string;
    roomId: string;

    notes?: string;
}


export type ReservationUpdate = Partial<{
    roomId: string;

    status: ReservationStatus;
    source: ReservationSource;
    ratePlan: string;

    adults: number;
    children: number;

    expectedArrival: string;
    checkInTime: string;

    notes: string;
}>;

export interface ReservationFilter {
    search?: string;

    status?: ReservationStatus;
    paymentStatus?: PaymentStatus;
    source?: ReservationSource;

    roomId?: string;
    roomType?: string;
    guestId?: string;

    fromDate?: string;
    toDate?: string;
}