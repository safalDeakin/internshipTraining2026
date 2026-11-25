import { useCallback, useEffect, useMemo, useState } from "react";

import { useBilling } from "../context/BillingProvider";
import type { Invoicefilter } from "../types/InvoiceTypes";
import { INVOICE_FILTERS } from "../constants/InvoiceData";

const useInvoicingLayout = () => {
  // Shared data from BillingProvider
  const { invoicingCards, loading } = useBilling();

  // Filter states
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeType, setActiveType] = useState<Invoicefilter>("All");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [staff, setStaff] = useState("All");

  // Split bill panel states
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Staff filter options
  const staffOptions = useMemo(
    () => Array.from(new Set(invoicingCards.map((card) => card.waiter))).sort(),
    [invoicingCards],
  );

  // Filter cards
  const visibleCards = useMemo(() => {
    const query = appliedSearch.trim().toLowerCase();

    return invoicingCards.filter((card) => {
      const matchesType = activeType === "All" || card.type === activeType;
      const matchesStaff = staff === "All" || card.waiter === staff;

      const matchesSearch =
        !query ||
        card.name.toLowerCase().includes(query) ||
        card.table.toLowerCase().includes(query);

      return matchesType && matchesStaff && matchesSearch;
    });
  }, [invoicingCards, activeType, staff, appliedSearch]);

  // Selected cards
  const selectedCards = useMemo(
    () => invoicingCards.filter((card) => selectedIds.includes(card.id)),
    [invoicingCards, selectedIds],
  );

  // Remove IDs that no longer exist in the shared collection
  useEffect(() => {
    const availableIds = new Set(invoicingCards.map((card) => card.id));

    setSelectedIds((previousIds) =>
      previousIds.filter((id) => availableIds.has(id)),
    );
  }, [invoicingCards]);

  // Toggle card selection
  const toggleCard = useCallback((id: number) => {
    setSelectedIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((selectedId) => selectedId !== id)
        : [...previousIds, id],
    );
  }, []);

  // Clear selected cards
  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Apply search
  const handleSearch = useCallback(() => {
    setAppliedSearch(search);
  }, [search]);

  // Open split bill panel
  const openSplitBill = useCallback(() => {
    setShowSplitBill(true);

    requestAnimationFrame(() => {
      setShowPanel(true);
    });
  }, []);

  // Close split bill panel
  const closeSplitBill = useCallback(() => {
    setShowPanel(false);

    window.setTimeout(() => {
      setShowSplitBill(false);
      setReceiptOpen(false);
    }, 300);
  }, []);

  // Grid layout classes
  const gridClasses =
    selectedCards.length > 0
      ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
      : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return {
    // Data
    invoicingCards,
    visibleCards,
    selectedCards,
    selectedIds,
    loading,

    // Filters
    filters: INVOICE_FILTERS,
    activeType,
    setActiveType,
    search,
    setSearch,
    handleSearch,
    staff,
    setStaff,
    staffOptions,

    // Selection
    toggleCard,
    clearSelection,

    // Split bill
    showSplitBill,
    showPanel,
    receiptOpen,
    setReceiptOpen,
    openSplitBill,
    closeSplitBill,
    setShowPanel,
    setShowSplitBill,

    // Layout
    gridClasses,
  };
};

export default useInvoicingLayout;
