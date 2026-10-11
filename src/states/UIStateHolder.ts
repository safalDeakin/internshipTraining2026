type TabKey = 'customer' | 'folio' | 'room' | 'notes' | 'stay' | 'payments';

type Snapshot = {
    activeTab: TabKey;
    activeSidebarItem: string;
};

export class UIStateHolder {
    private listeners = new Set<() => void>();
    private snapshot: Snapshot = {
        activeTab: 'customer',
        activeSidebarItem: 'all-reservations',
    };

    getSnapshot = (): Snapshot => this.snapshot;

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    private notify() {
        this.listeners.forEach((l) => l());
    }

    setActiveTab(tab: TabKey) {
        this.snapshot = { ...this.snapshot, activeTab: tab };
        this.notify();
    }

    setActiveSidebarItem(item: string) {
        this.snapshot = { ...this.snapshot, activeSidebarItem: item };
        this.notify();
    }

    resetTab() {
        this.setActiveTab('customer');
    }
}
