import type {
    ReportSection,
    ReportTemplate,
} from "../reports/types/report";

export const REPORT_SECTIONS: Record<ReportTemplate,
    {
        value: ReportSection;
        label: string;
    }[]
> = {
    sale: [
        {
            value: "salesSummary",
            label: "Sales Summary",
        },
        {
            value: "paymentSummary",
            label: "Payment Summary",
        },
        {
            value: "taxSummary",
            label: "Tax Summary",
        },
        {
            value: "discountSummary",
            label: "Discount Summary",
        },
    ],

    shift: [
        {
            value: "shiftSummary",
            label: "Shift Summary",
        },
        {
            value: "salesSummary",
            label: "Sales Summary",
        },
        {
            value: "paymentSummary",
            label: "Payment Summary",
        },
    ],

    "products-performance": [
        {
            value: "productSummary",
            label: "Product Summary",
        },
        {
            value: "topProducts",
            label: "Top Products",
        },
    ],

    "stock-movement": [
        {
            value: "openingStock",
            label: "Opening Stock",
        },
        {
            value: "stockIn",
            label: "Stock In",
        },
        {
            value: "stockOut",
            label: "Stock Out",
        },
        {
            value: "closingStock",
            label: "Closing Stock",
        },
    ],

    tax: [
        {
            value: "taxSummary",
            label: "Tax Summary",
        },
        {
            value: "taxBreakdown",
            label: "Tax Breakdown",
        },
    ],

    compiled: [
        {
            value: "salesSummary",
            label: "Sales Summary",
        },
        {
            value: "paymentSummary",
            label: "Payment Summary",
        },
        {
            value: "taxSummary",
            label: "Tax Summary",
        },
    ],

    offer: [
        {
            value: "offerSummary",
            label: "Offer Summary",
        },
        {
            value: "offerPerformance",
            label: "Offer Performance",
        },
    ],

    discount: [
        {
            value: "discountSummary",
            label: "Discount Summary",
        },
        {
            value: "discountBreakdown",
            label: "Discount Breakdown",
        },
    ],
};





export const ALL_REPORT_SECTIONS: {
    value: ReportSection;
    label: string;
}[] = [
        {
            value: "salesSummary",
            label: "Sales Summary"
        },
        {
            value: "paymentSummary",
            label: "Payment Summary"
        },
        {
            value: "taxSummary",
            label: "Tax Summary"
        },
        {
            value: "discountSummary",
            label: "Discount Summary"
        },

        {
            value: "shiftSummary",
            label: "Shift Summary"
        },

        {
            value: "productSummary",
            label: "Product Summary"
        },
        {
            value: "topProducts",
            label: "Top Products"
        },

        {
            value: "openingStock",
            label: "Opening Stock"
        },
        {
            value: "stockIn",
            label: "Stock In"
        },
        {
            value: "stockOut",
            label: "Stock Out"
        },
        {
            value: "closingStock",
            label: "Closing Stock"
        },

        {
            value: "taxBreakdown",
            label: "Tax Breakdown"
        },

        {
            value: "offerSummary",
            label: "Offer Summary"
        },
        {
            value: "offerPerformance",
            label: "Offer Performance"
        },

        {
            value: "discountBreakdown",
            label: "Discount Breakdown"
        },
    ];