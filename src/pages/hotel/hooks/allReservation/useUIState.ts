import { useSyncExternalStore } from 'react';
import { useAllReservationContext } from '../../pages/allReservation/context/AllReservationContext';
import type { TabKey } from '../../pages/allReservation/types/index';

export function useUIState() {
    const { uiState } = useAllReservationContext();

    const snapshot = useSyncExternalStore(
        uiState.subscribe,
        uiState.getSnapshot
    );

    return {
        ...snapshot,
        setActiveTab: (tab: TabKey) => uiState.setActiveTab(tab),
        setActiveSidebarItem: (item: string) => uiState.setActiveSidebarItem(item),
        resetTab: () => uiState.resetTab(),
    };
}
