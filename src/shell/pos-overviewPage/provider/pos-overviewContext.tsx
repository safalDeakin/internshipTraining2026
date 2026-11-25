import { createContext } from "react";
import type { POSOverview } from "../../../domain/pos.overview";

export type RepoPosOverviewContextType = {
  overviews: POSOverview[] | null;
  selectedDate: string | undefined,
  selectedSessionId: string | undefined,
  create: (data: POSOverview) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  organizationId: number | undefined;
};

const PosOverviewContext = createContext<RepoPosOverviewContextType | null>(
  null,
);

export default PosOverviewContext;
