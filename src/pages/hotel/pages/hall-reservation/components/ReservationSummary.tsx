import {
    ArrowLeft,
    Banknote,
    CalendarDays,
    Coffee,
    FileOutput,
    Landmark,
    ReceiptText,
    XCircle,
} from "lucide-react";
import type { HallReservation } from "../../../../../domain/hallReservation";

interface ReservationSummaryProps {
    hallData: HallReservation
}


const actions = [
    [Coffee, "Food & Beverage"],
    [CalendarDays, "Event Services"],
    [XCircle, "Cancel Reservation"],
    [Landmark, "Change Hall"],
    [Banknote, "Take Payments"],
    [ReceiptText, "Advance Payment"],
    [FileOutput, "Generate Invoice/Checkout"],
] as const;

export function ReservationSummary({ hallData }: ReservationSummaryProps) {

    return (
        <section className="border border-slate-300 bg-white">
            <div className="border-b border-slate-200 px-5 py-2.5 font-medium text-slate-700 flex items-center gap-2">
                <ArrowLeft size={14} />
                Reservation-{hallData.id}
            </div>

            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 px-5 py-2">
                {actions.map(([Icon, label]) => (
                    <button
                        className="flex min-w-max items-center gap-1.5 rounded-sm border border-slate-300 bg-white px-2.5 py-1.5 text-slate-600 hover:bg-slate-50"
                        key={label}
                    >
                        <Icon size={12} />
                        {label}
                    </button>
                ))}
            </div>

            <div className="grid gap-x-16 gap-y-2 bg-rose-50 px-5 py-3 md:grid-cols-2">
                <dl className="grid grid-cols-2 gap-y-1">
                    <dt>Reservation Number:</dt>
                    <dd className="font-medium">{hallData.id}</dd>
                    <dt>Booking Date:</dt>
                    <dd>2083/01/01 - 2083/01/03</dd>
                    <dt>Reservation Status:</dt>
                    <dd>Walk In</dd>
                    <dt>Source:</dt>
                    <dd>Walk In</dd>
                    <dt>Event Type:</dt>
                    <dd>Wedding</dd>
                    <dt>Rate Plan/Package:</dt>
                    <dd>2</dd>
                </dl>
                <dl className="grid grid-cols-2 gap-y-1">
                    <dt>Event Date:</dt>
                    <dd>2083/01/01</dd>
                    <dt>Event Time:</dt>
                    <dd>11:00 AM To 6:00 PM</dd>
                    <dt>Expected Pax:</dt>
                    <dd>200 Pax</dd>
                    <dt>Event Organizer:</dt>
                    <dd>Dibash Shrestha</dd>
                    <dt>Contact Number:</dt>
                    <dd>989898</dd>
                </dl>
            </div>

        </section>
    );
}
