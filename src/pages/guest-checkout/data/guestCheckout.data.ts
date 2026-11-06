export type GuestDetail = {
    label: string
    value: string
    accent?: boolean
}

export type FolioItem = {
    date: string
    description: string
    category: string
    reference: string
    quantity: number
    amount: string
    status: string
}

export type ReceiptLine = {
    label: string
    amount: string
    credit?: boolean
}

export type FolioData = {
    guest: {
        details: GuestDetail[]
    }
    items: FolioItem[]
    receipt: {
        propertyName: string
        documentName: string
        lines: ReceiptLine[]
        total: string
        note: string
    }
}

// Replace this static object with data returned by the checkout/folio backend.
export const folioData: FolioData = {
    guest: {
        details: [
            { label: "Primary Guest", value: "Mr. Dev Sharma" },
            { label: "Reservation/ Reference No", value: "RV- #12111", accent: true },
            { label: "Adult - 02", value: "Children - 0" },
            { label: "Check Out Time", value: "14th march - 12 PM" },
            { label: "Phone Number", value: "+977 9801234567" },
            { label: "Stay Duration", value: "12 Mar - 14 Mar (2 Nights)" },
            { label: "Stay Duration", value: "12 Mar - 14 Mar (2 Nights)" },
        ],
    },
    items: [
        {
            date: "2083/01/01",
            description: "Room Charge - 2 night",
            category: "Accommodation",
            reference: "RC-005",
            quantity: 2,
            amount: "7,000",
            status: "Not Paid",
        },
        {
            date: "2083/01/01",
            description: "Room Service - Dinner",
            category: "F&B",
            reference: "RS-005",
            quantity: 1,
            amount: "600",
            status: "Not Paid",
        },
        {
            date: "2083/01/01",
            description: "Laundry Service",
            category: "Other",
            reference: "LN-005",
            quantity: 1,
            amount: "500",
            status: "Not Paid",
        },
        {
            date: "2083/01/01",
            description: "Mini Bar",
            category: "F&B",
            reference: "MB-005",
            quantity: 1,
            amount: "1,000",
            status: "Not Paid",
        },
    ],
    receipt: {
        propertyName: "LIQUID LOUNGE",
        documentName: "Tax Invoice & Guest Receipt",
        lines: [
            { label: "Room Subtotal", amount: "$240.00" },
            { label: "F&B / Room Service", amount: "$35.00" },
            { label: "Laundry & Extras", amount: "$15.00" },
            { label: "Tax & Service Charge (10%)", amount: "$29.00" },
            { label: "Advance Paid", amount: "-$100.00", credit: true },
        ],
        total: "$219.00",
        note: "Confirm guest signature is captured on the digital pad",
    },
}
