import { useMemo, useState, type ReactNode } from "react";
import { ReservationListContext } from "./ReservationContext";
import type { ReservationListModel } from "../model/ReservationModel";
import {
    reservationDetails,
    reservationLists
} from "./data/ReservationData";

type ReservationListProviderProps = {
    children: ReactNode;
};

export default function ReservationListProvider({ children }: ReservationListProviderProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const title = "All Reservation";

    const filteredReservation = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return reservationLists;
        }

        return reservationLists.filter((item) =>
            [
                item.guestName,
                item.reservationCode,
                item.roomNumber,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [searchQuery]);

    const getReservationDetail = (code: string) => {
        return reservationDetails.filter((item) =>
            item.reservationCode.toLowerCase().includes(code.toLowerCase())
        );
    }

    return (
        <ReservationListContext.Provider value={{
            title,
            items: filteredReservation,
            searchQuery,
            setSearchQuery: (val) => {
                setSearchQuery(val)
            },
            getId: (item: ReservationListModel) => {
                return item.reservationCode;
            },
            getReservationDetails: (code: string) => {
                return getReservationDetail(code)[0];
            }
        }}>
            {children}
        </ReservationListContext.Provider>
    )

}