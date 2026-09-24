import type { ReportTemplate } from "../types/report";

import SaleReport from "./template/SaleReport";
import ShiftReport from "./template/ShiftReport";
import ProductsPerformanceReport from "./template/ProductsPerformanceReport";
import StockMovementReport from "./template/StockMovementReport";
import TaxReport from "./template/TaxReport";
import CompiledReport from "./template/CompiledReport";
import OfferReport from "./template/OfferReport";
import DiscountReport from "./template/DiscountReport";

interface ReportTemplateRendererProps {
    template: ReportTemplate;
}

const ReportTemplateRenderer = ({ template }: ReportTemplateRendererProps) => {
    switch (template) {
        case "sale":
            return <SaleReport />;

        case "shift":
            return <ShiftReport />;

        case "products-performance":
            return <ProductsPerformanceReport />;

        case "stock-movement":
            return <StockMovementReport />;

        case "tax":
            return <TaxReport />;

        case "compiled":
            return <CompiledReport />;

        case "offer":
            return <OfferReport />;

        case "discount":
            return <DiscountReport />;

        default:
            return null;
    }
};

export default ReportTemplateRenderer;