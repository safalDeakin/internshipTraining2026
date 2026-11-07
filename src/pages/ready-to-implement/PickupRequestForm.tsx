import {
    CalendarDays,
    ChevronDown,
    Clock3,
} from "lucide-react";

const PickupRequestForm = () => {
    return (
        <div className="w-full max-w-md bg-white px-8 py-6 text-[12px] text-gray-800">
            {/* Reservation Detail */}
            <div>
                <h2 className="mb-3 text-[12px] font-bold">
                    Reservation Detail
                </h2>

                <div className="rounded-sm border border-gray-100 bg-white px-2 py-2 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                    <div className="grid grid-cols-[140px_1fr] gap-y-1">
                        <span>Reservation Number</span>
                        <span>RV-#1221</span>

                        <span>Guest Name</span>
                        <span>John Smith</span>

                        <span>Room No</span>
                        <span>101</span>

                        <span>Room Type</span>
                        <span>Deluxe Room</span>

                        <span>Service Name</span>
                        <span>Pick up</span>

                        <span>Requested For</span>
                        <span>2083/01/03</span>
                    </div>
                </div>
            </div>

            {/* Trip Type */}
            <div className="mt-6">
                <label className="mb-1.5 block font-bold">
                    Trip Type
                </label>

                <div className="relative">
                    <select className="h-7.5 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 text-[11px] outline-none focus:border-gray-400">
                        <option>select</option>
                        <option>Airport Pickup</option>
                        <option>Airport Drop Off</option>
                        <option>Hotel Transfer</option>
                    </select>

                    <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600"
                    />
                </div>
            </div>

            {/* Pickup Details */}
            <div className="mt-5 rounded-sm border border-gray-100 bg-white px-2 py-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                <div className="grid grid-cols-[1fr_1fr_42px] gap-5">
                    {/* Pickup Date */}
                    <div>
                        <label className="mb-1.5 block text-gray-400">
                            Pick Up Date
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                defaultValue="2083/01/02"
                                className="h-7.5 w-full rounded-md border border-gray-300 px-2 pr-8 text-[11px] outline-none focus:border-gray-400"
                            />

                            <CalendarDays
                                size={13}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Pickup Time */}
                    <div>
                        <label className="mb-1.5 block text-gray-400">
                            Pick Up Time
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                defaultValue="13:00 PM"
                                className="h-7.5 w-full rounded-md border border-gray-300 px-2 pr-8 text-[11px] outline-none focus:border-gray-400"
                            />

                            <Clock3
                                size={13}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Night */}
                    <div>
                        <label className="mb-1.5 block text-gray-400">
                            Night
                        </label>

                        <div className="h-7.5 pt-2 text-[11px]">
                            2
                        </div>
                    </div>
                </div>

                {/* Locations */}
                <div className="mt-4 grid grid-cols-2 gap-5">
                    <div>
                        <label className="mb-1 block font-medium">
                            Pick Up Location
                        </label>

                        <span className="text-[10px]">
                            Tribhuvan Airport
                        </span>
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Drop Off
                        </label>

                        <span className="text-[10px]">
                            Hotel
                        </span>
                    </div>
                </div>
            </div>

            {/* Travel Details */}
            <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-3">
                {/* Travel Type */}
                <div>
                    <label className="mb-1.5 block font-bold">
                        Travel Type
                    </label>

                    <input
                        type="text"
                        defaultValue="#121222"
                        className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-[10px] outline-none focus:border-gray-400"
                    />
                </div>

                {/* Flight No */}
                <div>
                    <label className="mb-1.5 block font-bold">
                        Flight No
                    </label>

                    <input
                        type="text"
                        defaultValue="Extra Towel & Linen"
                        className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-[10px] outline-none focus:border-gray-400"
                    />
                </div>

                {/* Arrival Date */}
                <div>
                    <label className="mb-1.5 block font-bold">
                        Arrival Date
                    </label>

                    <input
                        type="text"
                        defaultValue="Room service"
                        className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-[10px] outline-none focus:border-gray-400"
                    />
                </div>

                {/* Arrival Time */}
                <div>
                    <label className="mb-1.5 block font-bold">
                        Arrival Time
                    </label>

                    <div className="relative">
                        <select className="h-6.25 w-full appearance-none rounded-md border border-gray-300 bg-white px-2 text-[10px] outline-none focus:border-gray-400">
                            <option>One Time</option>
                            <option>Two Times</option>
                            <option>Recurring</option>
                        </select>

                        <ChevronDown
                            size={12}
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>
            </div>

            {/* Driver Handling */}
            <div className="mt-4">
                <h3 className="mb-2 font-bold">
                    Driver Handling
                </h3>

                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                    <div>
                        <label className="mb-1.5 block font-bold">
                            Driver
                        </label>

                        <input
                            type="text"
                            defaultValue="#121222"
                            className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-[10px] outline-none focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block font-bold">
                            Contact
                        </label>

                        <input
                            type="text"
                            defaultValue="Extra Towel & Linen"
                            className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-[10px] outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Special Instruction */}
            <div className="mt-4">
                <label className="mb-1.5 block font-bold">
                    Special Instruction
                </label>

                <input
                    type="text"
                    defaultValue="Please Bring ..."
                    className="h-6.25 w-full rounded-md border border-gray-300 px-2 text-center text-[10px] outline-none focus:border-gray-400"
                />
            </div>

            {/* Submit */}
            <div className="mt-4 flex justify-center">
                <button
                    type="button"
                    className="flex h-6.75 items-center gap-1.5 rounded-md bg-[#ff6b00] px-6 text-[11px] font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition hover:bg-[#e96000]"
                >
                    Send Request
                </button>
            </div>
        </div>
    );
};

export default PickupRequestForm;