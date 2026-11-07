import { createContext } from "react";
import type { POSOverview } from "../../../domain/pos.overview";

export type RepoPosOverviewContextType = {
  overviews: POSOverview[] | null;

  create: (data: POSOverview) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
};

const PosOverviewContext = createContext<RepoPosOverviewContextType | null>(
  null,
);

export default PosOverviewContext;
