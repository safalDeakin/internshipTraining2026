
export type KitchenOrder = {
    id: string;
    restaurantId: string;
    status: string;
};

export type Reservation = {
    id: string;
    accommodationId: string;
    status: string;
    name: string;
    room: string;
};


export class Repo {
    private kitchenOrders: KitchenOrder[] = [];
    private reservations: Reservation[] = [];

    private kitchenlisteners = new Set<() => void>();
    private reservationlisteners = new Set<() => void>();


    //kitchen orders
    subscribeKitchen(listener: () => void) {
        this.kitchenlisteners.add(listener);

        return () => {
            this.kitchenlisteners.delete(listener);
        };
    }


    private notifyKitchen() {
        this.kitchenlisteners.forEach(listener => {
            listener();
        });
    }

    getKitchenOrders() {
        return this.kitchenOrders;
    }

    getKitchenOrder(id: string) {
        return this.kitchenOrders.find(
            order => order.id === id
        );
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
        this.reservationlisteners.forEach(listener => {
            listener();
        });
    }

    getReservations() {
        return this.reservations;
    }

    getReservation(id: string) {
        return this.reservations.find(
            reservation => reservation.id === id
        );
    }


    setReservations(reservations: Reservation[]) {
        this.reservations = reservations;
        this.notifyReservations();
    }
}


// export const repo = new Repo();
