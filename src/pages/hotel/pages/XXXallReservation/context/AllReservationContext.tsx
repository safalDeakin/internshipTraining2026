import { createContext, useContext, useRef } from 'react';
import { Repo } from '../repo/Repo';
import { ReservationStateHolder } from '../states/ReservationStateHolder';
import { UIStateHolder } from '../states/UIStateHolder';

type AppContextValue = {
    repo: Repo;
    reservationState: ReservationStateHolder;
    uiState: UIStateHolder;
};

const AllReservationContext = createContext<AppContextValue | null>(null);

export function AllReservationProvider({ children }: { children: React.ReactNode }) {
    // Created once per mount; refs ensure stable instances across re-renders
    const repoRef = useRef<Repo | null>(null);
    const reservationStateRef = useRef<ReservationStateHolder | null>(null);
    const uiStateRef = useRef<UIStateHolder | null>(null);

    if (!repoRef.current) {
        repoRef.current = new Repo();
        reservationStateRef.current = new ReservationStateHolder(repoRef.current);
        uiStateRef.current = new UIStateHolder();
    }

    return (
        <AllReservationContext.Provider
            value={{
                repo: repoRef.current,
                reservationState: reservationStateRef.current!,
                uiState: uiStateRef.current!,
            }}
        >
            {children}
        </AllReservationContext.Provider>
    );
}

export function useAllReservationContext(): AppContextValue {
    const ctx = useContext(AllReservationContext);
    if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
    return ctx;
}
