export type EventType =
    | "holiday"
    | "special"
    | "birthday"
    | "marketing"
    | "internal";

export interface CalendarEvent {
    id: number;
    title: string;
    date: number;
    month: number;
    year: number;
    type: EventType;
    time?: string;
    subtitle?: string;
}

export type ModalMode = "holiday" | "event" | null;

export interface ModalState {
    mode: ModalMode;
    editId?: number;
    date?: number;
}

export interface EventForm {
    title: string;
    subtitle: string;
    time: string;
    type: EventType;
    date: number;
}


//This is new
export type EventTagType =
    | "holiday"
    | "birthday"
    | "special";

export interface CalendarTag {
    day: number;
    type: EventTagType;
    label: string;
}

export interface SidebarEvent {
    id: string;
    dateLabel: string;
    category: string;
    title: string;
    time: string;
}

export interface BusinessDay {
    label: string;
    isWeekend: boolean;
}

export interface BusinessInfo {
    name: string;
    address: string;
    fiscalYear: string;
    openingTime: string;
    days: BusinessDay[];
}

export interface UseBusinessCalendarReturn {
    isOpen: boolean;

    openPortal: () => void;
    closePortal: () => void;

    selectedMonth: number;
    selectedYear: number;

    setSelectedMonth: (month: number) => void;
    setSelectedYear: (year: number) => void;

    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;

    calendarDays: (number | null)[];

    calendarTags: CalendarTag[];

    sidebarEvents: SidebarEvent[];

    businessInfo: BusinessInfo;

    monthNames: string[];
}