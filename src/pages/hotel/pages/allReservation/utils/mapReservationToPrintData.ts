import type { Reservation, PrintReservationFormData } from "../types";

export function mapReservationToPrintData(
    reservation: Reservation
): PrintReservationFormData {
    const [arrivalDate = "", departureDate = ""] =
        reservation.bookingDate.split(" - ");

    const combinedId = reservation.guest.idType;
    const separatorIndex = combinedId.indexOf("-");

    const idType = reservation.guest.idNumber
        ? combinedId
        : separatorIndex !== -1
            ? combinedId.slice(0, separatorIndex).trim()
            : combinedId;

    const idNumber =
        reservation.guest.idNumber ??
        (separatorIndex !== -1
            ? combinedId.slice(separatorIndex + 1).trim()
            : "");

    const nights = reservation.payment.nights;

    return {
        date: new Date().toLocaleDateString("en-GB"),
        reservationNo: reservation.reservationNumber,

        title: reservation.guest.title ?? "",
        fullName: reservation.guest.name,
        phoneNumber: reservation.guest.phone,
        address: reservation.guest.address ?? "",
        nationality: reservation.guest.nationality,
        emailAddress: reservation.guest.email,
        idType,
        idNumber,

        arrivalDate,
        departureDate,
        noOfNight: nights,
        noOfAdult: reservation.adults,
        noOfChildren: reservation.children,

        ratePlan: reservation.ratePlan,
        ratePerRoom: nights > 0
            ? reservation.payment.roomCharge / nights
            : 0,
        currency: "NPR",
        totalEstimateAmount: reservation.payment.totalAmount,

        paymentGuarantee: reservation.payment.paymentMethod ?? "",
        agreementName: reservation.guest.name,
        signature: "",
    };
}