import { BedDouble, CircleDollarSign, Clock3, Download, Printer, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useHoldReservationHook } from "../provider/useHoldReservationHook";
import type { Reservation } from "../../XXXallReservation/types";
import type { HoldReservation } from "../../../../../domain/holdReservation";

type ReservationDetailsProps = {
    reservation: HoldReservation;
};

function ActionButton({ icon, children }: { icon: ReactNode; children: ReactNode }) {
    return (
        <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 text-slate-700 transition hover:bg-slate-50"
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}

function DetailRows({ rows }: { rows: Array<[string, string]> }) {
    return (
        <dl className="grid gap-y-1.5">
            {rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(120px,170px)_1fr] gap-3">
                    <dt className="text-slate-700">{label}</dt>
                    <dd className="font-medium text-slate-800">{value}</dd>
                </div>
            ))}
        </dl>
    );
}


export function ReservationDetails({
    reservation,
}: ReservationDetailsProps) {
    const [activeTab, setActiveTab] = useState("Customer Details");

    return (
        <section className="min-w-0 flex-1 bg-white w-full">
            <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 sm:px-6">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <BedDouble className="size-5" strokeWidth={1.7} />
                    <span>{reservation.id}</span>
                    <span className="font-normal text-slate-400">(Hold)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="h-9 rounded-md bg-[#c95959] px-4 font-medium text-white hover:bg-[#b94e4e]">
                        Cancel Hold
                    </button>
                    <ActionButton icon={<Download className="size-4" />}>Export CSV</ActionButton>
                    <ActionButton icon={<Printer className="size-4" />}>Print as PDF</ActionButton>
                </div>
            </header>

            <div className="flex flex-wrap justify-end gap-2 px-4 py-3 sm:px-6">
                <ActionButton icon={<BedDouble className="size-4" />}>Change Room</ActionButton>
                <ActionButton icon={<Download className="size-4" />}>Confirm Booking</ActionButton>
                <ActionButton icon={<CircleDollarSign className="size-4" />}>Take Payments</ActionButton>
            </div>

            <div className="mx-4 rounded-sm bg-[#efefff] px-4 py-3 text-slate-700 sm:mx-6">
                <div className="flex gap-2">
                    <Clock3 className="mt-0.5 size-5 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold">Room Hold Information</p>
                        <p>
                            This Reservation is on hold. The Room is temporarily reserved for the guest without
                            any payment.
                        </p>
                        <div className="mt-2 grid gap-3 border-t border-indigo-100 pt-2 sm:grid-cols-3">
                            <div>
                                <span className="block text-xs">Hold Since</span>
                                {reservation.holdSince}
                            </div>
                            <div>
                                <span className="block text-xs">Hold Expiry</span>
                                {reservation.holdExpiry}
                                <br />
                                {reservation.holdDuration}
                            </div>
                            <div>
                                <span className="block text-xs">Hold Reason</span>
                                {reservation.holdReason}
                            </div>
                        </div>
                    </div>
                    <X className="size-4 shrink-0 text-slate-400" />
                </div>
            </div>

            <div className="mx-4 mt-3 sm:mx-6">
                <div className="rounded-sm bg-white px-3 py-2 shadow-[0_1px_7px_rgba(15,23,42,0.05)]">
                    <DetailRows
                        rows={[
                            ["Reservation Number", reservation.reservationNumber],
                            ["Created On", reservation.createdOn],
                            ["Reservation Status", reservation.status],
                            ["Expected Arrival Time", reservation.expectedArrival],
                        ]}
                    />
                </div>

                <nav className="mt-2 flex overflow-x-auto bg-[#f7f7f7] px-2 pt-2">
                    {["Customer Details", "Room", "Stay"].map((tab) => (
                        <button
                            type="button"
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-t-md px-4 py-1.5 whitespace-nowrap ${activeTab === tab
                                ? "bg-[#82bce8] text-white"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="min-h-95 bg-white px-3 py-2">
                    {activeTab === "Customer Details" && (
                        <div className="grid max-w-180 gap-3">
                            <section>
                                <h2 className="mb-2 font-bold text-slate-900">Guest Information</h2>
                                <DetailRows
                                    rows={[
                                        ["Guest Name", reservation.guest.name],
                                        ["Phone Number", reservation.guest.phone],
                                        ["E-mail", reservation.guest.email],
                                    ]}
                                />
                            </section>
                            <section>
                                <h2 className="mb-2 font-bold text-slate-900">Room Information</h2>
                                <DetailRows
                                    rows={[
                                        ["Room Number", reservation.room.number],
                                        ["Room Type", reservation.room.type],
                                        ["Occupancy", reservation.room.occupancy],
                                    ]}
                                />
                            </section>
                            <section>
                                <h2 className="mb-2 font-bold text-slate-900">Stay Information</h2>
                                <DetailRows
                                    rows={[
                                        ["Arrival Date", reservation.stay.arrivalDate],
                                        ["Departure Date", reservation.stay.departureDate],
                                        ["Number of Stay", reservation.stay.nights],
                                        ["Check In Time", reservation.stay.checkInTime],
                                    ]}
                                />
                            </section>
                        </div>
                    )}
                    {activeTab === "Room" && (
                        <DetailRows
                            rows={[
                                ["Room Number", reservation.room.number],
                                ["Room Type", reservation.room.type],
                                ["Occupancy", reservation.room.occupancy],
                            ]}
                        />
                    )}
                    {activeTab === "Stay" && (
                        <DetailRows
                            rows={[
                                ["Arrival Date", reservation.stay.arrivalDate],
                                ["Departure Date", reservation.stay.departureDate],
                                ["Number of Stay", reservation.stay.nights],
                                ["Check In Time", reservation.stay.checkInTime],
                            ]}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
