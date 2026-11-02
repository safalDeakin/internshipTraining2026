import { useSyncExternalStore } from 'react';
import type { TabKey } from '../../pages/allReservation/types';
import { useAllReservationContext } from '../../pages/allReservation/context/AllReservationContext';

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
        openAddComplaint: () => uiState.openAddComplaint(),
        openUpdateComplaint: (complaintId: string) =>
            uiState.openUpdateComplaint(complaintId),
        closeComplaintModal: () => uiState.closeComplaintModal(),
    };
}
