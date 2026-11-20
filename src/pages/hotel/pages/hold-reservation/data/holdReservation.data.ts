import type { ReservationRecord } from "../../../../../domain/holdReservation";

export const HoldReservationRecords: ReservationRecord[] = [
    {
        hold: { id: "1", guestName: "Prabin", roomCode: "R01-12344", time: "6:00 PM" },
        reservation: {
            id: "R101-#RV12340",
            reservationNumber: "RV-#1218",
            createdOn: "14th Nov 2026",
            status: "Hold",
            expectedArrival: "6:00 PM",
            holdSince: "14th Nov 2026",
            holdExpiry: "16th Nov 2026, 6:00 PM",
            holdDuration: "(48 Hours)",
            holdReason: "Awaiting confirmation",
            guest: {
                name: "Prabin Maharjan",
                phone: "9801234567",
                email: "prabin.maharjan@gmail.com",
            },
            room: { number: "204", type: "Executive Room", occupancy: "2 Adults" },
            stay: {
                arrivalDate: "2083/01/02",
                departureDate: "2083/01/05",
                nights: "3 Nights",
                checkInTime: "6:00 PM",
            },
        },
    },
    {
        hold: { id: "2", guestName: "Disha", roomCode: "R01-12344", time: "5:00 PM" },
        reservation: {
            id: "R101-#RV12344",
            reservationNumber: "RV-#1221",
            createdOn: "15th Nov 2026",
            status: "Hold",
            expectedArrival: "5:00 PM",
            holdSince: "15th Nov 2026",
            holdExpiry: "17th Nov 2026, 3:52 PM",
            holdDuration: "(48 Hours)",
            holdReason: "Customer Request",
            guest: {
                name: "Disha Shrestha",
                phone: "98989898989",
                email: "dishashrestha@gmail.com",
            },
            room: { number: "301", type: "Deluxe Room", occupancy: "2 Adults, 0 Children" },
            stay: {
                arrivalDate: "2083/01/01",
                departureDate: "2083/01/03",
                nights: "2 Nights",
                checkInTime: "5:00 PM",
            },
        },
    },
];
