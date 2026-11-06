
import { createContext } from "react";
import type { FolioItem, GuestInfo, PaymentSummary, PrintReservationFormData, ReservationInfo, RoomInfo } from "../../model/ReservationModel";
import type { InvoiceData } from "../../../../../recepits/types/receipts";
export type ReservationDetailContextType = {
    id: string,
    info: ReservationInfo,
    checkInTime: string,
    guest: GuestInfo,
    room: RoomInfo,
    payment: PaymentSummary,
    notes: string,
    folioItems: FolioItem[]
    getInvoice: () => InvoiceData
    getReservationPdfForm: () => PrintReservationFormData
    addCharge: (desc: string, amount: number) => void
    addNotes: (id: string, data: string) => void
};

export const ReservationDetailContext =
    createContext<ReservationDetailContextType | null>(null);