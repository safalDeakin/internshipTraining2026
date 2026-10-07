import type { Reservation } from "../../types/reservation";
import MobileRoomCard from "./MobileRoomCard";

interface MobileRoom {
    id: number;
    roomNumber: string;
    type: string;
    organizationId: number;
}

interface MobileRoomListProps {
    rooms: MobileRoom[];
    reservationsByRoom: Record<string, Reservation[]>;
    onMoveReservation: (reservation: Reservation) => void;
}

export default function MobileRoomList({
    rooms,
    reservationsByRoom,
    onMoveReservation,
}: MobileRoomListProps) {
    if (rooms.length === 0) {
        return (
            <div
                className="
                    flex min-h-32
                    items-center justify-center
                    rounded-xl
                    border border-dashed border-gray-300
                    bg-white
                    px-4
                    text-center
                "
            >
                <div>
                    <p className="text-sm font-medium text-gray-700">
                        No rooms found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                        Try changing your search or floor filter.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {rooms.map((room) => (
                <MobileRoomCard
                    key={room.id}
                    room={room}
                    reservations={
                        reservationsByRoom[room.id] || []
                    }
                    onMoveReservation={onMoveReservation}
                />
            ))}
        </div>
    );
}