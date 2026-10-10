import { useMemo, useState } from "react";
import { ROOMS } from "../../pages/reservatoinCalendar/data/reservationData";

export function useCalendarFilters() {
    const [floorFilter, setFloorFilter] =
        useState("All");

    const [roomFilter, setRoomFilter] =
        useState("All");

    const [search, setSearch] =
        useState("");

    const filteredRooms = useMemo(() => {
        return ROOMS.filter((room) => {

            if (
                floorFilter !== "All" &&
                !room.floor.startsWith(floorFilter)
            ) {
                return false;
            }

            if (
                roomFilter !== "All" &&
                room.id !== roomFilter
            ) {
                return false;
            }

            if (
                search &&
                !room.id.includes(search)
            ) {
                return false;
            }

            return true;
        });
    }, [
        floorFilter,
        roomFilter,
        search,
    ]);

    return {
        floorFilter,
        setFloorFilter,

        roomFilter,
        setRoomFilter,

        search,
        setSearch,

        filteredRooms,
    };
}