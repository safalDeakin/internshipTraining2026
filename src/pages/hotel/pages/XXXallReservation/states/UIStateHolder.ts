import type { TabKey } from '../types';

type Snapshot = {
  activeTab: TabKey;
  activeSidebarItem: string;
  complaintModal:
  | { mode: 'add'; complaintId: null }
  | { mode: 'update'; complaintId: string }
  | null;
};

export class UIStateHolder {
  private listeners = new Set<() => void>();
  private snapshot: Snapshot = {
    activeTab: 'customer',
    activeSidebarItem: 'all-reservations',
    complaintModal: null,
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

  openAddComplaint() {
    this.snapshot = {
      ...this.snapshot,
      complaintModal: { mode: 'add', complaintId: null },
    };
    this.notify();
  }

  openUpdateComplaint(complaintId: string) {
    this.snapshot = {
      ...this.snapshot,
      complaintModal: { mode: 'update', complaintId },
    };
    this.notify();
  }

  closeComplaintModal() {
    this.snapshot = { ...this.snapshot, complaintModal: null };
    this.notify();
  }
}
