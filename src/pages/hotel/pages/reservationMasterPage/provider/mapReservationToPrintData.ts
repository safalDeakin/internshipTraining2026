import type { ReservationDetailModel, PrintReservationFormData } from "../model/ReservationModel";

export function mapReservationToPrintData(
    reservation: ReservationDetailModel
): PrintReservationFormData {
    const [arrivalDate = "", departureDate = ""] =
        reservation.info.bookingDate.split(" - ");

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
        reservationNumber: reservation.info.reservationCode,

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
        noOfAdult: reservation.info.adults,
        noOfChildren: reservation.info.kids,

        ratePlan: reservation.info.ratePlan,
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