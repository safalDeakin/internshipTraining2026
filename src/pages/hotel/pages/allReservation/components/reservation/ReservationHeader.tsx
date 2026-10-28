import { Bed, Download, Printer, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useReservationState } from "../../../../hooks/allReservation/useReservationState";
import type { Reservation } from "../../types";
import { mapReservationToPrintData } from "../../utils/mapReservationToPrintData";
import PrintReservationForm from "../PrintReservationForm";
import FinalReceipts from "../../../../../recepits/FinalReceipts";

export default function ReservationHeader() {

    const [reservationToPrint, setReservationToPrint] =
        useState<Reservation | null>(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const { selectedReservation: r } = useReservationState();

    const isCancelled = r.reservationStatus === 'Cancelled';

    return (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white shrink-0 h-20">
            <div className="flex items-center gap-2">
                <Bed size={16} className="text-blue-600" />
                <span className="text-xl font-semibold text-gray-800">{r.roomCode}</span>
                <span className="text-xs text-gray-400">()</span>
                <span className={`w-2 h-2 rounded-full ${isCancelled ? 'bg-red-400' : 'bg-green-400'}`} />
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        console.log("Request Room Service clicked");
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                >
                    Request Room Service
                </button>

                {/* Invoice Button */}
                <button
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                    onClick={() => setShowReceipt(true)}
                >
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

                <button
                    onClick={() => {
                        console.log("Change Room clicked");
                    }}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                >
                    Change Room <ChevronDown size={12} />
                </button>
                <button
                    onClick={() => {
                        console.log("Cancel Reservation clicked");
                    }}
                    disabled={isCancelled}
                    className={`px-3 py-2 text-xs font-medium rounded transition-colors ${isCancelled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                >
                    Cancel Reservation
                </button>
                <div className="h-5 w-px bg-gray-200" />
                <button
                    onClick={() => {
                        console.log("Export CSV clicked");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded transition-colors"
                >
                    <Download size={13} /> Export CSV
                </button>
                <button
                    onClick={() => {
                        setReservationToPrint(r);
                        window.open(`/reservation/${r.id}`, "_blank");
                    }}
                    className="flex items-center gap-1.5 rounded border border-gray-200 px-2.5 py-2 text-xs text-gray-600 transition-colors hover:border-blue-300 hover:text-blue-600"
                >
                    <Printer size={13} />
                    Print Reservation Form
                </button>
                <button
                    onClick={() => {
                        console.log("Export PDF clicked");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded transition-colors"
                >
                    <Printer size={13} /> Print as PDF
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
