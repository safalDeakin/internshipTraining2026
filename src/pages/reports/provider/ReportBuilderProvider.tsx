import {
    useCallback,
    useMemo,
    type ReactNode,
} from "react";

import { useSubscription } from "../../../application/useSubscription";
import {
    ReportBuilderCmdService,
    ReportBuilderQueryService,
} from "../../../application/services";

import ReportBuilderContext from "./ReportBuilderContext";

import type { ReportBuilder } from "../../../domain/ReportBuilder";
import { useReportBuilderState } from "../../../hooks/useReportBuilderState";
import { ReportBuilderStateHolder } from "../../../states/ReportBuilderStateHolder";


export const ReportBuilderProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { data } = useSubscription<ReportBuilder, string>(
        ReportBuilderQueryService,
    );


    const create = useCallback(
        async (item: ReportBuilder): Promise<boolean> => {
            try {
                return await ReportBuilderCmdService.create(item);
            } catch (error) {
                console.error(
                    "Failed to create Report Builder:",
                    error,
                );

                alert(
                    `ID: ${item.id} already exists or could not be created.`,
                );

                return false;
            }
        },
        [],
    );


    const remove = useCallback(
        async (id: string): Promise<boolean> => {
            try {
                return await ReportBuilderCmdService.delete(id);
            } catch (error) {
                console.error(
                    "Failed to delete Report Builder:",
                    error,
                );

                alert(
                    `ID: ${id} was not found or could not be deleted.`,
                );

                return false;
            }
        },
        [],
    );

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

        setTemplate,
        toggleSection,
        setSections,
        reorderSections,

        setPeriod,
        setStartDate,
        setTerminal,

        reset,
    } = useReportBuilderState(reportBuilderState);


    const value = useMemo(
        () => ({
            data,
            create,
            remove,

            selectedTemplate,
            selectedSections,
            period,
            startDate,
            terminal,

            setTemplate,
            toggleSection,
            setSections,
            reorderSections,

            setPeriod,
            setStartDate,
            setTerminal,

            reset,
        }),
        [
            data,
            create,
            remove,

            selectedTemplate,
            selectedSections,
            period,
            startDate,
            terminal,

            setTemplate,
            toggleSection,
            setSections,
            reorderSections,

            setPeriod,
            setStartDate,
            setTerminal,

            reset,
        ],
    );


    return (
        <ReportBuilderContext.Provider value={value}>
            {children}
        </ReportBuilderContext.Provider>
    );
};