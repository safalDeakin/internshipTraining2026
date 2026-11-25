import { useMemo, useState, type ReactNode } from "react";

import {
    DayActivityCmdService,
    DayActivityQueryService,
} from "../../../../../application/services";

import { useSubscription } from "../../../../../application/useSubscription";

import DayActivityContext, {
    type DayActivityContextType,
} from "./DayActivityContext";

import type { Building, DayActivity } from "../../../../../domain/dayActivity";

export const DayActivityProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBuildingId, setSelectedBuildingId] = useState("");

    const title = "Day Activity";

    const queryService = DayActivityQueryService;
    const cmdService = DayActivityCmdService;

    const { data } = useSubscription<DayActivity, string>(queryService);

    const buildings = useMemo(
        () => data.flatMap((activity) => activity.buildings),
        [data],
    );

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return buildings;
        }

        return buildings.filter((building) =>
            [building.id, building.name].some((value) =>
                value.toLowerCase().includes(query),
            ),
        );
    }, [buildings, searchQuery]);

    // Find selected building
    const selectedBuilding = useMemo(
        () =>
            buildings.find(
                (building) => building.id === selectedBuildingId,
            ) ?? buildings[0],
        [buildings, selectedBuildingId],
    );

    const create = async (
        request: DayActivity,
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
        id: string,
    ): Promise<boolean> => {
        try {
            return await cmdService.delete(id);
        } catch (error) {
            console.log(error);
            alert(`Id: ${id} Not Found`);
            return false;
        }
    };

    const value = useMemo<DayActivityContextType>(
        () => ({
            title,
            data: filteredData,
            searchQuery,
            setSearchQuery,
            getId: (item: Building) => item.id,
            create,
            remove,
            selectedBuilding,
            selectBuilding: setSelectedBuildingId,
        }),
        [filteredData, searchQuery, selectedBuilding],
    );

    return (
        <DayActivityContext.Provider value={value}>
            {children}
        </DayActivityContext.Provider>
    );
};