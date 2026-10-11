import {
    createContext,
    useContext,
    useRef,
    type ReactNode,
} from "react";

import { createLocalRepo } from "../core/repositories/CreateLocalRepo";
import { type Repo } from "../core/repositories/Repo";

import { QueryService } from "../core/services/QueryService";
import { CommandService } from "../core/services/CommandService";

import { ReservationStateHolder } from "../features/reservations/state/ReservationStateHolder";

import { UIStateHolder } from "../states/UIStateHolder";

type AppContextValue = {
    repo: Repo;

    queryService: QueryService;
    commandService: CommandService;

    reservationState: ReservationStateHolder;

    uiState: UIStateHolder;
};

const AppContext =
    createContext<AppContextValue | null>(null);

export function AppProvider({
    children,
}: {
    children: ReactNode;
}) {
    const repoRef = useRef<Repo | null>(null);
    const queryServiceRef = useRef<QueryService | null>(null);
    const commandServiceRef = useRef<CommandService | null>(null);
    const reservationStateRef = useRef<ReservationStateHolder | null>(null);
    const uiStateRef = useRef<UIStateHolder | null>(null);

    // Create all application-level instances once.
    if (!repoRef.current) {
        const repo = createLocalRepo();
        const queryService = new QueryService(repo);
        const commandService = new CommandService(repo);
        const reservationState = new ReservationStateHolder(
            queryService,
            commandService
        );

        const uiState =
            new UIStateHolder();

        repoRef.current = repo;
        queryServiceRef.current = queryService;
        commandServiceRef.current = commandService;
        reservationStateRef.current =
            reservationState;
        uiStateRef.current = uiState;
    }

    return (
        <AppContext.Provider
            value={{
                repo: repoRef.current!,
                queryService: queryServiceRef.current!,
                commandService: commandServiceRef.current!,
                reservationState: reservationStateRef.current!,
                uiState: uiStateRef.current!,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext(): AppContextValue {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            "useAppContext must be used inside AppProvider"
        );
    }

    return context;
}