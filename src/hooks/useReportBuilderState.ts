import { useSyncExternalStore } from "react";
import { ReportBuilderStateHolder } from "../states/ReportBuilderStateHolder";

export const useReportBuilderState = (stateHolder: ReportBuilderStateHolder) => {
    const state = useSyncExternalStore(
        stateHolder.subscribe,
        stateHolder.getSnapshot
    );

    return {
        ...state,

        setTemplate: stateHolder.setTemplate,
        toggleSection: stateHolder.toggleSection,
        setSections: stateHolder.setSections,

        setPeriod: stateHolder.setPeriod,
        setStartDate: stateHolder.setStartDate,
        setTerminal: stateHolder.setTerminal,
        reorderSections: stateHolder.reorderSections,

        reset: stateHolder.reset,
    };
};