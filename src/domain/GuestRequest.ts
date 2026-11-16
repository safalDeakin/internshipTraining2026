export type BillItem = {
    id: number;
    service: string;
    quantity: number;
    reference: string;
    amount: number;
};

export type GuestRequest = {
    id: string;
    title: string;
    reservation: string;
    room: string;
    guestName: string;
    stay: string;
    serviceType: string;
    quantity: string;
    requestedDate: string;
    requestedTime: string;
    expectedTime: string;
    assignedTo: string;
    completedBy: string;
    completedAt: string;
    note: string;
    status: "Assigned Task" | "Completed";
    billItems: BillItem[];
};
