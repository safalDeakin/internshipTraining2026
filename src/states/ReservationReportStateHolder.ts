import { Repo } from "../repo/Repo";
import type { Reservation } from "../types/reservation";

import { filterReservations } from "../reports/filterReservation";
import { buildReservationReport } from "../reports/reservationReportData";

export class ReservationReportStateHolder {
    private repo: Repo;

    private listeners = new Set<() => void>();

    private search = "";
    private status = "";
    private roomType = "";
    private paymentStatus = "";
    private fromDate = "";
    private toDate = "";

    private snapshot = {
        filteredReservations: [] as Reservation[],

        reportData: null as ReturnType<typeof buildReservationReport> | null,

        search: "",
        status: "",
        roomType: "",
        paymentStatus: "",
        fromDate: "",
        toDate: "",
    };

    private unsubscribeRepo: () => void;

    constructor(repo: Repo) {
        this.repo = repo;

        this.recalculate();

        this.unsubscribeRepo = this.repo.subscribeReservations(() => {
            this.recalculate();
            this.notify();
        });
    }


    // Subscribe
    subscribe = (listener: () => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    };



    // Snapshot
    getSnapshot = () => {
        return this.snapshot;
    };


    // Search
    setSearch = (search: string) => {
        this.search = search;

        this.recalculate();
        this.notify();
    };




    // Status
    setStatus = (status: string) => {
        this.status = status;

        this.recalculate();
        this.notify();
    };

    // Room Type
    setRoomType = (roomType: string) => {
        this.roomType = roomType;

        this.recalculate();
        this.notify();
    };


    // Payment Status
    setPaymentStatus = (paymentStatus: string) => {
        this.paymentStatus = paymentStatus;

        this.recalculate();
        this.notify();
    };


    // From Date
    setFromDate = (fromDate: string) => {
        this.fromDate = fromDate;

        this.recalculate();
        this.notify();
    };


    // To Date
    setToDate = (toDate: string) => {
        this.toDate = toDate;

        this.recalculate();
        this.notify();
    };


    // Reset
    resetFilters = () => {
        this.search = "";
        this.status = "";
        this.roomType = "";
        this.paymentStatus = "";
        this.fromDate = "";
        this.toDate = "";

        this.recalculate();
        this.notify();
    };




    // Recalculate
    private recalculate() {
        const reservations = this.repo.getReservations();

        const filteredReservations = filterReservations(
            reservations,
            {
                search: this.search,
                status: this.status,
                roomType: this.roomType,
                paymentStatus: this.paymentStatus,
                fromDate: this.fromDate,
                toDate: this.toDate,
            }
        );

        const reportData = buildReservationReport(
            filteredReservations,
            {
                propertyName: "VIP Hotel & Resort",
                reportDate: "2083/01/01",
                preparedBy: "Store Manager",
                location: "28 Kilo, Dhulikhel",
            }
        );

        this.snapshot = {
            filteredReservations,

            reportData,

            search: this.search,
            status: this.status,
            roomType: this.roomType,
            paymentStatus: this.paymentStatus,
            fromDate: this.fromDate,
            toDate: this.toDate,
        };
    }


    // Notify
    private notify() {
        this.listeners.forEach((listener) => {
            listener();
        });
    }


    // Cleanup
    destroy() {
        this.unsubscribeRepo();
        this.listeners.clear();
    }
}