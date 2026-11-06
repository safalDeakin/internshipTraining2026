
import { useState } from "react";
import { X } from "lucide-react";

type AddRoomTypePopupProps = {
    onClose: () => void;
    onSave: (data: RoomTypeFormData) => void;
};

export type RoomTypeFormData = {
    roomNumber: string;
    ratePlan: string;
    roomName: string;
    rate: string;
    roomType: string;
    floor: string;
    view: string;
    area: string;
    maxOccupancy: string;
    noOfBed: string;
    roomSize: string;
    amenities: string[];
};

const amenityGroups = [
    {
        title: "Room Feature",
        items: [
            "Television",
            "Telephone",
            "Mini Bar",
            "Air Conditioning",
            "Balcony",
            "Living Area",
        ],
    },
    {
        title: "Bathroom Feature",
        items: [
            "Attached Bathroom",
            "Hot/Cold Shower",
            "Bathtub",
            "Hair Dryer",
            "Slipper",
        ],
    },
    {
        title: "Bed & Bedding",
        items: [
            "Premium Mattress",
            "Pillows",
            "Baby Cot",
            "Extra Bed",
        ],
    },
    {
        title: "Technology",
        items: [
            "Free WiFi",
            "USB Charging Port",
            "Bluetooth Speaker",
            "Streaming Device",
        ],
    },
    {
        title: "Food & Beverage",
        items: [
            "Complimentary Water",
            "Tea/Coffee Maker",
            "Kettle",
            "Welcome Fruit Basket",
        ],
    },
];

const initialFormData: RoomTypeFormData = {
    roomNumber: "",
    ratePlan: "",
    roomName: "",
    rate: "",
    roomType: "",
    floor: "",
    view: "",
    area: "",
    maxOccupancy: "",
    noOfBed: "",
    roomSize: "",
    amenities: [],
};

export default function AddRoomForm({
    onClose,
    onSave,
}: AddRoomTypePopupProps) {
    const [formData, setFormData] =
        useState<RoomTypeFormData>(initialFormData);

    const handleChange = (
        field: keyof RoomTypeFormData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAmenityChange = (amenity: string) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity],
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputFields = [
        { label: "Room Number", key: "roomNumber" },
        { label: "Rate Plan", key: "ratePlan" },
        { label: "Room Name", key: "roomName" },
        { label: "Rate", key: "rate" },
        { label: "Room Type", key: "roomType" },
        { label: "Floor", key: "floor" },
        { label: "View", key: "view", placeholder: "Enter or Scan" },
        { label: "Area", key: "area", placeholder: "Enter" },
        { label: "Max Occupancy", key: "maxOccupancy" },
        { label: "No. of Bed", key: "noOfBed" },
        { label: "Room Size", key: "roomSize" },
    ] as const;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex w-full max-w-162.5 max-h-[92vh] flex-col overflow-hidden rounded-md bg-white shadow-xl animate-popup">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
                    <h2 className="text-sm font-semibold text-gray-800">
                        Add Room Type
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar">

                        {/* Room Information */}
                        <h3 className="mb-3 text-xs font-semibold text-gray-800">
                            Room Information
                        </h3>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {inputFields.map((field) => (
                                <div key={field.key}>
                                    <label className="mb-1 block text-[11px] font-medium text-gray-700">
                                        {field.label}
                                    </label>

                                    <input
                                        type="text"
                                        placeholder={
                                            "placeholder" in field
                                                ? field.placeholder
                                                : "Full Name"
                                        }
                                        value={formData[field.key]}
                                        onChange={(e) =>
                                            handleChange(
                                                field.key,
                                                e.target.value
                                            )
                                        }
                                        className="h-8 w-full rounded-md border border-gray-300 px-2 text-[11px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#0066B3] focus:ring-1 focus:ring-[#0066B3]/20"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Features & Amenities */}
                        <div className="mt-5">
                            <h3 className="mb-3 text-xs font-semibold text-gray-800">
                                Features & Amenities
                            </h3>

                            <div className="space-y-4">
                                {amenityGroups.map((group) => (
                                    <div
                                        key={group.title}
                                        className="rounded-md border border-gray-200 bg-white p-3 shadow-sm"
                                    >
                                        <h4 className="mb-2 text-[11px] font-semibold text-gray-700">
                                            {group.title}
                                        </h4>

                                        <div className="space-y-1.5">
                                            {group.items.map((item) => (
                                                <label
                                                    key={item}
                                                    className="flex cursor-pointer items-center gap-2 text-[10px] text-gray-600 hover:text-gray-900"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.amenities.includes(item)}
                                                        onChange={() =>
                                                            handleAmenityChange(item)
                                                        }
                                                        className="h-3.5 w-3.5 cursor-pointer accent-[#0066B3]"
                                                    />

                                                    {item}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 bg-white px-5 py-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-8 min-w-20 rounded-md border border-gray-300 bg-white px-4 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="h-8 min-w-20 rounded-md bg-[#ff6900] px-5 text-xs font-medium text-white shadow-sm hover:bg-[#e85f00]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            {/* Popup Animation */}
            <style>{`
                @keyframes popupScale {
                    from {
                        opacity: 0;
                        transform: scale(0.94) translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .animate-popup {
                    animation: popupScale 0.2s ease-out;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </div>
    );
}
