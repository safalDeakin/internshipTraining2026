import {
    ArrowRight,
    Clock3,
    User,
} from "lucide-react";

import type { Reservation } from "../../types/reservation";
import { getStatusColors } from "../../utils/calendarUtils";

interface MobileReservationCardProps {
    reservation: Reservation;
    onMove: () => void;
}

export default function MobileReservationCard({
    reservation,
    onMove,
}: MobileReservationCardProps) {
    const colors = getStatusColors(reservation.status);

    return (
        <div
            className="
                overflow-hidden
                rounded-lg
                border
                bg-white
                shadow-sm
            "
            style={{
                borderColor: colors.border,
            }}
        >
            {/* Status indicator */}
            <div
                className="h-1 w-full"
                style={{
                    backgroundColor: colors.border,
                }}
            />

            <div className="p-3">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        {reservation.guestName ? (
                            <div className="flex items-center gap-2">
                                <User
                                    size={14}
                                    className="shrink-0 text-gray-400"
                                />

                                <span className="truncate text-sm font-semibold text-gray-900">
                                    {reservation.guestName}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm font-semibold text-gray-700">
                                {reservation.status}
                            </span>
                        )}
                    </div>

                    <span
                        className="
                            shrink-0 rounded-full
                            px-2 py-1
                            text-[10px]
                            font-semibold
                        "
                        style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                        }}
                    >
                        {reservation.status}
                    </span>
                </div>

                {/* Details */}
                <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock3 size={13} />

                        <span>
                            Slot {reservation.startSlot}
                        </span>
                    </div>

                    <div className="text-xs text-gray-400">
                        {reservation.span} slots
                    </div>
                </div>

                {/* Action */}
                {reservation.status !== "Out of Service" && (
                    <button
                        type="button"
                        onClick={onMove}
                        className="
                            mt-3
                            flex w-full
                            items-center justify-center
                            gap-2
                            rounded-lg
                            border border-gray-200
                            bg-gray-50
                            px-3 py-2
                            text-xs
                            font-semibold
                            text-gray-700
                            transition
                            hover:border-blue-200
                            hover:bg-blue-50
                            hover:text-blue-700
                            active:scale-[0.98]
                        "
                    >
                        Move reservation
                        <ArrowRight size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}