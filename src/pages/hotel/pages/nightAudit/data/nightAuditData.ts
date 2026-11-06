

// STATIC DATA ONLY:
// Replace this object with the NightAuditContext/API response when live data is available.

import type { NightAuditData } from "../../../../../domain/nightAudit";

// The useNightAuditOverview hook is the single hand-off point, so the components do not need to change.
export const nightAuditData: NightAuditData = {
    id: "101",
    pmsShifts: [
        { label: "User Id", value: "Frontdesk01" },
        { label: "Status", value: "Active", accent: "success" },
        { label: "Shift Type", value: "All" },
        { label: "Start Time", value: "8:45am" },
        { label: "Cashier", value: "Tiya" },
        { label: "End Time", value: "3:30pm" },
    ],
    occupancy: [
        { label: "Total Rooms", value: "47" },
        { label: "Occupancy %", value: "68.97%" },
        { label: "Occupied Rooms", value: "30" },
        { label: "Check In", value: "15" },
        { label: "Vacant Room", value: "17" },
        { label: "Check Out", value: "10" },
        { label: "Cancellation", value: "2" },
        { label: "Average Daily Rate", value: "NPR 5,500" },
    ],
    cashBalance: [
        { label: "Opening Cash", value: "23,000" },
        { label: "Net Sale", value: "Rs. 25,900" },
        { label: "Expected Cash", value: "Rs. 30,000" },
        { label: "Closing Cash", value: "—" },
    ],
    revenueRows: [
        {
            id: 1,
            category: "Room Revenue",
            amount: "Rs. 67,804",
            percentage: "61.64%",
        },
        {
            id: 2,
            category: "Restaurant",
            amount: "Rs. 25,594",
            percentage: "20.54%",
        },
        {
            id: 3,
            category: "Bar",
            amount: "Rs. 9,031",
            percentage: "8.21%"
        },
        {
            id: 4,
            category: "Room Service",
            amount: "Rs. 6,170",
            percentage: "5.47%",
        },
        {
            id: 5,
            category: "Laundry",
            amount: "Rs. 2,255",
            percentage: "2.06%"
        },
        {
            id: 6,
            category: "Other",
            amount: "Rs. 2,266",
            percentage: "2.06%"
        },
    ],
    totalVariance: "23000+",
    transactions: [
        { category: "Room Service", forecasted: 145, actual: 165 },
        { category: "Restaurant", forecasted: 140, actual: 120 },
        { category: "Bar", forecasted: 140, actual: 120 },
        { category: "Room Service", forecasted: 210, actual: 180 },
        { category: "Laundry", forecasted: 170, actual: 185 },
    ],
    exceptions: [
        {
            id: 1,
            type: "Overdue Check Out",
            count: 6,
            duration: "5 Hrs",
            priority: "High",
        },
        {
            id: 2,
            type: "Outstanding Folio",
            count: 3,
            duration: "2 hrs",
            priority: "High",
        },
        {
            id: 3,
            type: "Room Booking",
            count: 2,
            duration: "6 hrs",
            priority: "6 hrs",
        },
        {
            id: 4,
            type: "Unbalanced Payment",
            count: 1,
            duration: "14 hrs",
            priority: "20 hrs",
        },
        {
            id: 5,
            type: "Maintenance Pending",
            count: 1,
            duration: "17 hrs",
            priority: "23 hrs",
        },
        {
            id: 6,
            type: "Late Employee",
            count: 1,
            duration: "24 hrs",
            priority: "34 hrs",
        },
    ],
    paymentCollections: [
        { id: 1, name: "Cash", count: 15, amount: "Rs. 60,000" },
        { id: 2, name: "Card", count: 5, amount: "Rs. 25,500" },
        { id: 3, name: "Bank Transfer", count: 5, amount: "Rs. 16,000" },
        { id: 4, name: "Other", count: 6, amount: "Rs. 9,000" },
    ],
    adjustments: [
        { id: 1, name: "Discount", count: 5, amount: "Rs. 6,000" },
        { id: 2, name: "Adjustment", count: 5, amount: "Rs. 2,000" },
        { id: 3, name: "Refund", count: 5, amount: "Rs. 1,000" },
        { id: 4, name: "Void", count: 0, amount: "Rs. 000" },
    ],
    folios: [
        { id: 1, name: "Open Folio", count: 9, amount: "Rs. 8,000" },
        { id: 2, name: "In- House Folio", count: 9, amount: "Rs. 12,000" },
        { id: 3, name: "Check Out Folio", count: 5, amount: "Rs. 12,000" },
        { id: 4, name: "Advance Deposits", count: 6, amount: "Rs. 9,000" },
    ],
}
