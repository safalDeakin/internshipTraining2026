import { Bed, Download, Printer, ChevronDown } from 'lucide-react';
import { useReservationState } from '../../hooks/useReservationState';

export default function ReservationHeader() {
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
                        console.log("Export PDF clicked");
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded transition-colors"
                >
                    <Printer size={13} /> Print as PDF
                </button>
            </div>
        </div>
    );
}
