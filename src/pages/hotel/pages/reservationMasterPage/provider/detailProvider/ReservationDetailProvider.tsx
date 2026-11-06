import { type ReactNode } from "react";
import {
    reservationsDetails,
    invoice,
} from "../data/ReservationData";
import { ReservationDetailContext } from "./ReservationDetailContext";
import type { ReservationDetailModel, FolioItem } from "../../model/ReservationModel";
import { mapReservationToPrintData } from "../mapReservationToPrintData";

type ReservationDetailProviderProps = {
    id: string
    children: ReactNode;
};

export default function ReservationDetailProvider({ id, children }: ReservationDetailProviderProps) {

    const reservationDetail: ReservationDetailModel = reservationsDetails.filter((item) =>
        item.info.reservationCode.toLowerCase().includes(id.toLowerCase())
    )[0]
    console.log("Here is th log")
    console.log(reservationDetail)

    const getInvoice = () => {
        return invoice;
    }
    const getReservationPdfForm = () => {
        return mapReservationToPrintData(reservationDetail);
    }

    const addCharge = (desc: string, amount: number) => {
        if (desc && amount && !isNaN(Number(amount))) {
            const i: FolioItem = {
                id: `f-${Date.now()}`,
                date: new Date().toLocaleDateString(),
                description: desc, charge: amount, credit: 0,
            };
            reservationDetail.folioItems.push(i)
        }
    }

    const addNotes = (id: string, val: string) => {
        reservationDetail.notes = val;
    }

    return (
        <ReservationDetailContext.Provider value={{
            id: reservationDetail.id,
            info: reservationDetail.info,
            checkInTime: reservationDetail.checkInTime,
            guest: reservationDetail.guest,
            room: reservationDetail.room,
            payment: reservationDetail.payment,
            notes: reservationDetail.notes,
            folioItems: reservationDetail.folioItems,
            getInvoice: getInvoice,
            getReservationPdfForm: getReservationPdfForm,
            addCharge,
            addNotes
        }}>
            {children}
        </ReservationDetailContext.Provider>
    )

}