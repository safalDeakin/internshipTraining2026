import { useMemo, type ReactNode } from "react";

import {
  posOverviewCmdService,
  posOverviewQueryService,
} from "../../../application/services";

import { useSubscription } from "../../../application/useSubscription";

import PosOverviewContext, {
  type RepoPosOverviewContextType,
} from "./pos-overviewContext";

import type { POSOverview } from "../../../domain/pos.overview";

export const RepoPosOverviewProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, loading, error } = useSubscription<POSOverview, string>(
    posOverviewQueryService,
  );

  const overviews = data ?? [];

  const create = async (data: POSOverview): Promise<boolean> => {
    try {
      return await posOverviewCmdService.create(data);
    } catch (error) {
      alert(`Id: ${data.id} Already Exist`);
      console.log(error);
      return false;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      return await posOverviewCmdService.delete(id);
    } catch (error) {
      console.log(error);
      alert(`Id: ${id} Not Found`);
      return false;
    }
  };

  const value = useMemo<RepoPosOverviewContextType>(
    () => ({
      overviews,
      create,
      remove,
    }),
    [overviews],
  );

  if (loading) return <div>Loading POS Overviews...</div>;

  if (error) return <div>Unable to load POS Overviews.</div>;

  return (
    <PosOverviewContext.Provider value={value}>
      {children}
    </PosOverviewContext.Provider>
  );
};
