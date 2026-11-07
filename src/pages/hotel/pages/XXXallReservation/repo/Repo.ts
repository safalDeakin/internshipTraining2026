import type { Complaint, ComplaintStatus, Reservation, FolioItem } from '../types';
import { mockReservations } from '../data/mockData';

export class Repo {
    private reservations: Reservation[] = mockReservations;
    private listeners = new Set<() => void>();

    subscribe(listener: () => void) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify() {
        this.listeners.forEach((l) => l());
    }

    getReservations(): Reservation[] {
        return this.reservations;
    }

    getReservation(id: string): Reservation | undefined {
        return this.reservations.find((r) => r.id === id);
    }

    setReservations(reservations: Reservation[]) {
        this.reservations = reservations;
        this.notify();
    }

    updateReservation(id: string, patch: Partial<Reservation>) {
        this.reservations = this.reservations.map((r) =>
            r.id === id ? { ...r, ...patch } : r
        );
        this.notify();
    }

    cancelReservation(id: string) {
        this.updateReservation(id, { reservationStatus: 'Cancelled', status: 'checked-out' });
    }

    updateNotes(id: string, notes: string) {
        this.updateReservation(id, { notes });
    }

    addFolioItem(reservationId: string, item: Omit<FolioItem, 'id'>) {
        const reservation = this.getReservation(reservationId);
        if (!reservation) return;

        const newItem: FolioItem = { ...item, id: `f-${Date.now()}` };
        this.updateReservation(reservationId, {
            folioItems: [...reservation.folioItems, newItem],
        });
    }

    addComplaint(
        reservationId: string,
        complaint: Omit<Complaint, 'id' | 'complaintNumber'>
    ) {
        const reservation = this.getReservation(reservationId);
        if (!reservation) return;

        const sequence = reservation.complaints.length + 1;
        const year = new Date().getFullYear();
        const newComplaint: Complaint = {
            ...complaint,
            id: `complaint-${Date.now()}`,
            complaintNumber: `CM#${reservation.reservationNumber.replace(/\D/g, '')}${sequence}-${year}`,
        };

        this.updateReservation(reservationId, {
            complaints: [...reservation.complaints, newComplaint],
        });
    }

    updateComplaintStatus(
        reservationId: string,
        complaintId: string,
        status: ComplaintStatus,
        statusDescription: string
    ) {
        const reservation = this.getReservation(reservationId);
        if (!reservation) return;

        this.updateReservation(reservationId, {
            complaints: reservation.complaints.map((complaint) =>
                complaint.id === complaintId
                    ? { ...complaint, status, statusDescription }
                    : complaint
            ),
        });
    }
}
