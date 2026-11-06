
import { useState } from "react";
import ReservationActionModal from "./ReservationActionModal";

interface Props {
    onClose: () => void;
}

export default function RequestRoomService({ onClose }: Props) {
    const [service, setService] = useState("Food & Beverage");
    const [quantity, setQuantity] = useState("1");
    const [price, setPrice] = useState("250");
    const [note, setNote] = useState("");

    const handleSubmit = () => {
        console.log({
            service,
            quantity,
            price,
            note,
        });
        onClose();
    };

    return (
        <ReservationActionModal
            title="Request Room Service"
            onClose={onClose}
        >
            <div className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Service Type
                    </label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option>Food & Beverage</option>
                        <option>Extra Towels</option>
                        <option>Housekeeping</option>
                        <option>Laundry</option>
                        <option>Room Amenities</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Price
                        </label>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <h2>Requested Information</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Requested Date
                        </label>
                        <input
                            type="text"
                            value={new Date().toLocaleString()}
                            readOnly
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Requested Time
                        </label>
                        <input
                            type="text"
                            value={new Date().toLocaleString()}
                            readOnly
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-100"
                        />
                    </div>
                </div>


                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Service Location
                    </label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option>Room 101</option>
                        <option>Room 102</option>
                        <option>Room 103</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Special Instruction
                    </label>
                    <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Please Bring ..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!quantity || Number(quantity) < 1}
                        className="rounded-lg bg-[#ff6108] px-4 py-2 text-sm font-medium text-white hover:bg-[#e05500] disabled:opacity-50"
                    >
                        Send Request
                    </button>
                </div>
            </div>
        </ReservationActionModal>
    );
}
