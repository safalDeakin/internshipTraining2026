export type DetailItem = {
    label: string;
    value: string;
};

export type AgendaItem = {
    start: string;
    end: string;
    activity: string;
    location: string;
    setup: string;
};

export type FolioItem = {
    date: string;
    reference: string;
    description: string;
    category: string;
    quantity: number;
    amount: string;
    type: string;
};

export type PaymentItem = {
    date: string;
    paymentType: string;
    description: string;
    reference: string;
    amount: string;
};

export type HallReservation = {
    id: string;
    title: string;
    guest: DetailItem[];
    venue: DetailItem[];
    event: DetailItem[];
    agenda: AgendaItem[];
    folio: FolioItem[];
    payments: PaymentItem[];
};
