
import { useState } from "react";
import ReservationActionModal from "./ReservationActionModal";
import type { Reservation } from "../../types";

interface Props {
    reservation: Reservation;
    onClose: () => void;
}

export default function ChangeRoomModal({ reservation, onClose }: Props) {
    const [newRoom, setNewRoom] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        console.log({
            currentRoom: reservation.roomCode,
            newRoom,
            reason,
        });
        onClose();
    };

    return (
        <ReservationActionModal
            title="Change Room"
            onClose={onClose}
        >
            <div className="space-y-4">
                <h2>Reservation Detail</h2>
                <div className="shadow-sm rounded-lg bg-gray-50 p-4">
                    <div className=" grid grid-cols-2 gap-4 items-center">
                        <p className="text-xs text-gray-500">Reservation Number</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.roomCode}
                        </p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 items-center">
                        <p className="text-xs text-gray-500">Guest Name</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.guest.name}
                        </p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 items-center">
                        <p className="text-xs text-gray-500">Room No</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.room.number}
                        </p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 items-center">
                        <p className="text-xs text-gray-500">Room Type</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.room.type}
                        </p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 items-center">
                        <p className="text-xs text-gray-500">Arrival Date / Departure Date</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.bookingDate}
                        </p>
                    </div>

                </div>

                <h2>Current Stay</h2>
                <div className="shadow-sm rounded-lg bg-gray-50 p-4 grid grid-cols-4 gap-4 items-center">
                    <div className=" flex flex-col items-center">
                        <p className="text-xs text-gray-500">Room No</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            {reservation.room.number}
                        </p>
                    </div>
                    <div className=" flex flex-col items-center">
                        <p className="text-xs text-gray-500">Check In</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            2083/01/02
                        </p>
                    </div>
                    <div className=" flex flex-col items-center">
                        <p className="text-xs text-gray-500">Check Out</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            2083/01/05
                        </p>
                    </div>
                    <div className=" flex flex-col items-center">
                        <p className="text-xs text-gray-500">Night</p>
                        <p className="mt-1 text-base font-semibold text-gray-800">
                            3
                        </p>
                    </div>
                </div>


                <h2 >New Stay</h2>
                <section className="rounded-[3px] bg-white shadow-[0_3px_4px_rgba(0,0,0,0.2)]">
                    <h3 className="pl-2 text-[11px] font-semibold">Room No</h3>
                    <div className="p-2">
                        <div className="w-30">
                            <select
                                value={newRoom}
                                onChange={(e) => setNewRoom(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            >
                                <option>Room 101</option>
                                <option>Room 102</option>
                                <option>Room 103</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-t border-[#c8c8c8] px-3 py-4 text-[12px]">
                        <span className="block">Available Status</span>
                        <span className="mt-1 text-[11px] block text-[#5faa5f]">
                            Room 103 is available for the selected dates
                        </span>
                    </div>
                </section>
                <div>
                    <h2>Reason For change</h2>
                    <select
                        value={newRoom}
                        onChange={(e) => setNewRoom(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option value="">select Reason</option>
                        <option>Guest Request</option>
                        <option>Maintenance</option>
                        <option>Room Upgrade</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Description / Remark
                    </label>
                    <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter description or remark..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        disabled={!newRoom || newRoom === reservation.roomCode}
                        onClick={handleSubmit}
                        className="rounded-lg bg-[#ff6108] px-4 py-2 text-sm font-medium text-white hover:bg-[#e05500]  disabled:opacity-50"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </ReservationActionModal>
    );
}
