
import { Edit, Download, Printer, X, Bed } from "lucide-react";
import { useState } from "react";
import type { Reservation } from "../../allReservation/types";
import FinalReceipts from "../../../../recepits/FinalReceipts";
import { useReservationState } from "../../../hooks/allReservation/useReservationState";
import PrintReservationForm from "../../allReservation/components/PrintReservationForm";
import { mapReservationToPrintData } from "../../allReservation/utils/mapReservationToPrintData";
import type { ReservationDetailModel } from "../model/ReservationModel";

type ReservationToolbarProps = {
    status: string
    reservationCode: string,
    reservationId: string,
    roomNumber: string,
    data: ReservationDetailModel,
};


export default function ReservationToolbar({
    status,
    reservationCode,
    reservationId,
    roomNumber,
    data
}: ReservationToolbarProps) {

    const [reservationToPrint, setReservationToPrint] =
        useState<Reservation | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const { selectedReservation: r } = useReservationState();
    const selectedReservation = data
    const isCancelled = status === 'Cancelled';


    return (< div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-gray-50 px-4 py-3" >
        <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-blue-600" />
            <span className="text-base font-semibold text-gray-800">{reservationCode}</span>
            <span className="text-sm text-gray-500">({reservationId})</span>

            {/* <span
                className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${product.status === "Active" ? "bg-teal-600" : "bg-gray-400"
                    }`}
            >
                {product.status}
            </span> */}
            <span className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-400' : 'bg-green-400'}`} />
        </div>

        <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Request Room Service clicked");
                }}
            >
                <Edit className="h-3.5 w-3.5" />
                Room Service
            </button>

            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => setShowReceipt(true)}
            >
                <Edit className="h-3.5 w-3.5" />
                Invoice
            </button>
            {/* FinalReceipts Popup */}
            {showReceipt && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-overlay-in"
                    onClick={() => setShowReceipt(false)}
                >
                    {/* Popup Container */}
                    <div
                        className="relative w-full max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl animate-modal-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowReceipt(false)}
                            className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:bg-gray-100 hover:text-gray-900"
                            aria-label="Close invoice"
                        >
                            <X size={18} />
                        </button>

                        {/* Your Component */}
                        <FinalReceipts />
                    </div>
                </div>
            )}
            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Change Room clicked");
                }}
            >
                <Edit className="h-3.5 w-3.5" />
                Swap Room
            </button>

            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Cancel Reservation clicked");
                }}
            >
                <Download size={13} /> Export
            </button>

            <button className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    setReservationToPrint(selectedReservation);
                    window.open(`/reservation/${r.id}`, "_blank");
                }}
            >
                <Printer size={13} />
                Print
            </button>
            <button
                disabled={isCancelled}
                className="flex items-center gap-1.5 rounded bg-red-400 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
                onClick={() => {
                    console.log("Cancel Reservation clicked");
                }}
            >
                <Edit className="h-3.5 w-3.5" />
                Cancel
            </button>
        </div>
        {reservationToPrint && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-100 p-6">
                <PrintReservationForm
                    data={mapReservationToPrintData(reservationToPrint)}
                    onClose={() => setReservationToPrint(null)}
                />
            </div>
        )}

    </div>
    );
}
