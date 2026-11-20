import { useContext } from "react";
import ReportBuilderContext from "./ReportBuilderContext";

export const useReportBuilderHook = () => {
    const context = useContext(ReportBuilderContext);

    if (!context) {
        throw new Error(
            "useReportBuilderHook must be used inside ReportBuilderProvider",
        );
    }

    return context;
};