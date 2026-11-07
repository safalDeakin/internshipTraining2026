

// STATIC DATA ONLY:
// Replace this object with the NightAuditContext/API response when live data is available.

import type { OverviewData } from "../types/overview.tyes";



// The useNightAuditOverview hook is the single hand-off point, so the components do not need to change.
export const overviewData: OverviewData = {
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
    overview: [
        { label: "Check In", value: "28" },
        { label: "Room Revenue", value: "Rs. 25,900" },
        { label: "Check Out", value: "22" },
        { label: "Package Revenue", value: "Rs. 55,000" },
        { label: "Stayovers", value: "7" },
        { label: "Other Revenue", value: "Rs. 24,000" },
    ],
    overview2: [
        { label: "Advance Deposits", value: "Rs. 23,000" },
        { label: "Open Folio", value: "5" },
        { label: "Cancellation", value: "-----" },
        { label: "Outstanding Amount", value: "Rs. 45,000" },
        { label: "Refunds", value: "Rs. 3,000" },
        { label: "Total Folios", value: "47" },
    ],
    overviewRows: [
        {
            id: 1,
            department: "Room",
            roomrevenue: "Rs. 1,50,000",
            foodandbeverage: "2000",
            laundry: "2000",
            otherservice: "2000",
            totalrevenue: "140"
        },
        {
            id: 2,
            department: "Restuarant",
            roomrevenue: "0",
            foodandbeverage: "2000",
            laundry: "2000",
            otherservice: "2000",
            totalrevenue: "140"
        },
        {
            id: 3,
            department: "Bar",
            roomrevenue: "0",
            foodandbeverage: "2000",
            laundry: "2000",
            otherservice: "2000",
            totalrevenue: "140"
        },
        {
            id: 4,
            department: "Laundry",
            roomrevenue: "0",
            foodandbeverage: "2000",
            laundry: "2000",
            otherservice: "2000",
            totalrevenue: "140"
        },
        {
            id: 5,
            department: "Credit Sale(AR)",
            roomrevenue: "0",
            foodandbeverage: "2000",
            laundry: "2000",
            otherservice: "2000",
            totalrevenue: "140"
        },
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
        { category: "Tiya Piya", forecasted: 145, actual: 165 },
        { category: "Prabin Doe", forecasted: 140, actual: 120 },
        { category: "John Shrestha", forecasted: 140, actual: 120 },
        { category: "Electronics", forecasted: 210, actual: 180 },
        { category: "Furniture", forecasted: 170, actual: 185 },
    ],
    exceptions: [
        {
            id: 1,
            type: "Room Not Ready",
            count: 2,
            duration: "5 Hrs",
            priority: "High",
        },
        {
            id: 2,
            type: "Maintenance",
            count: 3,
            duration: "2 hrs",
            priority: "High",
        },
        {
            id: 3,
            type: "Pending Guest Request",
            count: 2,
            duration: "6 hrs",
            priority: "6 hrs",
        },
        {
            id: 4,
            type: "Late Check Out",
            count: 1,
            duration: "14 hrs",
            priority: "20 hrs",
        },
        {
            id: 5,
            type: "Room Move",
            count: 1,
            duration: "17 hrs",
            priority: "23 hrs",
        },
        {
            id: 6,
            type: "Large Refunds",
            count: 1,
            duration: "24 hrs",
            priority: "34 hrs",
        },
        {
            id: 7,
            type: "Cash Mismatch",
            count: 1,
            duration: "24 hrs",
            priority: "34 hrs",
        },
        {
            id: 8,
            type: "Pending Approvals",
            count: 1,
            duration: "24 hrs",
            priority: "34 hrs",
        },
        {
            id: 9,
            type: "High Discounts",
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
