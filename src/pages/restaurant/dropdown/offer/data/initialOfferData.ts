import type { OfferType } from "../../types/DropdownTypes";

// author: shrajja
export const initialOfferData: OfferType[] = [
  // 1. New Year Special
  {
    id: 1,
    name: "2025-New Special",
    code: "OFF#1211",

    leftInfo: [
      { label: "Offer Name", value: "2025-New Special" },
      { label: "Offer Code", value: "OFF#1211" },
      { label: "Campaign", value: "New Year Campaign" },
      { label: "Offer Type", value: "Percentage Discount" },
      { label: "Discount Value", value: "20%" },
      { label: "Status", value: "Active" },
      { label: "Effective Period", value: "2083/01/01 To 2083/02/01" },
      { label: "Applicable Days", value: "Sunday - Friday" },
      { label: "Applicable Time", value: "10:00 AM - 9:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 2,000" },
      { label: "Customer Group", value: "All Customers" },
      { label: "Minimum Purchase", value: "NPR 1,000" },
      { label: "Minimum Quantity", value: "2 Items" },
      { label: "Applicable Products", value: "All Products" },
      { label: "Created By", value: "Admin" },
    ],

    posShifts: [
      [
        { label: "Active", value: 12 },
        { label: "Pending", value: 3 },
        { label: "Closed and Approved", value: 9 },
      ],
      [
        { label: "Terminal Online", value: 5 },
        { label: "Total Staffs", value: 15 },
        { label: "Total Hours", value: 10 },
      ],
    ],

    sales: [
      [
        { label: "Total Item Sold", value: 125 },
        { label: "Net Sales", value: "Rs. 30,000" },
        { label: "Total Collected", value: "Rs. 24,000" },
      ],
      [
        { label: "Gross Sale", value: "Rs. 35,000" },
        { label: "Total Tax", value: "Rs. 5,000" },
        { label: "Total Discounts", value: "Rs. 1,000" },
      ],
    ],

    shortcuts: [
      { label: "Record Unavailability", color: "bg-red-500" },
      { label: "Run POS", color: "bg-blue-500" },
      { label: "Record Expenses", color: "bg-green-500" },
      { label: "View Pending Approval", color: "bg-orange-400" },
    ],

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer Per Day" },
      { label: "Daily Limit", value: "100" },
      { label: "Campaign Limit", value: "500" },
      { label: "Customer Limit", value: "Unlimited" },
      { label: "Total Usage", value: "125 / 500" },
    ],
  },

  // 2. Dashain Special
  {
    id: 2,
    name: "Dashain Special",
    code: "OFF#1212",

    leftInfo: [
      { label: "Offer Name", value: "Dashain Special" },
      { label: "Offer Code", value: "OFF#1212" },
      { label: "Campaign", value: "Dashain Festival Campaign" },
      { label: "Offer Type", value: "Flat Discount" },
      { label: "Discount Value", value: "NPR 500" },
      { label: "Status", value: "Active" },
      { label: "Effective Period", value: "2083/06/01 To 2083/06/30" },
      { label: "Applicable Days", value: "All Days" },
      { label: "Applicable Time", value: "9:00 AM - 10:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 500" },
      { label: "Customer Group", value: "Registered Customers" },
      { label: "Minimum Purchase", value: "NPR 2,500" },
      { label: "Minimum Quantity", value: "3 Items" },
      { label: "Applicable Products", value: "Food and Beverages" },
      { label: "Created By", value: "Restaurant Manager" },
    ],

    posShifts: [
      [
        { label: "Active", value: 18 },
        { label: "Pending", value: 5 },
        { label: "Closed and Approved", value: 14 },
      ],
      [
        { label: "Terminal Online", value: 8 },
        { label: "Total Staffs", value: 22 },
        { label: "Total Hours", value: 16 },
      ],
    ],

    sales: [
      [
        { label: "Total Item Sold", value: 340 },
        { label: "Net Sales", value: "Rs. 85,000" },
        { label: "Total Collected", value: "Rs. 78,000" },
      ],
      [
        { label: "Gross Sale", value: "Rs. 95,000" },
        { label: "Total Tax", value: "Rs. 10,000" },
        { label: "Total Discounts", value: "Rs. 7,000" },
      ],
    ],

    shortcuts: [
      { label: "Record Unavailability", color: "bg-red-500" },
      { label: "Run POS", color: "bg-blue-500" },
      { label: "Record Expenses", color: "bg-green-500" },
      { label: "View Pending Approval", color: "bg-orange-400" },
    ],

    usageLimits: [
      { label: "Usage Type", value: "Once Per Transaction" },
      { label: "Daily Limit", value: "200" },
      { label: "Campaign Limit", value: "1,000" },
      { label: "Customer Limit", value: "3 Times" },
      { label: "Total Usage", value: "340 / 1,000" },
    ],
  },

  // 3. Weekend Discount
  {
    id: 3,
    name: "Weekend Discount",
    code: "OFF#1213",

    leftInfo: [
      { label: "Offer Name", value: "Weekend Discount" },
      { label: "Offer Code", value: "OFF#1213" },
      { label: "Campaign", value: "Weekend Campaign" },
      { label: "Offer Type", value: "Percentage Discount" },
      { label: "Discount Value", value: "15%" },
      { label: "Status", value: "Active" },
      { label: "Effective Period", value: "2083/02/01 To 2083/12/30" },
      { label: "Applicable Days", value: "Saturday, Sunday" },
      { label: "Applicable Time", value: "7:00 AM - 8:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 1,500" },
      { label: "Customer Group", value: "All Customers" },
      { label: "Minimum Purchase", value: "NPR 800" },
      { label: "Minimum Quantity", value: "2 Items" },
      { label: "Applicable Products", value: "Selected Products" },
      { label: "Created By", value: "Admin" },
    ],

    posShifts: [
      [
        { label: "Active", value: 8 },
        { label: "Pending", value: 2 },
        { label: "Closed and Approved", value: 6 },
      ],
      [
        { label: "Terminal Online", value: 4 },
        { label: "Total Staffs", value: 10 },
        { label: "Total Hours", value: 8 },
      ],
    ],

    sales: [
      [
        { label: "Total Item Sold", value: 210 },
        { label: "Net Sales", value: "Rs. 42,000" },
        { label: "Total Collected", value: "Rs. 38,000" },
      ],
      [
        { label: "Gross Sale", value: "Rs. 48,000" },
        { label: "Total Tax", value: "Rs. 6,000" },
        { label: "Total Discounts", value: "Rs. 6,000" },
      ],
    ],

    shortcuts: [
      { label: "Record Unavailability", color: "bg-red-500" },
      { label: "Run POS", color: "bg-blue-500" },
      { label: "Record Expenses", color: "bg-green-500" },
      { label: "View Pending Approval", color: "bg-orange-400" },
    ],

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer Per Day" },
      { label: "Daily Limit", value: "150" },
      { label: "Campaign Limit", value: "2,000" },
      { label: "Customer Limit", value: "Unlimited" },
      { label: "Total Usage", value: "210 / 2,000" },
    ],
  },

  // 4. Festival Offer
  {
    id: 4,
    name: "Festival Offer",
    code: "OFF#1214",

    leftInfo: [
      { label: "Offer Name", value: "Festival Offer" },
      { label: "Offer Code", value: "OFF#1214" },
      { label: "Campaign", value: "Annual Festival Campaign" },
      { label: "Offer Type", value: "Buy One Get One" },
      { label: "Discount Value", value: "Buy 1 Get 1 Free" },
      { label: "Status", value: "Inactive" },
      { label: "Effective Period", value: "2083/07/01 To 2083/07/15" },
      { label: "Applicable Days", value: "All Days" },
      { label: "Applicable Time", value: "11:00 AM - 9:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 1,000" },
      { label: "Customer Group", value: "VIP Customers" },
      { label: "Minimum Purchase", value: "NPR 500" },
      { label: "Minimum Quantity", value: "2 Items" },
      { label: "Applicable Products", value: "Selected Beverages" },
      { label: "Created By", value: "System Admin" },
    ],

    posShifts: [
      [
        { label: "Active", value: 0 },
        { label: "Pending", value: 0 },
        { label: "Closed and Approved", value: 12 },
      ],
      [
        { label: "Terminal Online", value: 0 },
        { label: "Total Staffs", value: 8 },
        { label: "Total Hours", value: 0 },
      ],
    ],

    sales: [
      [
        { label: "Total Item Sold", value: 95 },
        { label: "Net Sales", value: "Rs. 19,000" },
        { label: "Total Collected", value: "Rs. 18,000" },
      ],
      [
        { label: "Gross Sale", value: "Rs. 22,000" },
        { label: "Total Tax", value: "Rs. 3,000" },
        { label: "Total Discounts", value: "Rs. 3,000" },
      ],
    ],

    shortcuts: [
      { label: "Record Unavailability", color: "bg-red-500" },
      { label: "Run POS", color: "bg-blue-500" },
      { label: "Record Expenses", color: "bg-green-500" },
      { label: "View Pending Approval", color: "bg-orange-400" },
    ],

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer" },
      { label: "Daily Limit", value: "50" },
      { label: "Campaign Limit", value: "300" },
      { label: "Customer Limit", value: "1 Time" },
      { label: "Total Usage", value: "95 / 300" },
    ],
  },
];
