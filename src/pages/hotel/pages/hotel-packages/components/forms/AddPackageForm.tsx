import { useState } from "react";
import {
    Check,
    ChevronDown,
    Image as ImageIcon,
    X,
} from "lucide-react";

type Benefit = {
    id: number;
    name: string;
    included: boolean;
};


const roomTypeOptions = [
    "Deluxe Room",
    "Suite Room",
    "Standard Room",
    "Executive Room",
];

const ratePlanOptions = [
    "Breakfast Included Rate",
    "Room Only Rate",
    "Half Board Rate",
    "Full Board Rate",
];

const initialBenefits: Benefit[] = [
    {
        id: 1,
        name: "Breakfast For Two",
        included: true,
    },
    {
        id: 2,
        name: "Welcome Drink On Arrival",
        included: true,
    },
    {
        id: 3,
        name: "Airport Pickup",
        included: false,
    },
    {
        id: 4,
        name: "Special Room Decoration",
        included: false,
    },
    {
        id: 5,
        name: "Late Checkout",
        included: true,
    },
];

export default function AddPackageForm() {
    const [packageType, setPackageType] = useState("");
    const [packageName, setPackageName] = useState("");
    const [packageCode, setPackageCode] = useState("");
    const [description, setDescription] = useState("");

    const [roomTypes, setRoomTypes] = useState<string[]>([
        "Deluxe Room",
        "Suite Room",
    ]);

    const [ratePlan, setRatePlan] = useState(
        "Breakfast Included Rate"
    );

    const [benefits, setBenefits] =
        useState<Benefit[]>(initialBenefits);

    const [roomDropdownOpen, setRoomDropdownOpen] =
        useState(false);

    const [rateDropdownOpen, setRateDropdownOpen] =
        useState(false);

    // if (!isOpen) return null;

    const toggleRoomType = (room: string) => {
        setRoomTypes((current) =>
            current.includes(room)
                ? current.filter((item) => item !== room)
                : [...current, room]
        );
    };

    const toggleBenefit = (id: number) => {
        setBenefits((current) =>
            current.map((benefit) =>
                benefit.id === id
                    ? {
                        ...benefit,
                        included: !benefit.included,
                    }
                    : benefit
            )
        );
    };

    const handleSubmit = () => {
        // onSubmit?.({
        //     packageType,
        //     packageName,
        //     packageCode,
        //     description,
        //     roomTypes,
        //     ratePlan,
        //     benefits,
        // });
    };

    return (

        <div className="w-full">

            {/* Content */}
            <div className="overflow-y-auto p-6">
                {/* ================= PACKAGE INFORMATION ================= */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                    {/* Left */}
                    <div className="rounded-md border border-gray-200">
                        <div className="border-b border-gray-200 px-4 py-3">
                            <h3 className="text-sm font-bold text-gray-800">
                                Package Information
                            </h3>
                        </div>

                        <div className="space-y-4 p-4">
                            {/* Package Type */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                    Package Type
                                </label>

                                <input
                                    value={packageType}
                                    onChange={(e) =>
                                        setPackageType(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter"
                                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#0066b3] focus:ring-1 focus:ring-[#0066b3]"
                                />
                            </div>

                            {/* Name + Code */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                        Package Name
                                    </label>

                                    <input
                                        value={packageName}
                                        onChange={(e) =>
                                            setPackageName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#0066b3] focus:ring-1 focus:ring-[#0066b3]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                        Package Code
                                    </label>

                                    <input
                                        value={packageCode}
                                        onChange={(e) =>
                                            setPackageCode(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none transition focus:border-[#0066b3] focus:ring-1 focus:ring-[#0066b3]"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    placeholder="ENTER"
                                    rows={3}
                                    className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm uppercase outline-none transition focus:border-[#0066b3] focus:ring-1 focus:ring-[#0066b3]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= PREVIEW ================= */}

                    <div className="overflow-hidden rounded-md border border-gray-200 shadow-sm">
                        <div className="h-32 w-full bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
                                alt="Package"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-3">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-sm font-bold text-gray-800">
                                    {packageName ||
                                        "Couple Package"}
                                </h3>

                                <span className="whitespace-nowrap text-sm font-bold text-gray-800">
                                    NPR 14,000 / 2 Nights
                                </span>
                            </div>

                            <div className="mt-2 space-y-1 text-xs text-gray-600">
                                <p>
                                    {roomTypes.length > 0
                                        ? roomTypes.join(", ")
                                        : "Deluxe Room"}
                                </p>

                                <p>
                                    Breakfast For Two
                                </p>

                                <p>
                                    Welcome Drink
                                </p>

                                <p>
                                    Free Cancellation Up to 24 Hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= DIVIDER ================= */}

                <div className="my-5 border-t border-gray-200" />

                {/* ================= ROOM & RATE PLAN ================= */}

                <section>
                    <h3 className="mb-4 text-sm font-bold text-gray-800">
                        Select Room & Rate Plan
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Room Type */}
                        <div className="relative">
                            <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                Room Type{" "}
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() =>
                                    setRoomDropdownOpen(
                                        (prev) => !prev
                                    )
                                }
                                className="flex min-h-11 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 text-left"
                            >
                                <div className="flex flex-wrap gap-1.5">
                                    {roomTypes.length === 0 ? (
                                        <span className="text-sm text-gray-400">
                                            Select room type
                                        </span>
                                    ) : (
                                        roomTypes.map(
                                            (room) => (
                                                <span
                                                    key={room}
                                                    className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-[#0066b3]"
                                                >
                                                    {room}

                                                    <X
                                                        size={
                                                            12
                                                        }
                                                        onClick={(
                                                            e
                                                        ) => {
                                                            e.stopPropagation();
                                                            toggleRoomType(
                                                                room
                                                            );
                                                        }}
                                                    />
                                                </span>
                                            )
                                        )
                                    )}
                                </div>

                                <ChevronDown
                                    size={18}
                                    className="shrink-0 text-gray-500"
                                />
                            </button>

                            {roomDropdownOpen && (
                                <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                                    {roomTypeOptions.map(
                                        (room) => {
                                            const selected =
                                                roomTypes.includes(
                                                    room
                                                );

                                            return (
                                                <button
                                                    key={room}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleRoomType(
                                                            room
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm hover:bg-gray-50"
                                                >
                                                    {room}

                                                    {selected && (
                                                        <Check
                                                            size={
                                                                16
                                                            }
                                                            className="text-[#0066b3]"
                                                        />
                                                    )}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Rate Plan */}
                        <div className="relative">
                            <label className="mb-1.5 block text-xs font-medium text-gray-700">
                                Base Rate Plan{" "}
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <button
                                type="button"
                                onClick={() =>
                                    setRateDropdownOpen(
                                        (prev) => !prev
                                    )
                                }
                                className="flex h-11 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm"
                            >
                                <span>{ratePlan}</span>

                                <ChevronDown
                                    size={18}
                                    className="text-gray-500"
                                />
                            </button>

                            {rateDropdownOpen && (
                                <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                                    {ratePlanOptions.map(
                                        (plan) => (
                                            <button
                                                key={plan}
                                                type="button"
                                                onClick={() => {
                                                    setRatePlan(
                                                        plan
                                                    );
                                                    setRateDropdownOpen(
                                                        false
                                                    );
                                                }}
                                                className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-50"
                                            >
                                                {plan}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ================= BENEFITS ================= */}

                <section className="mt-6">
                    <h3 className="mb-3 text-sm font-bold text-gray-800">
                        Inclusion & Benefits
                    </h3>

                    <div className="overflow-hidden rounded-md border border-gray-200">
                        {/* Header */}
                        <div className="grid grid-cols-[45px_1fr_1fr] bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                            <div />

                            <div>Name</div>

                            <div>Status</div>
                        </div>

                        {/* Rows */}
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.id}
                                className="grid min-h-10 grid-cols-[45px_1fr_1fr] items-center border-t border-gray-100 px-3"
                            >
                                {/* Checkbox */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleBenefit(
                                            benefit.id
                                        )
                                    }
                                    className={`flex h-5 w-5 items-center justify-center rounded border ${benefit.included
                                        ? "border-[#0066b3] bg-[#0066b3] text-white"
                                        : "border-gray-300 bg-white"
                                        }`}
                                >
                                    {benefit.included && (
                                        <Check
                                            size={13}
                                            strokeWidth={3}
                                        />
                                    )}
                                </button>

                                {/* Name */}
                                <span className="text-xs text-gray-700">
                                    {benefit.name}
                                </span>

                                {/* Status */}
                                <span
                                    className={`text-xs ${benefit.included
                                        ? "text-[#0066b3]"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {benefit.included
                                        ? "Included In Package"
                                        : "Not Included in Package"}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <div className="flex shrink-0 justify-center border-t border-gray-200 bg-white px-6 py-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-md bg-orange-500 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600"
                >
                    Add Package
                </button>
            </div>
        </div>
    );
}