import { useMemo, useState } from "react";
import type { Reservation } from "../../types/reservation";

import MobileDaySelector from "./MobileDaySelector";
import MobileCalendarControls from "./MobileCalendarControls";
import MobileRoomList from "./MobileRoomList";

interface MobileRoom {
    id: number;
    roomNumber: string;
    type: string;
    organizationId: number;
}

interface MobileCalendarProps {
    rooms: MobileRoom[];
    reservationsByRoom: Record<string, Reservation[]>;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    onMoveReservation: (reservation: Reservation) => void;
}

export default function MobileCalendar({
    rooms,
    reservationsByRoom,
    selectedDate,
    onDateChange,
    onMoveReservation,
}: MobileCalendarProps) {
    const [search, setSearch] = useState("");

    const filteredRooms = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return rooms;
        }

        return rooms.filter((room) =>
            room.roomNumber.toLowerCase().includes(query) ||
            room.type.toLowerCase().includes(query)
        );
    }, [rooms, search]);

    return (
        <div className="flex flex-col gap-4">
            <MobileDaySelector
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />

            <MobileCalendarControls
                search={search}
                onSearchChange={setSearch}
            />

            <MobileRoomList
                rooms={filteredRooms}
                reservationsByRoom={reservationsByRoom}
                onMoveReservation={onMoveReservation}
            />
        </div>
    );
}