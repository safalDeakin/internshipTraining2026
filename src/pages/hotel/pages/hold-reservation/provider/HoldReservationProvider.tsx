import { useMemo, useState, type ReactNode } from "react";

import {
    HoldReservationCmdService,
    HoldReservationQueryService,
} from "../../../../../application/services";
import { useSubscription } from "../../../../../application/useSubscription";
import RepoHoldReservationContext from "./HoldReservationContext";
import type { HoldItem, ReservationRecord } from "../../../../../domain/holdReservation";
export const RepoHoldReservationProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const title = "Pending";

    const queryService = HoldReservationQueryService;
    const cmdService = HoldReservationCmdService;

    const { data } =
        useSubscription<ReservationRecord, string>(queryService);

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            [
                item.hold.guestName,
                item.hold.id,
                item.hold.roomCode,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [data, searchQuery]);

    const create = async (
        request: ReservationRecord
    ): Promise<boolean> => {
        try {
            return await cmdService.create(request);
        } catch (error) {
            alert(`Id: ${request.hold.id} Already Exist`);
            console.log(error);

            return false;
        }
    };

    const remove = async (
        id: string
    ): Promise<boolean> => {
        try {
            return await cmdService.delete(id);
        } catch (error) {
            console.log(error);
            alert(`Id: ${id} Not Found`);

            return false;
        }
    };

    const value = useMemo(
        () => ({
            title,
            data: filteredData,
            searchQuery,
            setSearchQuery,
            getId: (item: HoldItem) => item.id,
            create,
            remove,
        }),
        [filteredData, searchQuery],
    );

    return (
        <RepoHoldReservationContext.Provider value={value}>
            {children}
        </RepoHoldReservationContext.Provider>
    );
};
