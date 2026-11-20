
export interface StockItem {
    productName: string;
    sku: string;
    quantity: number;
    unit: string;
    value: number;
}

export interface DiscountItem {
    type: string;
    count: number;
    amount: number;
    percentage: number;
}

export interface OfferPerformanceItem {
    offerName: string;
    code: string;
    usage: number;
    revenue: number;
    conversionRate: number;
}

export interface SalesSummaryItem {
    label: string;
    value: number;
}

export interface PaymentSummaryItem {
    method: string;
    count: number;
    amount: number;
}

export interface TaxBreakdownItem {
    taxName: string;
    percentage: number;
    amount: number;
}

export interface ProductPerformanceItem {
    productName: string;
    sku: string;
    quantity: number;
    revenue: number;
}


export interface ReportBuilder {
    id: string
    salesSummary: SalesSummaryItem[];
    paymentSummary: PaymentSummaryItem[];
    taxSummary: TaxBreakdownItem[];
    discountSummary: DiscountItem[];

    shiftSummary: unknown[];

    productSummary: ProductPerformanceItem[];
    topProducts: ProductPerformanceItem[];

    openingStock: StockItem[];
    stockIn: StockItem[];
    stockOut: StockItem[];
    closingStock: StockItem[];

    taxBreakdown: TaxBreakdownItem[];

    offerSummary: unknown[];
    offerPerformance: OfferPerformanceItem[];

    discountBreakdown: DiscountItem[];
}