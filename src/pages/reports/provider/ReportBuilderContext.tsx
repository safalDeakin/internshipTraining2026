import { createContext } from "react";

import type { ReportBuilder } from "../../../domain/ReportBuilder";
import type { useReportBuilderState } from "../../../hooks/useReportBuilderState";

export type ReportBuilderContextType = {

    data: ReportBuilder[];

    create: (data: ReportBuilder) => Promise<boolean>;

    remove: (id: string) => Promise<boolean>;
} & ReturnType<typeof useReportBuilderState>;


const ReportBuilderContext =
    createContext<ReportBuilderContextType | null>(null);

export default ReportBuilderContext;