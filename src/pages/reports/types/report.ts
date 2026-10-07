export type ReportTemplate =
    | "sale"
    | "shift"
    | "products-performance"
    | "stock-movement"
    | "tax"
    | "compiled"
    | "offer"
    | "discount";


export type ReportSection =
    | "salesSummary"
    | "paymentSummary"
    | "taxSummary"
    | "discountSummary"
    | "shiftSummary"
    | "productSummary"
    | "topProducts"
    | "openingStock"
    | "stockIn"
    | "stockOut"
    | "closingStock"
    | "taxBreakdown"
    | "offerSummary"
    | "offerPerformance"
    | "discountBreakdown";


export interface ReportBuilderSnapshot {
    selectedTemplate: ReportTemplate;
    selectedSections: ReportSection[]


    period: string;
    startDate: string;
    terminal: string;
}