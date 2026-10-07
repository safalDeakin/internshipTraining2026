import type { CalendarEvent, EventForm, ModalState } from "../types/calendar";
import { CalendarRepo } from "../repo/CalendarRepo";

export class CalendarStateHolder {
    private repo: CalendarRepo;

    private listeners = new Set<() => void>();

    private unsubscribeRepo: () => void;

    //Actual UI STATE
    private month = 0;
    private year = 2025;
    private modal: ModalState = {
        mode: null,
    };

    private form: EventForm = {
        title: "",
        subtitle: "",
        time: "",
        type: "special",
        date: 1,
    };


    //Snapshot
    private snapshot = {
        month: 0,
        year: 2025,
        events: [] as CalendarEvent[],
        modal: {
            mode: null,
        } as ModalState,
        form: {
            title: "",
            subtitle: "",
            time: "",
            type: "special",
            date: 1,
        } as EventForm,
    };

    constructor(repo: CalendarRepo) {
        this.repo = repo;

        // Initial snapshot
        this.updateSnapshot();

        // Listen to Repo changes
        this.unsubscribeRepo = this.repo.subscribe(() => {
            this.updateSnapshot();
            this.notify();
        });
    }

    //Snapshot
    getSnapshot() {
        return this.snapshot;
    }

    // SNAPSHOT UPDATE
    private updateSnapshot() {
        this.snapshot = {
            month: this.month,
            year: this.year,
            events: this.repo.getEvents(),
            modal: this.modal,
            form: this.form,
        };
    }


    // SUBSCRIBE
    subscribe(listener: () => void) {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }


    // NOTIFY
    private notify() {
        this.listeners.forEach((listener) => {
            listener();
        });
    }

    // MONTH
    setMonth(month: number) {
        this.month = month;

        this.updateSnapshot();
        this.notify();
    }


    // YEAR
    setYear(year: number) {
        this.year = year;

        this.updateSnapshot();
        this.notify();
    }


    // ADD EVENT MODAL
    openAddEvent(date: number) {
        this.form = {
            title: "",
            subtitle: "",
            time: "",
            type: "special",
            date: date ?? 1,
        };

        this.modal = {
            mode: "event",
            date,
        };

        this.updateSnapshot();
        this.notify();
    }


    // ADD HOLIDAY MODAL
    openAddHoliday() {
        this.form = {
            title: "",
            subtitle: "",
            time: "",
            type: "holiday",
            date: 1,
        };

        this.modal = {
            mode: "holiday",
        };

        this.updateSnapshot();
        this.notify();
    }

    // EDIT EVENT
    openEditEvent(event: CalendarEvent) {
        this.form = {
            title: event.title,
            subtitle: event.subtitle ?? "",
            time: event.time ?? "",
            type: event.type,
            date: event.date,
        };

        this.modal = {
            mode: event.type === "holiday"
                ? "holiday"
                : "event",

            editId: event.id,
        };

        this.updateSnapshot();
        this.notify();
    }

    // FORM
    updateForm(field: keyof EventForm, value: string | number) {
        this.form = {
            ...this.form,
            [field]: value,
        };

        this.updateSnapshot();
        this.notify();
    }


    // SAVE
    saveModal() {
        if (!this.form.title.trim()) {
            return;
        }

        // EDIT
        if (this.modal.editId != null) {
            this.repo.updateEvent(
                this.modal.editId,
                {
                    title: this.form.title,
                    subtitle:
                        this.form.subtitle || undefined,
                    time:
                        this.form.time || undefined,
                    type: this.form.type,
                    date: this.form.date,
                }
            );
        }

        // ADD
        else {
            const newEvent: CalendarEvent = {
                id: Date.now(),

                title: this.form.title,

                date: this.form.date,

                month: this.month,

                year: this.year,

                type: this.form.type,

                subtitle:
                    this.form.subtitle || undefined,

                time:
                    this.form.time || undefined,
            };

            this.repo.addEvent(newEvent);
        }

        this.closeModal();
    }

    // DELETE
    deleteEvent(id: number) {
        this.repo.deleteEvent(id);

        this.closeModal();
    }


    // CLOSE MODAL
    closeModal() {
        this.modal = {
            mode: null,
        };

        this.updateSnapshot();
        this.notify();
    }


    // CLEANUP
    destroy() {
        this.unsubscribeRepo();
    }
}

const calendarRepo = new CalendarRepo();

export const calendarStateHolder = new CalendarStateHolder(calendarRepo);