
import { useState } from "react";
import ReservationActionModal from "./ReservationActionModal";
import type { Reservation } from "../../types";

interface Props {
    reservation: Reservation;
    onClose: () => void;
}

export default function RegisterServiceModal({ reservation, onClose }: Props) {
    const [newRoom, setNewRoom] = useState("");
    const [reason, setReason] = useState("");

    const [value, setValue] = useState("");

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
            title="Register Service"
            onClose={onClose}
        >
            <div className="space-y-4">
                <div>

                    <h2>Basic Information</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className=" flex flex-col">
                            <h2>Service Code Number</h2>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className=" flex flex-col">
                            <h2>Service Name</h2>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className=" flex flex-col">
                            <h2>Category</h2>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className=" flex flex-col">
                            <h2>Service type</h2>
                            <select
                                value={"Select"}
                                onChange={(e) => setNewRoom(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            >
                                <option>Free</option>
                                <option>Paid</option>

                            </select>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-1.5 block">
                            Description
                        </h2>
                        <textarea
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter description ..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="w-45">
                        <h2 className="mb-1.5 block">
                            Available For
                        </h2>
                        <input
                            value={"Rooms"}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter description ..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            

                <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        disabled={!newRoom || newRoom === reservation.roomCode}
                        onClick={handleSubmit}
                        className="rounded-lg bg-[#ff6108] px-4 py-2 text-sm font-medium text-white hover:bg-[#e05500]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </ReservationActionModal>
    );
}
