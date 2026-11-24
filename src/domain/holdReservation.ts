export type HoldItem = {
    id: string;
    guestName: string;
    roomCode: string;
    time: string;
};

export type HoldReservation = {
    id: string;
    reservationNumber: string;
    createdOn: string;
    status: string;
    expectedArrival: string;
    holdSince: string;
    holdExpiry: string;
    holdDuration: string;
    holdReason: string;
    guest: { name: string; phone: string; email: string };
    room: { number: string; type: string; occupancy: string };
    stay: { arrivalDate: string; departureDate: string; nights: string; checkInTime: string };
};

export type ReservationRecord = {
    id: string;
    hold: HoldItem;
    reservation: HoldReservation;
};