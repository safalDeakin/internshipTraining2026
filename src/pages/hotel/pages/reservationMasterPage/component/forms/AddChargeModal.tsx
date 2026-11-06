
import { useState } from "react";
import ReservationActionModal from "./ReservationActionModal";

interface Props {
    onClose: () => void;
}

export default function AddChargeModal({ onClose }: Props) {
    const [service, setService] = useState("Food & Beverage");
    const [quantity, setQuantity] = useState("1");
    const [price, setPrice] = useState("250");
    const [chargeTo, setChargeTo] = useState("Folio");
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
            title="Add Charge"
            onClose={onClose}
        >
            <div className="space-y-4">
                <div>
                    <h2>Charge Detail</h2>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Charge
                    </label>
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                        <option>Select</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Facility Details
                        </label>
                        <input
                            type="text"
                            value={"Enter Facility"}
                            onChange={
                                (e) => (e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Service Type
                        </label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option>Select</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Date
                        </label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Time (From)
                        </label>
                        <input
                            type="text"
                            value={"Enter"}
                            onChange={
                                (e) => (e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Time (To)
                        </label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Duration
                        </label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Quantity / No. of Guest
                        </label>
                        <input
                            type="number"
                            value={2}
                            onChange={
                                (e) => (e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Rate (Per Person)
                        </label>
                        <input type="text" value={"NRP 1000"} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            Total Amount
                        </label>
                        <input type="text" value={"NRP 2000"} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                </div>
                <div>
                    <label className="mb-2 block text-xs font-medium text-gray-600">
                        Charge To
                    </label>

                    <div className="flex items-center gap-5">

                        {["Folio", "Pay now", "No Charge"].map((option) => (
                            <label
                                key={option}
                                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                            >
                                <input
                                    type="radio"
                                    name="chargeTo"
                                    value={option}
                                    checked={chargeTo === option}
                                    onChange={(e) => setChargeTo(e.target.value)}
                                    className="h-4 w-4 accent-blue-600"
                                />

                                {option}
                            </label>
                        ))}

                    </div>
                </div>




                <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                        Note
                    </label>
                    <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="ENTER"
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
                        Add
                    </button>
                </div>
            </div>
        </ReservationActionModal>
    );
}
