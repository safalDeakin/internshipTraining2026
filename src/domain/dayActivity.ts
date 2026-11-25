export interface SummaryItem {
    label: string;
    value: string;
    detail?: string;
}

export interface Checklist {
    title: string;
    items: string[];
}

export interface ReconciliationRow {
    id: string;
    name: string;
    expected: string;
    difference?: string;
}

export interface Building {
    id: string;
    name: string;
    rooms: number;

    summaryItems: SummaryItem[];
    checklists: Checklist[];
    paymentRows: ReconciliationRow[];
    revenueRows: ReconciliationRow[];
}

export interface DayActivity {
    id: string;
    buildings: Building[];
}