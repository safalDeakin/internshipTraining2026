
import type { ReservationDetailModel, ReservationListModel } from '../../model/ReservationModel';
import type { InvoiceData, PaymentData, RefundData } from "../../../../../recepits/types/receipts";

export const reservationsDetails: ReservationDetailModel[] = [
    {
        id: 'prabin-r01-12344',
        info: {
            id: 'prabin-r01-12344',
            roomNumber: 'R101-#RV1232',
            reservationCode: 'RV-#1221',
            bookingDate: '2083/01/01 - 2083/01/03',
            status: 'Confirmed',
            source: 'Walk In',
            ratePlan: '-',
            adults: 2,
            kids: 0,
            expectedArrival: '2:00 PM'
        },
        checkInTime: '6:00pm',
        guest: {
            name: 'Nia Shrestha',
            nationality: 'Nepali',
            phone: '98989898989',
            email: 'niashrestha@gmail.com',
            idType: 'Citizenship- 137-12-12221',
        },
        room: {
            number: '301',
            type: 'Deluxe Room',
            floor: '1 Floor',
            bedType: 'King Bed',
            smoking: 'Non Smoking',
            occupancy: '2 Adults, 0 Children',
        },
        payment: {
            roomCharge: 7000,
            nights: 2,
            taxAndFee: 2200,
            discount: 0,
            totalAmount: 9200,
            advancePaid: 5000,
            outstandingBalance: 4200,
        },
        notes: 'Guest requested late checkout. Prefers high floor room. VIP member.',
        folioItems: [
            { id: 'f1', date: '2083/01/01', description: 'Room Charge - Deluxe Room', charge: 3500, credit: 0 },
            { id: 'f2', date: '2083/01/02', description: 'Room Charge - Deluxe Room', charge: 3500, credit: 0 },
            { id: 'f3', date: '2083/01/01', description: 'Tax & Service Fee', charge: 2200, credit: 0 },
            { id: 'f4', date: '2083/01/01', description: 'Advance Payment', charge: 0, credit: 5000 },
        ],
    },
    {
        id: 'prabin-asdasdadd',
        info: {
            id: 'prabin-asdasdadd',
            roomNumber: 'R102-#RV1233',
            reservationCode: 'RV-#1222',
            bookingDate: '2083/01/05 - 2083/01/07',
            status: 'Pending',
            source: 'Online Booking',
            ratePlan: '2024-Winter Special',
            adults: 1,
            kids: 1,
            expectedArrival: '3:00 PM',
        },
        checkInTime: '',
        guest: {
            name: 'Prabin Asdasdadd',
            nationality: 'Nepali',
            phone: '98000000000',
            email: 'prabin@example.com',
            idType: 'Passport- AB-1234567',
        },
        room: {
            number: '205',
            type: 'Standard Room',
            floor: '2 Floor',
            bedType: 'Twin Bed',
            smoking: 'Non Smoking',
            occupancy: '1 Adult, 1 Child',
        },
        payment: {
            roomCharge: 5000,
            nights: 2,
            taxAndFee: 1500,
            discount: 500,
            totalAmount: 6000,
            advancePaid: 2000,
            outstandingBalance: 4000,
        },
        notes: '',
        folioItems: [
            { id: 'f1', date: '2083/01/05', description: 'Room Charge - Standard Room', charge: 2500, credit: 0 },
            { id: 'f2', date: '2083/01/06', description: 'Room Charge - Standard Room', charge: 2500, credit: 0 },
            { id: 'f3', date: '2083/01/05', description: 'Tax & Service Fee', charge: 1500, credit: 0 },
            { id: 'f4', date: '2083/01/05', description: 'Winter Special Discount', charge: 0, credit: 500 },
            { id: 'f5', date: '2083/01/05', description: 'Advance Payment', charge: 0, credit: 2000 },
        ],
    },
    {
        id: 'winter-special-1',
        info: {
            id: 'winter-special-1',
            roomNumber: 'R201-#RV1234',
            reservationCode: 'RV-#1223',
            bookingDate: '2083/01/10 - 2083/01/15',
            status: 'Confirmed',
            source: 'Travel Agency',
            ratePlan: '2024-Winter Special',
            adults: 2,
            kids: 2,
            expectedArrival: '12:00 PM',
        },
        checkInTime: '',
        guest: {
            name: 'Anita Sharma',
            nationality: 'Indian',
            phone: '+91 9876543210',
            email: 'anita.sharma@email.com',
            idType: 'Passport- P-1234567',
        },
        room: {
            number: '401',
            type: 'Suite',
            floor: '4 Floor',
            bedType: 'King Bed',
            smoking: 'Non Smoking',
            occupancy: '2 Adults, 2 Children',
        },
        payment: {
            roomCharge: 25000,
            nights: 5,
            taxAndFee: 7500,
            discount: 2500,
            totalAmount: 30000,
            advancePaid: 15000,
            outstandingBalance: 15000,
        },
        notes: 'Family with kids. Requested baby cot and extra towels.',
        folioItems: [
            { id: 'f1', date: '2083/01/10', description: 'Room Charge - Suite (5 nights)', charge: 25000, credit: 0 },
            { id: 'f2', date: '2083/01/10', description: 'Tax & Service Fee', charge: 7500, credit: 0 },
            { id: 'f3', date: '2083/01/10', description: 'Winter Special Discount', charge: 0, credit: 2500 },
            { id: 'f4', date: '2083/01/10', description: 'Advance Payment', charge: 0, credit: 15000 },
        ],
    },
    {
        id: 'winter-special-2',
        info: {
            id: 'winter-special-2',
            roomNumber: 'R301-#RV1235',
            reservationCode: 'RV-#1224',
            bookingDate: '2083/01/12 - 2083/01/14',
            status: 'Confirmed',
            source: 'Walk In',
            ratePlan: '2024-Winter Special',
            adults: 2,
            kids: 0,
            expectedArrival: '4:00 PM',
        },

        checkInTime: '',
        guest: {
            name: 'Rajesh Kumar',
            nationality: 'Indian',
            phone: '+91 8765432109',
            email: 'rajesh.kumar@email.com',
            idType: 'Aadhar- 1234-5678-9012',
        },
        room: {
            number: '302',
            type: 'Deluxe Room',
            floor: '3 Floor',
            bedType: 'Queen Bed',
            smoking: 'Smoking',
            occupancy: '2 Adults, 0 Children',
        },
        payment: {
            roomCharge: 8000,
            nights: 2,
            taxAndFee: 2400,
            discount: 0,
            totalAmount: 10400,
            advancePaid: 5000,
            outstandingBalance: 5400,
        },
        notes: '',
        folioItems: [
            { id: 'f1', date: '2083/01/12', description: 'Room Charge - Deluxe Room', charge: 4000, credit: 0 },
            { id: 'f2', date: '2083/01/13', description: 'Room Charge - Deluxe Room', charge: 4000, credit: 0 },
            { id: 'f3', date: '2083/01/12', description: 'Tax & Service Fee', charge: 2400, credit: 0 },
            { id: 'f4', date: '2083/01/12', description: 'Advance Payment', charge: 0, credit: 5000 },
        ],
    },
];



