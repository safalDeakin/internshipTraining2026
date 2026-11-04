
export type TabKey = 'customer' | 'folio' | 'room' | 'notes' | 'stay' | 'payments';

export type ReservationListModel = {
    guestName: string,
    checkInTime: string,
    reservationCode: string,
    roomNumber: string
};


export type ReservationDetailModel = {
    reservationCode: string,
    id: string,
    bookingDate: string,
    status: string,
    //  'confirmed'|'active' | 'pending' | 'checked-out'
    source: string,
    ratePlan: string,
    adults: number,
    kids: number,
    expectedArrival: string,
    roomNumber: string,
    guest: GuestInfo;
    room: RoomInfo;
    payment: PaymentSummary;
    notes: string;
    checkInTime: string;
    folioItems: FolioItem[];
};

export interface FolioItem {
    id: string;
    date: string;
    description: string;
    charge: number;
    credit: number;
}

export interface GuestInfo {
    name: string;
    nationality: string;
    phone: string;
    email: string;
    idType: string;

    title?: string;
    address?: string;
    idNumber?: string;
}

export interface RoomInfo {
    number: string;
    type: string;
    floor: string;
    bedType: string;
    smoking: string;
    occupancy: string;
}

export interface PaymentSummary {
    roomCharge: number;
    nights: number;
    taxAndFee: number;
    discount: number;
    totalAmount: number;
    advancePaid: number;
    outstandingBalance: number;
    paymentMethod?: "Cash" | "Credit" | "Bank Transfer";
}

export interface PrintReservationFormData {
    date: string;
    reservationNo: string;

    title: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    nationality: string;
    emailAddress: string;
    idType: string;
    idNumber: string;

    arrivalDate: string;
    departureDate: string;
    noOfNight: number;
    noOfAdult: number;
    noOfChildren: number;

    ratePlan: string;
    ratePerRoom: number;
    currency: string;
    totalEstimateAmount: number;

    paymentGuarantee: string;

    agreementName: string;
    signature: string;
}