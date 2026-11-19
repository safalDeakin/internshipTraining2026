import type { ReportBuilder } from "../../../domain/ReportBuilder";

export const ReportBuilderData: ReportBuilder = {
    id: "Report-builder-01",

    salesSummary: [
        {
            label: "Total Sales",
            value: 125000,
        },
        {
            label: "Net Sales",
            value: 118500,
        },
    ],

    paymentSummary: [
        {
            method: "Cash",
            count: 42,
            amount: 52000,
        },
        {
            method: "Card",
            count: 31,
            amount: 41000,
        },
        {
            method: "Online",
            count: 18,
            amount: 25500,
        },
    ],

    taxSummary: [
        {
            taxName: "VAT",
            percentage: 13,
            amount: 15350,
        },
    ],

    discountSummary: [
        {
            type: "Member Discount",
            count: 18,
            amount: 5400,
            percentage: 40,
        },
        {
            type: "Seasonal Discount",
            count: 12,
            amount: 3600,
            percentage: 27,
        },
        {
            type: "Offer Discount",
            count: 15,
            amount: 4500,
            percentage: 33,
        },
    ],

    shiftSummary: [],

    productSummary: [
        {
            productName: "Mineral Water",
            sku: "MW-001",
            quantity: 42,
            revenue: 2100,
        },
        {
            productName: "Coffee",
            sku: "CF-002",
            quantity: 18,
            revenue: 5400,
        },
    ],

    topProducts: [
        {
            productName: "Coffee",
            sku: "CF-002",
            quantity: 18,
            revenue: 5400,
        },
    ],

    openingStock: [
        {
            productName: "Mineral Water",
            sku: "MW-001",
            quantity: 50,
            unit: "pcs",
            value: 2500,
        },
    ],

    stockIn: [
        {
            productName: "Mineral Water",
            sku: "MW-001",
            quantity: 20,
            unit: "pcs",
            value: 1000,
        },
    ],

    stockOut: [
        {
            productName: "Mineral Water",
            sku: "MW-001",
            quantity: 28,
            unit: "pcs",
            value: 1400,
        },
    ],

    closingStock: [
        {
            productName: "Mineral Water",
            sku: "MW-001",
            quantity: 42,
            unit: "pcs",
            value: 2100,
        },
        {
            productName: "Coffee",
            sku: "CF-002",
            quantity: 18,
            unit: "packs",
            value: 5400,
        },
        {
            productName: "Green Tea",
            sku: "GT-003",
            quantity: 25,
            unit: "packs",
            value: 3750,
        },
    ],

    taxBreakdown: [
        {
            taxName: "VAT",
            percentage: 13,
            amount: 15350,
        },
    ],

    offerSummary: [],

    offerPerformance: [
        {
            offerName: "Weekend Special",
            code: "WEEKEND20",
            usage: 84,
            revenue: 68400,
            conversionRate: 18.5,
        },
        {
            offerName: "Member Offer",
            code: "MEMBER10",
            usage: 67,
            revenue: 52300,
            conversionRate: 15.2,
        },
        {
            offerName: "New Customer",
            code: "WELCOME15",
            usage: 41,
            revenue: 28700,
            conversionRate: 12.8,
        },
    ],

    discountBreakdown: [
        {
            type: "Member Discount",
            count: 18,
            amount: 5400,
            percentage: 40,
        },
        {
            type: "Seasonal Discount",
            count: 12,
            amount: 3600,
            percentage: 27,
        },
        {
            type: "Offer Discount",
            count: 15,
            amount: 4500,
            percentage: 33,
        },
    ],
};