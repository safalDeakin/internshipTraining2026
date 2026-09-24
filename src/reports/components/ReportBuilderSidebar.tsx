import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { ReportBuilderStateHolder } from "../../states/ReportBuilderStateHolder";
import { useReportBuilderState } from "../../hooks/useReportBuilderState";
import type { ReportTemplate } from "../types/report";
import { REPORT_TEMPLATES } from "../../constants/reportTemplates";
import { ALL_REPORT_SECTIONS } from "../../constants/reportSections";

interface ReportBuilderSidebarProps {
    stateHolder: ReportBuilderStateHolder;
}

const ReportBuilderSidebar = ({
    stateHolder,
}: ReportBuilderSidebarProps) => {
    const {
        selectedTemplate,
        selectedSections,
        setTemplate,
        toggleSection,
    } = useReportBuilderState(stateHolder);

    const [isTemplateOpen, setIsTemplateOpen] = useState(false);

    const selectedTemplateLabel =
        REPORT_TEMPLATES.find(
            (template) => template.value === selectedTemplate
        )?.label || "";

    return (
        <aside
            className=" flex h-full min-h-0 w-56 shrink-0 flex-col overflow-x-hidden border-r border-gray-200 bg-gray-50 lg:w-64"
        >

            {/* ================= TEMPLATE ================= */}
            <div className="shrink-0 p-5">

                <label
                    htmlFor="report-template"
                    className="mb-3 block text-sm font-bold text-gray-700"
                >
                    Report Template:
                </label>

                <div className="relative">

                    {/* Selected template */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsTemplateOpen((prev) => !prev)
                        }
                        className="flex w-full min-w-0 items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-700"
                    >
                        <span className="min-w-0 flex-1 truncate">
                            {selectedTemplateLabel}
                        </span>

                        <ChevronDown
                            size={16}
                            className={` shrink-0 text-gray-500 transition-transform duration-200
                                ${isTemplateOpen ? "rotate-180" : ""}
                            `}
                        />
                    </button>

                    {/* Template options */}
                    {isTemplateOpen && (
                        <div
                            className=" absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-x-hidden overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
                        >
                            {REPORT_TEMPLATES.map((template) => (
                                <button
                                    key={template.value}
                                    type="button"
                                    onClick={() => {
                                        setTemplate(
                                            template.value as ReportTemplate
                                        );
                                        setIsTemplateOpen(false);
                                    }}
                                    className=" block w-full min-w-0 truncate px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                    title={template.label}
                                >
                                    {template.label}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </div>


            {/* ================= SECTIONS ================= */}
            <div className="flex min-h-0 flex-1 flex-col">

                {/* Section heading */}
                <div className="shrink-0 px-5 pb-3">
                    <h3 className="text-sm font-bold text-gray-700">
                        Include Sections:
                    </h3>
                </div>

                {/* Scrollable sections */}
                <div
                    className=" min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-5 pb-5"
                >
                    <div className="space-y-1 rounded-md bg-white py-1">

                        {ALL_REPORT_SECTIONS.map((section) => (
                            <label
                                key={section.value}
                                className="flex min-w-0 cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedSections.includes(
                                        section.value
                                    )}
                                    onChange={() =>
                                        toggleSection(section.value)
                                    }
                                    className=" h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300"
                                />

                                <span
                                    className=" min-w-0 flex-1 truncate"
                                    title={section.label}
                                >
                                    {section.label}
                                </span>
                            </label>
                        ))}

                    </div>
                </div>

            </div>

        </aside>
    );
};

export default ReportBuilderSidebar;