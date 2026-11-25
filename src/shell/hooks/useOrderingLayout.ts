import { useMemo, useState } from "react";

import type { FoodItem, Orderfilter, OrderLine } from "../types/OrderingTypes";

import { useOrdering } from "../context/OrderingProvider";

const useOrderingLayout = () => {
  const { foodItems, loading } = useOrdering();

  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [activeFilter, setActiveFilter] = useState<Orderfilter>("All");

  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const [orderItems, setOrderItems] = useState<Record<number, number>>({});

  // Filter menu items
  const filteredItems = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesType =
        activeFilter === "All" ||
        (activeFilter === "Food" && item.type === "food") ||
        (activeFilter === "Drinks" && item.type === "beverage") ||
        (activeFilter === "Extras" && item.type === "extra");

      const matchesSearch = item.label
        .toLowerCase()
        .includes(appliedSearch.trim().toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [foodItems, activeFilter, appliedSearch]);

  // Convert selected quantities into order lines
  const orderedItems: OrderLine[] = useMemo(() => {
    return foodItems
      .filter((item) => orderItems[item.id] > 0)
      .map((item) => ({
        ...item,
        qty: orderItems[item.id],
      }));
  }, [foodItems, orderItems]);

  // Separate KOT and BOT items
  const kotItems = useMemo(
    () => orderedItems.filter((item) => item.type === "food"),
    [orderedItems],
  );

  const botItems = useMemo(
    () => orderedItems.filter((item) => item.type === "beverage"),
    [orderedItems],
  );

  // Select an item and increase its quantity
  const handleItemClick = (item: FoodItem) => {
    setSelectedItem(item);

    setOrderItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? 0) + 1,
    }));
  };

  // Increase or decrease quantity
  const changeQty = (id: number, delta: number) => {
    setOrderItems((prev) => {
      const next = (prev[id] ?? 0) + delta;
      const copy = { ...prev };

      if (next <= 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }

      return copy;
    });
  };

  // Remove an item completely
  const removeItem = (id: number) => {
    setOrderItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Clear cart after a successful order
  const clearOrder = () => {
    setOrderItems({});
    setSelectedItem(null);
  };

  return {
    loading,
    filteredItems,

    searchText,
    setSearchText,
    setAppliedSearch,

    activeFilter,
    setActiveFilter,

    selectedItem,
    setSelectedItem,

    orderedItems,
    kotItems,
    botItems,

    handleItemClick,
    changeQty,
    removeItem,
    clearOrder,
  };
};

export default useOrderingLayout;
