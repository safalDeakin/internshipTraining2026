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



// Sale report 
// Shift report 
// Products performance report 
// Stock movement report 
// Tax report 
// Compiled report
// Offer report 
// Discount report