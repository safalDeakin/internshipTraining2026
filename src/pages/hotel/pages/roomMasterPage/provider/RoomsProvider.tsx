
import type { ReactNode } from "react";
import { RoomsListContext } from "./RoomsContext";

// import guestQueryService from "../../../../../../../application/service/QueryService";

import { useMemo, useState } from "react";

import {
    productDetails,
    productType,
} from "./data/roomDetailData";
import type { RoomTypes } from "../model/RoomModel";


type RoomListProviderProps = {
    children: ReactNode;
};

export function RoomListProvider({
    children,
}: RoomListProviderProps) {

    // const service = guestQueryService;

    const [searchQuery, setSearchQuery] = useState("");

    const filteredRoom = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return productType;
        }

        return productType.filter((product) =>
            [
                product.name,
                product.subtitle,
                product.detail,
            ].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [searchQuery]);

    const title = "All Room Types";

    return (
        <RoomsListContext.Provider value={{
            items: filteredRoom,
            title,
            searchQuery,
            getRoomDetails: (id: string) => {
                return productDetails[id]
            },
            setSearchQuery: (val) => {
                setSearchQuery(val);
            },
            getId: (item: RoomTypes) => {
                return item.id;
            }

        }}>
            {children}
        </RoomsListContext.Provider>
    );
}
