import { useState } from "react";
import { ChecklistCards } from "./ChecklistCards";
import { Header } from "./Header";
import { ReconciliationTable } from "./ReconciliationTable";
import { SummaryCards } from "./SummaryCards";
import type { Building } from "../../../../../domain/dayActivity";
import { PrintDayActivity } from "./PrintDayActivity";
import "../styles/print.css";


type DashboardProps = {
    building: Building;
};

export function Dashboard({ building }: DashboardProps) {
    const [remark, setRemark] = useState("");

    return (
        <div className="min-h-screen bg-[#f7f8f9] text-[#303a40]">
            <Header building={building} />

            <div className="flex min-h-[calc(100vh-49px)] flex-col md:flex-row">
                <main className="min-w-0 flex-1 p-3 sm:p-5 md:p-7 md:pl-9">
                    <div className="mx-auto max-w-222.5 space-y-3">

                        <SummaryCards
                            items={building.summaryItems}
                        />

                        <ChecklistCards
                            checklists={building.checklists}
                        />

                        <ReconciliationTable
                            title="Payment Reconciliation"
                            rows={building.paymentRows}
                            showDifference
                        />

                        <ReconciliationTable
                            title="Room Revenue Verification"
                            rows={building.revenueRows}
                        />

                        <section className="px-1">
                            <label
                                htmlFor="remark"
                                className="mb-1.5 block text-[10px] font-semibold text-[#222b30]"
                            >
                                Remark
                            </label>

                            <input
                                id="remark"
                                value={remark}
                                onChange={(event) => setRemark(event.target.value)}
                                placeholder="enter"
                                className="h-5 w-full border border-[#d9dddf] bg-white px-2 text-[9px] outline-none placeholder:text-[#adb3b6] focus:border-[#6c9bc4]"
                            />

                            <button
                                type="button"
                                className="mt-2.5 h-7 min-w-17.25 border border-[#4d79a5] bg-[#5b88b5] px-5 text-[10px] text-white shadow-[0_1px_1px_rgba(0,0,0,.12)] hover:bg-[#4f7ca8]"
                            >
                                Save
                            </button>
                        </section>
                    </div>
                </main>
            </div>
            <PrintDayActivity building={building} />
        </div>
    );
}