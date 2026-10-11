import { useSyncExternalStore } from 'react';
import { useAppContext } from '../context/AppContext';
import type { TabKey } from '../types';

export function useUIState() {
    const { uiState } = useAppContext();

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
