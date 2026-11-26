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

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer Per Day" },
      { label: "Daily Limit", value: "100" },
      { label: "Campaign Limit", value: "500" },
      { label: "Customer Limit", value: "Unlimited" },
      { label: "Total Usage", value: "125 / 500" },
    ],

    applicableItems: [
      {
        id: "AI-001",
        productId: "P-001",
        itemName: "Chicken Mo:Mo",
        category: "Food",
        minQtyOrder: 2,
        cashBackPercent: 20,
        cashBackAmount: 100,
      },
      {
        id: "AI-002",
        productId: "P-002",
        itemName: "Veg Mo:Mo",
        category: "Food",
        minQtyOrder: 2,
        cashBackPercent: 15,
        cashBackAmount: 75,
      },
      {
        id: "AI-003",
        productId: "P-003",
        itemName: "Coke",
        category: "Beverages",
        minQtyOrder: 1,
        cashBackPercent: 10,
        cashBackAmount: 30,
      },
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

    usageLimits: [
      { label: "Usage Type", value: "Once Per Transaction" },
      { label: "Daily Limit", value: "200" },
      { label: "Campaign Limit", value: "1,000" },
      { label: "Customer Limit", value: "3 Times" },
      { label: "Total Usage", value: "340 / 1,000" },
    ],

    applicableItems: [
      {
        id: "AI-004",
        productId: "P-004",
        itemName: "Chicken Biryani",
        category: "Food",
        minQtyOrder: 3,
        cashBackPercent: 20,
        cashBackAmount: 200,
      },
      {
        id: "AI-005",
        productId: "P-005",
        itemName: "Paneer Butter Masala",
        category: "Food",
        minQtyOrder: 2,
        cashBackPercent: 15,
        cashBackAmount: 150,
      },
      {
        id: "AI-006",
        productId: "P-006",
        itemName: "Mango Lassi",
        category: "Beverages",
        minQtyOrder: 2,
        cashBackPercent: 10,
        cashBackAmount: 50,
      },
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

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer Per Day" },
      { label: "Daily Limit", value: "150" },
      { label: "Campaign Limit", value: "2,000" },
      { label: "Customer Limit", value: "Unlimited" },
      { label: "Total Usage", value: "210 / 2,000" },
    ],

    applicableItems: [
      {
        id: "AI-007",
        productId: "P-007",
        itemName: "Chicken Pizza",
        category: "Food",
        minQtyOrder: 1,
        cashBackPercent: 15,
        cashBackAmount: 120,
      },
      {
        id: "AI-008",
        productId: "P-008",
        itemName: "French Fries",
        category: "Snacks",
        minQtyOrder: 2,
        cashBackPercent: 10,
        cashBackAmount: 50,
      },
      {
        id: "AI-009",
        productId: "P-009",
        itemName: "Mojito",
        category: "Beverages",
        minQtyOrder: 1,
        cashBackPercent: 15,
        cashBackAmount: 60,
      },
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

    usageLimits: [
      { label: "Usage Type", value: "Once Per Customer" },
      { label: "Daily Limit", value: "50" },
      { label: "Campaign Limit", value: "300" },
      { label: "Customer Limit", value: "1 Time" },
      { label: "Total Usage", value: "95 / 300" },
    ],

    applicableItems: [
      {
        id: "AI-010",
        productId: "P-010",
        itemName: "Coke",
        category: "Beverages",
        minQtyOrder: 1,
        cashBackPercent: 0,
        cashBackAmount: 100,
      },
      {
        id: "AI-011",
        productId: "P-011",
        itemName: "Fresh Lime Soda",
        category: "Beverages",
        minQtyOrder: 2,
        cashBackPercent: 0,
        cashBackAmount: 80,
      },
      {
        id: "AI-012",
        productId: "P-012",
        itemName: "Chocolate Brownie",
        category: "Desserts",
        minQtyOrder: 1,
        cashBackPercent: 0,
        cashBackAmount: 150,
      },
    ],
  },
];
