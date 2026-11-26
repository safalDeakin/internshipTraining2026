import { useMemo, useState, type ReactNode } from "react";

import {
  guestRequestCmdService,
  guestRequestQueryService,
} from "../../../../../application/services";

import { useSubscription } from "../../../../../application/useSubscription";
import RepoGuestRequestContext from "./GuestRequestContext";
import type { GuestRequest } from "../../../../../domain/GuestRequest";

export const RepoGuestRequestProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const title = "Guest Request";

  const { data } = useSubscription<GuestRequest, string>(
    guestRequestQueryService,
  );

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return data;

    return data.filter((item) =>
      [item.guestName, item.id, item.room].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [data, searchQuery]);

  const create = async (request: GuestRequest): Promise<boolean> => {
    try {
      return await guestRequestCmdService.create(request);
    } catch (error) {
      alert(`Id: ${request.id} Already Exist`);
      console.log(error);
      return false;
    }
  };

  const update = async (
    id: string,
    changes: Partial<GuestRequest>,
  ): Promise<boolean> => {
    try {
      await guestRequestCmdService.update(id, changes);
      return true;
    } catch (error) {
      console.error("Unable to update guest request:", error);
      alert("Unable to complete this task.");
      return false;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      return await guestRequestCmdService.delete(id);
    } catch (error) {
      console.log(error);
      alert(`Id: ${id} Not Found`);
      return false;
    }
  };

  const value = useMemo(
    () => ({
      title,
      data: filteredData,
      searchQuery,
      setSearchQuery,
      getId: (item: GuestRequest) => item.id,
      create,
      update,
      remove,
    }),
    [filteredData, searchQuery],
  );

  return (
    <RepoGuestRequestContext.Provider value={value}>
      {children}
    </RepoGuestRequestContext.Provider>
  );
};
