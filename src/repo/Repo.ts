import type { Reservation } from "../types/reservation";
export type KitchenOrder = {
  id: string;
  restaurantId: string;
  status: string;
};
export type POSSesionChild = {
  id: string;
  name: string;
  path: string;
};

export type POSSession = {
  id: string;
  restaurantId: string;
  name: string;
  children: POSSesionChild[];
};

export class Repo {
  private kitchenOrders: KitchenOrder[] = [];
  private reservations: Reservation[] = [];
  //central data store
  private posSessions: POSSession[] = [];

  private kitchenlisteners = new Set<() => void>();
  private reservationlisteners = new Set<() => void>();
  //allows React components the POS session data has changed. Re-render
  private posSessionListeners = new Set<() => void>();
  //kitchen orders
  subscribeKitchen(listener: () => void) {
    this.kitchenlisteners.add(listener);

    return () => {
      this.kitchenlisteners.delete(listener);
    };
  }

  private notifyKitchen() {
    this.kitchenlisteners.forEach((listener) => {
      listener();
    });
  }

  getKitchenOrders() {
    return this.kitchenOrders;
  }

  getKitchenOrder(id: string) {
    return this.kitchenOrders.find((order) => order.id === id);
  }

  setKitchenOrders(orders: KitchenOrder[]) {
    this.kitchenOrders = orders;
    this.notifyKitchen();
  }

  //reservations

  subscribeReservations(listener: () => void) {
    this.reservationlisteners.add(listener);

    return () => {
      this.reservationlisteners.delete(listener);
    };
  }

  private notifyReservations() {
    this.reservationlisteners.forEach((listener) => {
      listener();
    });
  }

  getReservations() {
    return this.reservations;
  }

  getReservation(id: string) {
    return this.reservations.find(
      (reservation) => reservation.reservationId === id,
    );
  }

  setReservations(reservations: Reservation[]) {
    this.reservations = reservations;
    this.notifyReservations();
  }
  //possesion
  //subscribePOSSessions() returns an unsubscribe function.
  subscribePOSSessions(listener: () => void) {
    this.posSessionListeners.add(listener);
    return () => {
      this.posSessionListeners.delete(listener);
    };
  }
  //This simply calls every subscribed listener.
  private notifyPOSSessions() {
    this.posSessionListeners.forEach((listener) => {
      listener();
    });
  }
  getPOSSessions() {
    return this.posSessions;
  }
  //This gives React the current sessions.
  getPOSSession(id: string) {
    return this.posSessions.find((session) => session.id === id);
  }
  setPOSSessions(sessions: POSSession[]) {
    // The data changes:
    this.posSessions = sessions;
    // React components are notified:
    this.notifyPOSSessions();
  }
}

export const repo = new Repo();
