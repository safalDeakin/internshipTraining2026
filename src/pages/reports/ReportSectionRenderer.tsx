import type { ReportSection } from "./types/report";
import ClosingStock from "./sections/ClosingStock";
import DiscountBreakdown from "./sections/DiscountBreakdown";
import DiscountSummary from "./sections/DiscountSummary";
import OfferPerformance from "./sections/OfferPerformance";
import OfferSummary from "./sections/OfferSummary";
import OpeningStock from "./sections/OpeningStock";
import PaymentSummary from "./sections/PaymentSummary";
import ProductSummary from "./sections/ProductSummary";

import SalesSummary from "./sections/SalesSummary";
import ShiftSummary from "./sections/ShiftSummary";
import StockIn from "./sections/StockIn";
import StockOut from "./sections/StockOut";
import TaxBreakdown from "./sections/TaxBreakdown";
import TaxSummary from "./sections/TaxSummary";
import TopProducts from "./sections/TopProducts";

const SECTION_COMPONENTS: any = {
    salesSummary: SalesSummary,
    paymentSummary: PaymentSummary,
    taxSummary: TaxSummary,
    discountSummary: DiscountSummary,
    shiftSummary: ShiftSummary,
    productSummary: ProductSummary,
    topProducts: TopProducts,
    openingStock: OpeningStock,
    stockIn: StockIn,
    stockOut: StockOut,
    closingStock: ClosingStock,
    taxBreakdown: TaxBreakdown,
    offerSummary: OfferSummary,
    offerPerformance: OfferPerformance,
    discountBreakdown: DiscountBreakdown,
};

interface ReportSectionRendererProps {
    section: ReportSection;
}

const ReportSectionRenderer = ({ section }: ReportSectionRendererProps) => {
    const SectionComponent = SECTION_COMPONENTS[section];

    if (!SectionComponent) {
        return null;
    }

    return <SectionComponent />;
};

export default ReportSectionRenderer;