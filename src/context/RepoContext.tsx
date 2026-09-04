import { createContext, useContext, type ReactNode } from "react";
import { Repo } from "../repo/Repo";
import { KitchenStateHolder } from "../states/KitchenStateHolder";
import { ReservationStateHolder } from "../states/ReservationStateHolder";

type RepoContextValue = {
    repo: Repo;
    kitchenState: KitchenStateHolder;
    reservationState: ReservationStateHolder;
};

const RepoContext = createContext<RepoContextValue | null>(null);

type RepoProviderProps = {
    repo: Repo;
    kitchenState: KitchenStateHolder;
    reservationState: ReservationStateHolder;
    children: ReactNode;
};

export const RepoProvider = ({
    repo,
    kitchenState,
    reservationState,
    children,
}: RepoProviderProps) => {
    return (
        <RepoContext.Provider
            value={{
                repo,
                kitchenState,
                reservationState,
            }}
        >
            {children}
        </RepoContext.Provider>
    );
};

export const useRepo = () => {
    const context = useContext(RepoContext);

    if (context === null) {
        throw new Error(
            "useRepo must be used inside RepoProvider"
        );
    }

    return context;
};