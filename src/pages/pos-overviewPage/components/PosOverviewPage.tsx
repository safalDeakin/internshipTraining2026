import { CashVariancePanel } from "./CashVariancePanel";
import { CollectionSummary } from "./CollectionSummary";
import { TodaySummary } from "./TodaySummary";

import { usePosOverviewHook } from "../provider/usePosOverview";

const PosOverviewPage = () => {
    const { overview } = usePosOverviewHook();

    if (!overview) {
        return (
            <div className="p-4 text-center text-gray-500">
                No POS Overview Data found
            </div>
        );
    }

    const {
        chartData,
        heatmap,
    } = overview;

    return (
        <main className="min-h-screen bg-[#eef1f3] p-2 text-[#263442] sm:p-4">
            <div className="mx-auto flex max-w-350 flex-col divide-y divide-[#dce3e9] overflow-hidden rounded-sm border border-[#dce3e9] bg-white shadow-[0_2px_12px_rgba(40,58,74,0.08)]">

                <TodaySummary data={overview} />

                <CashVariancePanel
                    chartData={chartData}
                    heatmap={heatmap}
                />
                <CollectionSummary data={overview} />

            </div>
        </main>
    );
};

export default PosOverviewPage;