export const reservationLists: ReservationListModel[] = [
    {
        guestName: 'Nia Shrestha',
        checkInTime: '6:00pm',
        reservationCode: 'RV-#1221',
        roomNumber: 'R101',
    },
    {
        guestName: 'Prabin Asdasdadd',
        roomNumber: 'R102-#RV1233',
        checkInTime: '7:00pm',
        reservationCode: 'RV-#1222',
    },
    {
        guestName: 'Anita Sharma',
        roomNumber: 'R201-#RV1234',
        checkInTime: '',
        reservationCode: 'RV-#1223',
    },
    {
        guestName: 'Rajesh Kumar',
        roomNumber: 'R301-#RV1235',
        checkInTime: '',
        reservationCode: 'RV-#1224',
    },
];



export const invoice: InvoiceData = {
    invoiceNumber: 'INV-#121122',
    date: '2083/01/01',
    guest: [
        { label: 'Guest Name', value: 'Nia Shrestha' },
        { label: 'Nationality', value: 'Nepali' },
        { label: 'Phone Number', value: '98989898989' },
        { label: 'E-mail', value: 'niashrestha@gmail.com' },
        { label: 'ID Type/Number', value: 'Citizenship- 137-12-12221' },
    ],
    reservation: [
        { label: 'Reservation Number', value: 'RV-#1221' },
        { label: 'Booking Date', value: '2083/01/01 - 2083/01/03' },
        { label: 'Source', value: 'Walk In' },
        { label: 'Adult', value: '2' },
    ],
    rows: [
        { no: '1', description: 'Room Charge', date: '2083/01/01 - 2083/01/03', quantity: '1', rate: '4,000', amount: 'Rs 4,000' },
        { no: '2', description: 'Restaurant- Food', date: '2083/01/02', quantity: '1', rate: '1,000', amount: 'Rs 1,000' },
        { no: '3', description: 'Laundry Service', date: '2083/01/02', quantity: '1', rate: '500', amount: 'Rs 500' },
        { no: '4', description: 'Mini Bar', date: '2083/01/02', quantity: '1', rate: '1,000', amount: 'Rs 1,000' },
    ],
};


export const guestInformation = [
    { label: 'Guest Name', value: 'Nia Shrestha' },
    { label: 'Reservation Number', value: 'RV-#1221' },
    { label: 'Room Number', value: '301' },
    { label: 'Check In Date', value: '2083/01/01' },
    { label: 'Check Out Date', value: '2083/01/03' },
]

export const payment: PaymentData = {
    receiptNumber: 'RCT-#121122',
    date: '2083/01/01',
    guest: guestInformation,
    invoice: [
        { label: 'Invoice Number', value: 'INV-#1221' },
        { label: 'Invoice Date', value: '2083/01/01 - 2083/01/03' },
        { label: 'Receipt Number', value: 'RCT-#1221' },
        { label: 'Payment Date', value: '2083/01/03' },
    ],
    rows: [
        { no: '1', method: 'Cash', reference: '-', amount: 'Rs 2,000' },
        { no: '2', method: 'Card', reference: '#xxxx-xxx-xx', amount: 'Rs 5,995' },
    ],

};

export const refund: RefundData = {
    receiptNumber: 'RCT-#121122',
    date: '2083/01/01',
    guest: guestInformation,
    rows: [
        { no: '1', description: 'Room Charge - 1 Night', original: '4,000', amount: 'Rs 4,000' },
        { no: '2', description: 'Cancellation Adjustment', original: '1,000', amount: 'Rs 1,000' },
    ],
};