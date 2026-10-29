import {
    useCallback,
    useContext,
    useMemo,
    type ReactNode,
} from "react";

import type { NightAuditData } from "../../../../../domain/nightAudit";
import {
    nightAuditCmdService,
    nightAuditQueryService,
} from "../../../../../application/services";
import RepoNightAuditContext from "./NightAuditContext";
import { useSubscription } from "../../../../../application/useSubscription";

export const NightAuditProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const queryService = nightAuditQueryService;
    const cmdService = nightAuditCmdService;

    const { data } = useSubscription<NightAuditData, string>(
        queryService,
    );

    const create = useCallback(
        async (item: NightAuditData): Promise<boolean> => {
            try {
                return await cmdService.create(item);
            } catch (error) {
                console.error("Failed to create Night Audit:", error);
                alert(`ID: ${item.id} already exists or could not be created.`);
                return false;
            }
        },
        [cmdService],
    );

    const remove = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                return await cmdService.delete(id);
            } catch (error) {
                console.error("Failed to delete Night Audit:", error);
                alert(`ID: ${id} was not found or could not be deleted.`);
                return false;
            }
        },
        [cmdService],
    );

    const value = useMemo(
        () => ({
            data,
            create,
            remove,
        }),
        [data, create, remove],
    );

    return (
        <RepoNightAuditContext.Provider value={value}>
            {children}
        </RepoNightAuditContext.Provider>
    );
};

export const useNightAuditHook = () => {
    const context = useContext(RepoNightAuditContext);

    if (!context) {
        throw new Error(
            "useNightAuditHook must be used inside NightAuditProvider",
        );
    }

    return context;
};