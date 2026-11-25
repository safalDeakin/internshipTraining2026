import type { OfferType } from "../../types/DropdownTypes";

export const initialOfferData: OfferType[] = [
  {
    id: 1,
    name: "Weekend Special Offer",
    code: "OFF#12111",

    leftInfo: [
      { label: "Offer Name", value: "Weekend Special Offer" },
      { label: "Offer Code", value: "OFF#12111" },
      { label: "Campaign", value: "Weekend Campaign" },
      { label: "Offer Type", value: "Percentage Discount" },
      { label: "Status", value: "Active" },
      {
        label: "Effective Period",
        value: "2083/02/01 To 2083/03/01",
      },
      { label: "Applicable Days", value: "Saturday, Sunday" },
      { label: "Applicable Time", value: "7:00 AM - 8:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 2,000" },
      { label: "Customer Group", value: "All Customer" },
      { label: "Minimum Quantity", value: 2 },
    ],

    usageLimits: [
      {
        label: "Usage Type",
        value: "Once Per Customer Per Day",
      },
      { label: "Daily Limit", value: 100 },
      { label: "Campaign Limit", value: 250 },
      { label: "Customer Limit", value: "Unlimited" },
    ],

    applicableItems: [
      {
        id: 1,
        itemName: "Pizza - Margherita",
        category: "Pizza-Food",
        minQtyOrder: 2,
        cashBackPercent: 10,
        cashBackAmount: 50,
      },
      {
        id: 2,
        itemName: "Pizza - Margherita",
        category: "Pizza-Food",
        minQtyOrder: 2,
        cashBackPercent: 10,
        cashBackAmount: 50,
      },
      {
        id: 3,
        itemName: "Pizza - Margherita",
        category: "Pizza-Food",
        minQtyOrder: 2,
        cashBackPercent: 10,
        cashBackAmount: 50,
      },
    ],
  },

  {
    id: 2,
    name: "Dashain Special",
    code: "OFF#12112",

    leftInfo: [
      { label: "Offer Name", value: "Dashain Special" },
      { label: "Offer Code", value: "OFF#12112" },
      { label: "Campaign", value: "Dashain Festival Campaign" },
      { label: "Offer Type", value: "Flat Discount" },
      { label: "Status", value: "Active" },
      {
        label: "Effective Period",
        value: "2083/06/01 To 2083/06/30",
      },
      { label: "Applicable Days", value: "All Days" },
      { label: "Applicable Time", value: "9:00 AM - 10:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 500" },
      { label: "Customer Group", value: "Registered Customers" },
      { label: "Minimum Quantity", value: 3 },
    ],

    usageLimits: [
      { label: "Usage Type", value: "Once Per Transaction" },
      { label: "Daily Limit", value: 200 },
      { label: "Campaign Limit", value: 1000 },
      { label: "Customer Limit", value: "3 Times" },
    ],

    applicableItems: [
      {
        id: 1,
        itemName: "Chicken Mo:Mo",
        category: "Food",
        minQtyOrder: 3,
        cashBackPercent: 5,
        cashBackAmount: 100,
      },
      {
        id: 2,
        itemName: "Veg Mo:Mo",
        category: "Food",
        minQtyOrder: 3,
        cashBackPercent: 5,
        cashBackAmount: 100,
      },
    ],
  },

  {
    id: 3,
    name: "Weekend Discount",
    code: "OFF#12113",

    leftInfo: [
      { label: "Offer Name", value: "Weekend Discount" },
      { label: "Offer Code", value: "OFF#12113" },
      { label: "Campaign", value: "Weekend Campaign" },
      { label: "Offer Type", value: "Percentage Discount" },
      { label: "Status", value: "Active" },
      {
        label: "Effective Period",
        value: "2083/02/01 To 2083/12/30",
      },
      { label: "Applicable Days", value: "Saturday, Sunday" },
      { label: "Applicable Time", value: "7:00 AM - 8:00 PM" },
    ],

    rightInfo: [
      { label: "Maximum Discount", value: "NPR 1,500" },
      { label: "Customer Group", value: "All Customers" },
      { label: "Minimum Quantity", value: 2 },
    ],

    usageLimits: [
      {
        label: "Usage Type",
        value: "Once Per Customer Per Day",
      },
      { label: "Daily Limit", value: 150 },
      { label: "Campaign Limit", value: 2000 },
      { label: "Customer Limit", value: "Unlimited" },
    ],

    applicableItems: [
      {
        id: 1,
        itemName: "Burger",
        category: "Fast Food",
        minQtyOrder: 2,
        cashBackPercent: 15,
        cashBackAmount: 75,
      },
      {
        id: 2,
        itemName: "Pizza",
        category: "Food",
        minQtyOrder: 2,
        cashBackPercent: 15,
        cashBackAmount: 100,
      },
    ],
  },
];
