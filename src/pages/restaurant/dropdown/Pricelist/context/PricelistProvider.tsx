import { useMemo, useState, type ReactNode } from "react";

import { useSubscription } from "../../../../../application/useSubscription";

import {
  PricelistCmdService,
  PricelistQueryService,
} from "../../../../../application/services";

import type { Pricelist } from "../data/initialPricelistData";

import { PricelistContext } from "./PricelistContext";

interface PricelistProviderProps {
  children: ReactNode;
}

const PricelistProvider = ({ children }: PricelistProviderProps) => {
  const { data, loading } = useSubscription<Pricelist, string>(
    PricelistQueryService,
  );

  const [search, setSearch] = useState("");

  const filteredPricelists = useMemo(() => {
    return data.filter((pricelist) =>
      pricelist.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const addPricelist = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false;

    const newPricelist: Pricelist = {
      id: crypto.randomUUID(),
      name: name.trim(),
    };

    return PricelistCmdService.create(newPricelist);
  };

  const value = useMemo(
    () => ({
      data,
      filteredPricelists,
      loading,
      search,
      setSearch,
      addPricelist,
    }),
    [data, filteredPricelists, loading, search],
  );

  return (
    <PricelistContext.Provider value={value}>
      {children}
    </PricelistContext.Provider>
  );
};

export default PricelistProvider;
