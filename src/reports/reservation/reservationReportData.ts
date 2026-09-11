import type { Reservation } from "../../types/reservation";

export interface ReservationReportData {
    property: {
        name: string;
        reportDate: string;
        preparedBy: string;
        location: string;
    };

    summary: {
        totalReservations: number;
        totalGuests: number;
        totalReservationAmount: number;
        totalAdvanceCollection: number;
        totalRemainingAmount: number;
        confirmedReservations: number;
        cancelledReservations: number;
        completedReservations: number;
    };

    payment: {
        totalReservationAmount: number;
        totalAdvanceCollection: number;
        totalRemainingAmount: number;
    };

    details: {
        reservationId: string;
        guestName: string;
        contact: string;
        guestCount: number;
        date: string;
        totalAmount: number;
        advanceAmount: number;
        remainingAmount: number;
        status: Reservation["status"];
    }[];

    status: {
        confirmed: number;
        completed: number;
        cancelled: number;
        pending: number;
    };

    statusAnalysis: {
        status: Reservation["status"];
        count: number;
        percentage: number;
    }[];


    cancellationDetails: {
        reservationId: string;
        guestName: string;
        Date: string;
        GuestNo: string;
        totalAmount: number;
        advance: number;
        reason: string;
        refund: number;
        paymentStatus: Reservation["paymentStatus"];
    }[];

    cancellationAnalysis: {
        reason: string;
        count: number;
        // percentage: number;
    }[];
}

interface BuildReservationReportOptions {
    propertyName?: string;
    reportDate?: string;
    preparedBy?: string;
    location?: string;
}

export const buildReservationReport = (
    reservations: Reservation[],
    options: BuildReservationReportOptions = {}
): ReservationReportData => {


    // Property Information
    const property = {
        name: options.propertyName ?? "VIP Hotel & Resort",

        reportDate:
            options.reportDate ??
            new Date().toLocaleDateString(),

        preparedBy:
            options.preparedBy ??
            "Store Manager",

        location:
            options.location ??
            "28 Kilo, Dhulikhel",
    };


    // Reservation Summary

    const totalReservations =
        reservations.length;

    const totalGuests =
        reservations.reduce(
            (total, reservation) =>
                total +
                reservation.adults +
                reservation.children,
            0
        );

    const totalReservationAmount =
        reservations.reduce(
            (total, reservation) =>
                total + reservation.totalAmount,
            0
        );

    const totalAdvanceCollection =
        reservations.reduce(
            (total, reservation) =>
                total + reservation.paidAmount,
            0
        );

    const totalRemainingAmount =
        totalReservationAmount -
        totalAdvanceCollection;



    // Reservation Status

    const confirmedReservations =
        reservations.filter(
            (reservation) =>
                reservation.status === "Confirmed"
        ).length;

    const cancelledReservations =
        reservations.filter(
            (reservation) =>
                reservation.status === "Cancelled"
        ).length;

    const completedReservations =
        reservations.filter(
            (reservation) =>
                reservation.status === "Checked Out"
        ).length;

    const pendingReservations =
        reservations.filter(
            (reservation) =>
                reservation.status === "Pending"
        ).length;



    //Status Analysis
    const statusAnalysis = [
        {
            status: "Confirmed" as const,
            count: confirmedReservations,
        },
        {
            status: "Checked In" as const,
            count: reservations.filter(
                (reservation) => reservation.status === "Checked In"
            ).length,
        },
        {
            status: "Checked Out" as const,
            count: completedReservations,
        },
        {
            status: "Cancelled" as const,
            count: cancelledReservations,
        },
        {
            status: "Pending" as const,
            count: pendingReservations,
        },
    ].map((item) => ({
        ...item,
        percentage:
            totalReservations === 0
                ? 0
                : Number(
                    ((item.count / totalReservations) * 100).toFixed(2)
                ),
    }));


    //Cancellation Details
    const cancellationDetails = reservations
        .filter((reservation) => reservation.status === "Cancelled")
        .map((reservation) => ({
            reservationId: reservation.reservationId,
            guestName: reservation.guestName,
            Date: reservation.cancelDate ?? "",
            GuestNo: reservation.guestNo,
            totalAmount: reservation.totalAmount,
            advance: reservation.advance,
            refund: reservation.refund,
            reason: reservation.reason,
            paymentStatus: reservation.paymentStatus,
        }));



    // Cancellation Analysis
    const cancellationAnalysis = reservations
        .filter((reservation) => reservation.status === "Cancelled")
        .reduce((acc, reservation) => {
            const existingReason = acc.find(
                (item) => item.reason === reservation.reason
            );

            if (existingReason) {
                existingReason.count += 1;
            } else {
                acc.push({
                    reason: reservation.reason,
                    count: 1,
                });
            }

            return acc;
        }, [] as { reason: string; count: number }[]);



    // Reservation Details

    const details = reservations.map((reservation) => {

        const guestCount = reservation.adults + reservation.children;
        const remainingAmount = reservation.totalAmount - reservation.paidAmount;

        return {
            reservationId: reservation.reservationId,
            guestName: reservation.guestName,
            contact: reservation.contact,
            guestCount,
            date: reservation.checkIn,
            totalAmount: reservation.totalAmount,
            advanceAmount: reservation.paidAmount,
            remainingAmount,
            status: reservation.status,
        };
    }
    );



    // Final Report Object

    return {

        property,

        summary: {
            totalReservations,
            totalGuests,
            totalReservationAmount,
            totalAdvanceCollection,
            totalRemainingAmount,
            confirmedReservations,
            cancelledReservations,
            completedReservations,
        },

        payment: {
            totalReservationAmount,
            totalAdvanceCollection,
            totalRemainingAmount,
        },

        details,

        status: {
            confirmed:
                confirmedReservations,

            completed:
                completedReservations,

            cancelled:
                cancelledReservations,

            pending:
                pendingReservations,
        },

        statusAnalysis,
        cancellationDetails,
        cancellationAnalysis

    };
};