import {
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    HallReservationCmdService,
    HallReservationQueryService,
} from "../../../../../application/services";

import { useSubscription } from "../../../../../application/useSubscription";
import type { HallReservation } from "../../../../../domain/hallReservation";

import RepoHallReservationContext from "./HallReservationContext";

export const RepoHallReservationProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const title = "Hall Reservation";

    const queryService = HallReservationQueryService;
    const cmdService = HallReservationCmdService;

    const { data } = useSubscription<HallReservation, string>(queryService);

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            [item.title, item.id].some((value) =>
                value.toLowerCase().includes(query)
            )
        );
    }, [data, searchQuery]);


    const create = async (
        request: HallReservation
    ): Promise<boolean> => {
        try {
            return await cmdService.create(request);
        } catch (error) {
            alert(`Id: ${request.id} Already Exist`);
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

            getId: (item: HallReservation) => item.id,

            create,
            remove,
        }),
        [filteredData, searchQuery],
    );

    return (
        <RepoHallReservationContext.Provider
            value={value}
        >
            {children}
        </RepoHallReservationContext.Provider>
    );
};