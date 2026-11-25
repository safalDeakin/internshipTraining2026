import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useBilling } from "../context/BillingProvider";
import type { InvoiceCards } from "../types/InvoiceTypes";

type ViewMode = "grid" | "table";

// Grouped customer structure for Invoice History
export interface CustomerInvoiceHistory {
  id: string;
  customerName: string;
  phone: string;
  cards: InvoiceCards[];
  references: string[];
}

const useInvoiceHistory = () => {
  // Shared data from BillingProvider
  const { invoicingCards, loading } = useBilling();

  // View state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");

  // Modal state
  const [selectedReference, setSelectedReference] = useState<string | null>(
    null,
  );

  // Group invoicing cards by customer
  const customers = useMemo<CustomerInvoiceHistory[]>(() => {
    const customerMap = new Map<string, InvoiceCards[]>();

    invoicingCards.forEach((card) => {
      const key = card.name.trim().toLowerCase();

      const existingCards = customerMap.get(key) ?? [];
      existingCards.push(card);

      customerMap.set(key, existingCards);
    });

    return Array.from(customerMap.entries()).map(([key, cards]) => ({
      id: key,
      customerName: cards[0].name,
      phone: cards[0].number,
      cards,
      references: cards.map((card) => card.reference),
    }));
  }, [invoicingCards]);

  // Set initial selected customer
  useEffect(() => {
    if (selectedId === null && customers.length > 0) {
      setSelectedId(customers[0].id);
    }
  }, [customers, selectedId]);

  // Search customers
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return customers;

    return customers.filter((customer) => {
      const matchesCustomer =
        customer.customerName.toLowerCase().includes(search) ||
        customer.phone.toLowerCase().includes(search);

      const matchesReference = customer.cards.some((card) =>
        card.reference.toLowerCase().includes(search),
      );

      return matchesCustomer || matchesReference;
    });
  }, [customers, query]);

  // Keep selected customer valid when search results change
  const selected =
    filtered.find((customer) => customer.id === selectedId) ??
    filtered[0] ??
    null;

  // All cards associated with the selected customer
  const selectedCards = selected?.cards ?? [];

  // Selected reference
  const activeReference =
    selectedCards.find((card) => card.reference === selectedReference) ?? null;

  // Summary cards
  // These are counts only; payment amounts are not available in InvoiceCards.
  const summary = useMemo(
    () => [
      {
        label: "Total Customers",
        value: String(filtered.length),
      },
      {
        label: "Total References",
        value: String(
          filtered.reduce(
            (total, customer) => total + customer.cards.length,
            0,
          ),
        ),
      },
      {
        label: "KOT",
        value: String(
          filtered.reduce(
            (total, customer) =>
              total +
              customer.cards.filter((card) => card.type === "KOT").length,
            0,
          ),
        ),
      },
      {
        label: "BOT",
        value: String(
          filtered.reduce(
            (total, customer) =>
              total +
              customer.cards.filter((card) => card.type === "BOT").length,
            0,
          ),
        ),
      },
      {
        label: "Reservations",
        value: String(
          filtered.reduce(
            (total, customer) =>
              total +
              customer.cards.filter((card) => card.type === "Reservation")
                .length,
            0,
          ),
        ),
      },
    ],
    [filtered],
  );

  // Table columns
  const columns = [
    { key: "customerName", label: "Customer Name" },
    { key: "phone", label: "Phone Number" },
    { key: "references", label: "Reference Numbers" },
    { key: "totalReferences", label: "Total References" },
  ];

  // Table rows
  const rows: Record<string, ReactNode>[] = filtered.map((customer) => ({
    customerName: customer.customerName,
    phone: customer.phone,
    references: customer.references.join(", "),
    totalReferences: customer.cards.length,
  }));

  // Select customer
  const handleSelectInvoice = (customerId: string) => {
    setSelectedId(customerId);
    setSelectedReference(null);
  };

  // Search handler
  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedReference(null);
  };

  // Open reference details
  const handleReferenceClick = (reference: string) => {
    setSelectedReference(reference);
  };

  // Close reference details
  const closeReferenceDetails = () => {
    setSelectedReference(null);
  };

  return {
    // Shared source
    invoicingCards,
    customers,
    filtered,
    loading,

    // Selected customer and cards
    selected,
    selectedId,
    selectedCards,

    // View
    viewMode,
    setViewMode,

    // Search
    query,
    handleSearch,

    // Reference details
    activeReference,
    selectedReference,
    handleReferenceClick,
    closeReferenceDetails,

    // Summary and table
    summary,
    columns,
    rows,

    // Selection
    handleSelectInvoice,
  };
};

export default useInvoiceHistory;
