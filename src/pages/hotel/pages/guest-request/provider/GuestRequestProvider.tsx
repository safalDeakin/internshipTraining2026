import { useMemo, useState, type ReactNode } from "react";

import {
    guestRequestCmdService,
    guestRequestQueryService,
} from "../../../../../application/services";
import { useSubscription } from "../../../../../application/useSubscription";
import RepoGuestRequestContext from "./GuestRequestContext";
import type { GuestRequest } from "../../../../../domain/GuestRequest";
export const RepoGuestRequestProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const title = "Guest Request";

    const queryService = guestRequestQueryService;
    const cmdService = guestRequestCmdService;

    const { data } =
        useSubscription<GuestRequest, string>(queryService);

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            [
                item.guestName,
                item.id,
                item.room,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [data, searchQuery]);

    const create = async (
        request: GuestRequest
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
            getId: (item: GuestRequest) => item.id,
            create,
            remove,
        }),
        [filteredData, searchQuery],
    );

    return (
        <RepoGuestRequestContext.Provider value={value}>
            {children}
        </RepoGuestRequestContext.Provider>
    );
};
