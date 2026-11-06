
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ReservationActionModal from "./ReservationActionModal";

interface Props {
    reservationNumber: string;
    onClose: () => void;
}

export default function CancelReservationModal({
    reservationNumber,
    onClose,
}: Props) {
    const [reason, setReason] = useState("");
    const [note, setNote] = useState("");

    const handleCancel = () => {
        console.log({
            reservationNumber,
            reason,
        });
        onClose();
    };

    return (
        <ReservationActionModal
            title="Cancel Reservation"
            onClose={onClose}
        >
            <div className="mb-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
                <AlertTriangle className="shrink-0 text-red-500" size={20} />
                <div>
                    <p className="text-sm font-semibold text-red-700">
                        Are you sure you want to cancel?
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                        This action will cancel the reservation.
                    </p>
                </div>
            </div>

            <div className="mb-4 rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Reservation Number</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                    {reservationNumber}
                </p>
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Cancellation Date
                </label>
                <input
                    type="text"
                    value={new Date().toLocaleString()}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Cancelled By
                </label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                >
                    <option value="">Ram Shrestha</option>
                    <option value="Guest Request">Front Desk</option>
                    <option value="Duplicate Booking">Management</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Cancellation Reason
                </label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-400"
                >
                    <option value="">Select reason</option>
                    <option value="Guest Request">Guest Request</option>
                    <option value="Duplicate Booking">Duplicate Booking</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Room Unavailable">Room Unavailable</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Description / Remark
                </label>
                <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="ENTER"
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
            </div>

            <h2>Cancellation Policy</h2>
            <div className="mb-4 grid grid-cols-2 gap-4 items-center">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Cancellation Charge
                </label>
                <input
                    type="text"
                    value={"NRP 0.00"}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4 items-center">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Refund Amount
                </label>
                <input
                    type="text"
                    value={"NRP 0.00"}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4 items-center">
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Refund Method
                </label>
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                    <option value="">Original Payment Method</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>

                </select>
            </div>


            <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button
                    onClick={onClose}
                    className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    disabled={!reason}
                    onClick={handleCancel}
                    className="rounded-lg bg-[#ff6108] px-4 py-2 text-sm font-medium text-white hover:bg-[#e05500]"
                >
                    Confirm
                </button>
            </div>
        </ReservationActionModal>
    );
}
