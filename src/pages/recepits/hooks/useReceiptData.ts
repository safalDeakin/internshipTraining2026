import type { InvoiceData, PaymentData, RefundData } from '../types/receipts'

const guestInformation = [
    { label: 'Guest Name', value: 'Nia Shrestha' },
    { label: 'Reservation Number', value: 'RV-#1221' },
    { label: 'Room Number', value: '301' },
    { label: 'Check In Date', value: '2083/01/01' },
    { label: 'Check Out Date', value: '2083/01/03' },
]

export function useReceiptData(): {
    invoice: InvoiceData
    payment: PaymentData
    refund: RefundData
} {
    return {
        invoice: {
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
        },
        payment: {
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
        },
        refund: {
            receiptNumber: 'RCT-#121122',
            date: '2083/01/01',
            guest: guestInformation,
            rows: [
                { no: '1', description: 'Room Charge - 1 Night', original: '4,000', amount: 'Rs 4,000' },
                { no: '2', description: 'Cancellation Adjustment', original: '1,000', amount: 'Rs 1,000' },
            ],
        },
    }
}
