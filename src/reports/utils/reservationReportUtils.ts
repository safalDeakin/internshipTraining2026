import type { Reservation } from "../../types/reservation";

export const getTotalReservations = (reservations: Reservation[]): number => {
    return reservations.length;
};

export const getConfirmedReservations = (reservations: Reservation[]): number => {
    return reservations.filter(
        (reservation) => reservation.status === "Confirmed"
    ).length;
};

export const getCancelledReservations = (reservations: Reservation[]): number => {
    return reservations.filter(
        (reservation) => reservation.status === "Cancelled"
    ).length;
};

export const getCheckedInReservations = (reservations: Reservation[]): number => {
    return reservations.filter(
        (reservation) => reservation.status === "Checked In"
    ).length;
};

export const getTotalRevenue = (reservations: Reservation[]): number => {
    return reservations.reduce(
        (total, reservation) => total + reservation.totalAmount,
        0
    );
};

export const getTotalPaid = (reservations: Reservation[]): number => {
    return reservations.reduce(
        (total, reservation) => total + reservation.paidAmount,
        0
    );
};

export const getTotalOutstanding = (reservations: Reservation[]): number => {
    return reservations.reduce(
        (total, reservation) =>
            total + (reservation.totalAmount - reservation.paidAmount),
        0
    );
};