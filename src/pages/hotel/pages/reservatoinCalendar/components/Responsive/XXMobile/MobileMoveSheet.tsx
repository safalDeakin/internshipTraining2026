import {
    AlertCircle,
    Check,
    ChevronDown,
    X,
} from "lucide-react";

import type { Reservation } from "../../types/reservation";

interface MobileRoom {
    id: number;
    roomNumber: string;
    type: string;
    organizationId: number;
}

interface MobileMoveSheetProps {
    open: boolean;
    reservation: Reservation | null;
    rooms: MobileRoom[];
    selectedRoomId: number | null;
    selectedSlot: number;
    validationMessage?: string | null;
    isValid: boolean;
    onRoomChange: (roomId: number) => void;
    onSlotChange: (slot: number) => void;
    onConfirm: () => void;
    onClose: () => void;
}

export default function MobileMoveSheet({
    open,
    reservation,
    rooms,
    selectedRoomId,
    selectedSlot,
    validationMessage,
    isValid,
    onRoomChange,
    onSlotChange,
    onConfirm,
    onClose,
}: MobileMoveSheetProps) {
    if (!open || !reservation) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close move reservation"
                onClick={onClose}
                className="
                    absolute inset-0
                    bg-black/40
                    backdrop-blur-[1px]
                "
            />

            {/* Bottom Sheet */}
            <div
                className="
                    absolute bottom-0 left-0 right-0
                    max-h-[85vh]
                    overflow-y-auto
                    rounded-t-2xl
                    bg-white
                    shadow-2xl
                    animate-in
                    slide-in-from-bottom
                    duration-200
                "
            >
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
                    <div className="flex items-center justify-between px-4 py-4">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Move Reservation
                            </h2>

                            <p className="mt-0.5 text-xs text-gray-500">
                                {reservation.guestName ||
                                    reservation.status}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                text-gray-500
                                transition
                                hover:bg-gray-100
                                hover:text-gray-900
                                active:scale-95
                            "
                            aria-label="Close"
                        >
                            <X size={19} />
                        </button>
                    </div>
                </div>

                <div className="space-y-5 p-4">
                    {/* Current reservation */}
                    <div
                        className="
                            rounded-xl
                            border border-gray-200
                            bg-gray-50
                            p-3
                        "
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                                Current reservation
                            </span>

                            <span className="text-xs font-semibold text-gray-700">
                                {reservation.span} slots
                            </span>
                        </div>

                        <div className="mt-1 text-sm font-semibold text-gray-900">
                            Start slot {reservation.startSlot}
                        </div>
                    </div>

                    {/* Room */}
                    <div>
                        <label
                            htmlFor="mobile-target-room"
                            className="
                                mb-2 block
                                text-xs font-semibold
                                text-gray-700
                            "
                        >
                            Move to room
                        </label>

                        <div className="relative">
                            <select
                                id="mobile-target-room"
                                value={selectedRoomId ?? ""}
                                onChange={(event) =>
                                    onRoomChange(
                                        Number(event.target.value)
                                    )
                                }
                                className="
                                    h-11 w-full
                                    appearance-none
                                    rounded-lg
                                    border border-gray-200
                                    bg-white
                                    px-3 pr-10
                                    text-sm
                                    text-gray-800
                                    outline-none
                                    transition
                                    focus:border-blue-400
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            >
                                <option value="" disabled>
                                    Select room
                                </option>

                                {rooms.map((room) => (
                                    <option
                                        key={room.id}
                                        value={room.id}
                                    >
                                        Room {room.roomNumber} —{" "}
                                        {room.type}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute right-3 top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />
                        </div>
                    </div>

                    {/* Start time */}
                    <div>
                        <label
                            htmlFor="mobile-start-slot"
                            className="
                                mb-2 block
                                text-xs font-semibold
                                text-gray-700
                            "
                        >
                            Start time
                        </label>

                        <div className="relative">
                            <select
                                id="mobile-start-slot"
                                value={selectedSlot}
                                onChange={(event) =>
                                    onSlotChange(
                                        Number(event.target.value)
                                    )
                                }
                                className="
                                    h-11 w-full
                                    appearance-none
                                    rounded-lg
                                    border border-gray-200
                                    bg-white
                                    px-3 pr-10
                                    text-sm
                                    text-gray-800
                                    outline-none
                                    transition
                                    focus:border-blue-400
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            >
                                {Array.from(
                                    { length: 56 },
                                    (_, index) => (
                                        <option
                                            key={index}
                                            value={index}
                                        >
                                            Slot {index}
                                        </option>
                                    )
                                )}
                            </select>

                            <ChevronDown
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute right-3 top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />
                        </div>
                    </div>

                    {/* Validation */}
                    {validationMessage && (
                        <div
                            className={`
                                flex items-start gap-2
                                rounded-lg
                                border
                                px-3 py-2.5
                                text-xs
                                ${isValid
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-red-200 bg-red-50 text-red-700"
                                }
                            `}
                        >
                            {isValid ? (
                                <Check
                                    size={15}
                                    className="mt-0.5 shrink-0"
                                />
                            ) : (
                                <AlertCircle
                                    size={15}
                                    className="mt-0.5 shrink-0"
                                />
                            )}

                            <span>{validationMessage}</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex-1
                                rounded-lg
                                border border-gray-200
                                bg-white
                                px-4 py-2.5
                                text-sm font-semibold
                                text-gray-700
                                transition
                                hover:bg-gray-50
                                active:scale-[0.98]
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={!isValid}
                            onClick={onConfirm}
                            className="
                                flex-1
                                rounded-lg
                                bg-blue-600
                                px-4 py-2.5
                                text-sm font-semibold
                                text-white
                                transition
                                hover:bg-blue-700
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:bg-gray-200
                                disabled:text-gray-400
                            "
                        >
                            Confirm Move
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}