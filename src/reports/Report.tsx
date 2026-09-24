import { useMemo, useState } from "react";

import ReportBuilderSidebar from "./components/ReportBuilderSidebar";
import ReportTemplateRenderer from "./ReportTemplateRenderer";
import ReportSectionRenderer from "./ReportSectionRenderer";
import ReportFilters from "./ReportFilters";

import { ReportBuilderStateHolder } from "../states/ReportBuilderStateHolder";
import { useReportBuilderState } from "../hooks/useReportBuilderState";

import { exportReportToCSV } from "./reportExport";

const Report = () => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const reportBuilderState = useMemo(
        () => new ReportBuilderStateHolder(),
        []
    );

    const {
        selectedTemplate,
        selectedSections,
        period,
        startDate,
        terminal,
        setPeriod,
        setStartDate,
        setTerminal,
        reorderSections,
    } = useReportBuilderState(reportBuilderState);

    const handleExportCSV = () => {
        const data = selectedSections.map((section) => ({
            Template: selectedTemplate,
            Section: section,
            Period: period,
            StartDate: startDate || "All",
            Terminal: terminal || "All",
        }));

        exportReportToCSV(data);
    };

    const handlePrint = () => {
        window.print();
    };


    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (
        e: React.DragEvent<HTMLDivElement>,
        targetIndex: number
    ) => {
        e.preventDefault();

        if (
            draggedIndex === null ||
            draggedIndex === targetIndex
        ) {
            return;
        }

        reorderSections(draggedIndex, targetIndex);

        setDraggedIndex(targetIndex);
    };

    const handleDrop = () => {
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col overflow-hidden bg-gray-50">

            {/* REPORT TOOLBAR */}
            <header className="z-30 shrink-0 border-b border-gray-200 bg-white">
                <div className="flex min-h-14">

                    {/* Report Builder title */}
                    <div className="hidden w-56 shrink-0 items-center border-r border-gray-200 px-4 sm:flex lg:w-64">
                        <span className="text-sm font-bold text-blue-600">
                            📄 Report Builder
                        </span>
                    </div>

                    {/* Filters */}
                    <div className="min-w-0 flex-1 px-4 py-2">
                        <ReportFilters
                            period={period}
                            startDate={startDate}
                            terminal={terminal}
                            onPeriodChange={setPeriod}
                            onStartDateChange={setStartDate}
                            onTerminalChange={setTerminal}
                            onExportCSV={handleExportCSV}
                            onPrint={handlePrint}
                        />
                    </div>

                </div>
            </header>


            {/* REPORT WORKSPACE */}
            <div className="flex min-h-0 flex-1">

                {/* SIDEBAR */}
                <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-gray-200 bg-white sm:block lg:w-64">
                    <ReportBuilderSidebar stateHolder={reportBuilderState} />
                </aside>


                {/* REPORT CONTENT */}
                <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50">

                    <div className="p-6 lg:p-8">

                        <div
                            id="printable-report"
                            className="mx-auto w-full max-w-212.5 bg-white shadow-sm"
                        >

                            <ReportTemplateRenderer
                                template={selectedTemplate}
                            />

                            <div className="space-y-4 p-6">

                                {selectedSections.map((section, index) => {

                                    const isDragging =
                                        draggedIndex === index;

                                    return (
                                        <div
                                            key={section}
                                            draggable
                                            onDragStart={() =>
                                                handleDragStart(index)
                                            }
                                            onDragOver={(e) =>
                                                handleDragOver(e, index)
                                            }
                                            onDrop={handleDrop}
                                            onDragEnd={handleDragEnd}
                                            className={` group cursor-grab rounded-lg transition-all duration-200 ease-out active:cursor-grabbing
                                            ${isDragging
                                                    ? "scale-[0.98] opacity-50 shadow-lg"
                                                    : "opacity-100"
                                                }
                                        `}
                                        >
                                            <ReportSectionRenderer
                                                section={section}
                                            />
                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default Report;