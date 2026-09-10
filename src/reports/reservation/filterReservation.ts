import type { Reservation } from "./reservationData";

export interface ReservationFilters {
    search: string;
    status: string;
    roomType: string;
    paymentStatus: string;
    fromDate: string;
    toDate: string;
}

export const filterReservations = (reservations: Reservation[], filters: ReservationFilters) => {
    const {
        search,
        status,
        roomType,
        paymentStatus,
        fromDate,
        toDate,
    } = filters;

    return reservations.filter((reservation) => {
        const matchesSearch = reservation.guestName.toLowerCase().includes(search.toLowerCase()) ||
            reservation.reservationId.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            !status || reservation.status === status;

        const matchesRoomType =
            !roomType || reservation.roomType === roomType;

        const matchesPaymentStatus =
            !paymentStatus || reservation.paymentStatus === paymentStatus;

        const matchesFromDate =
            !fromDate || reservation.checkIn >= fromDate;

        const matchesToDate =
            !toDate || reservation.checkIn <= toDate;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesRoomType &&
            matchesPaymentStatus &&
            matchesFromDate &&
            matchesToDate
        );
    });
};