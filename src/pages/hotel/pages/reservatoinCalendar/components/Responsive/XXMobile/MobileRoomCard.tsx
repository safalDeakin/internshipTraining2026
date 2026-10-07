import { BedDouble, ChevronDown } from "lucide-react";
import { useState } from "react";

import type { Reservation } from "../../types/reservation";

import MobileReservationCard from "./MobileReservationCard";

interface MobileRoom {
    id: number;
    roomNumber: string;
    type: string;
    organizationId: number;
}

interface MobileRoomCardProps {
    room: MobileRoom;
    reservations: Reservation[];
    onMoveReservation: (reservation: Reservation) => void;
}

export default function MobileRoomCard({
    room,
    reservations,
    onMoveReservation,
}: MobileRoomCardProps) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Room header */}
            <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className="
                    flex w-full items-center justify-between
                    px-4 py-3
                    text-left
                    transition
                    hover:bg-gray-50
                "
            >
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-gray-100
                            text-gray-600
                        "
                    >
                        <BedDouble size={18} />
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">
                                Room {room.roomNumber}
                            </span>
                        </div>

                        <p className="truncate text-xs text-gray-500">
                            {room.type}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[11px] text-gray-400">
                        {reservations.length}
                        {reservations.length === 1
                            ? " reservation"
                            : " reservations"}
                    </span>

                    <ChevronDown
                        size={17}
                        className={`
                            text-gray-400
                            transition-transform
                            duration-200
                            ${expanded ? "rotate-180" : ""}
                        `}
                    />
                </div>
            </button>

            {/* Reservations */}
            {expanded && (
                <div className="border-t border-gray-100 bg-gray-50/60 p-3">
                    {reservations.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-gray-200 bg-white px-3 py-5 text-center">
                            <p className="text-xs font-medium text-gray-500">
                                Room available
                            </p>

                            <p className="mt-1 text-[10px] text-gray-400">
                                No reservations for this room.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {reservations.map((reservation) => (
                                <MobileReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onMove={() =>
                                        onMoveReservation(reservation)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}