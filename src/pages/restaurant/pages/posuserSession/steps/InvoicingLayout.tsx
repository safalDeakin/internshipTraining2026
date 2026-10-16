import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import TwoPanelLayout from "../components/TwoPanelLayout";
import InvoicingForm from "../components/invoicing/InvoicingForm";
import InvoicingCards from "../components/invoicing/InvoicingCards";
import FilterBar from "../components/FilterBar";

export type InvoiceType = "KOT" | "BOT" | "Reservation";

export interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  amount: number;
}

export interface InvoiceCards {
  id: number;
  type: InvoiceType;
  reference: string; // e.g. KOT_125
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  invoiceItems: InvoiceItem[];
}

export const invoicingCards: InvoiceCards[] = [
  {
    id: 1,
    type: "KOT",
    reference: "KOT_125",
    name: "Ram Shrestha",
    number: "9841234567",
    waiter: "1",
    table: "1",
    time: "5:30 PM",
    invoiceItems: [
      { id: 1, name: "Steam MoMO", quantity: 1, amount: 350 },
      { id: 2, name: "Kothey MoMo", quantity: 1, amount: 800 },
      { id: 3, name: "Chicken Pizza", quantity: 1, amount: 250 },
      { id: 4, name: "Curry", quantity: 1, amount: 300 },
    ],
  },
  {
    id: 2,
    type: "BOT",
    reference: "BOT_125",
    name: "Sita Thapa",
    number: "9801234567",
    waiter: "2",
    table: "2",
    time: "5:45 PM",
    invoiceItems: [
      { id: 1, name: "Coke", quantity: 2, amount: 150 },
      { id: 2, name: "Beer", quantity: 3, amount: 900 },
    ],
  },
  {
    id: 3,
    type: "Reservation",
    reference: "Reservation_125",
    name: "Hari Karki",
    number: "9811122233",
    waiter: "1",
    table: "5",
    time: "6:00 PM",
    invoiceItems: [
      { id: 1, name: "Reservation fee", quantity: 1, amount: 1000 },
    ],
  },
  {
    id: 4,
    type: "KOT",
    reference: "KOT_126",
    name: "Maya Gurung",
    number: "9851098765",
    waiter: "3",
    table: "3",
    time: "6:10 PM",
    invoiceItems: [
      { id: 1, name: "Chowmein", quantity: 1, amount: 150 },
      { id: 2, name: "Momo", quantity: 2, amount: 200 },
    ],
  },
  {
    id: 5,
    type: "BOT",
    reference: "BOT_126",
    name: "Ram Shrestha",
    number: "9841234567",
    waiter: "1",
    table: "1",
    time: "6:20 PM",
    invoiceItems: [{ id: 1, name: "Lemon Soda", quantity: 2, amount: 160 }],
  },
];

const FILTERS = ["All", "KOT", "BOT", "Reservation"] as const;
type Filter = (typeof FILTERS)[number];

const InvoicingLayout = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeType, setActiveType] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [staff, setStaff] = useState("All");

  const staffOptions = useMemo(
    () => Array.from(new Set(invoicingCards.map((c) => c.waiter))).sort(),
    [],
  );

  const visibleCards = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();
    return invoicingCards.filter((card) => {
      const matchesType = activeType === "All" || card.type === activeType;
      const matchesStaff = staff === "All" || card.waiter === staff;
      const matchesSearch =
        !q ||
        card.name.toLowerCase().includes(q) ||
        card.table.toLowerCase().includes(q);
      return matchesType && matchesStaff && matchesSearch;
    });
  }, [activeType, staff, appliedSearch]);

  const selectedCards = useMemo(
    () => invoicingCards.filter((c) => selectedIds.includes(c.id)),
    [selectedIds],
  );

  // Only KOT / BOT / Reservation cards of the SAME person can be combined.
  // People are matched by phone number (two guests can share a name).
  const toggleCard = (id: number) => {
    const clicked = invoicingCards.find((c) => c.id === id);
    if (!clicked) return;

    setSelectedIds((prev) => {
      // Already selected -> deselect it
      if (prev.includes(id)) return prev.filter((x) => x !== id);

      // Same person as the current selection -> add it
      const current = invoicingCards.find((c) => c.id === prev[0]);
      if (current && current.number === clicked.number) return [...prev, id];

      // Different person (or nothing selected yet) -> start a new selection
      return [id];
    });
  };

  const gridClasses =
    selectedCards.length > 0
      ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
      : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <TwoPanelLayout
      gap="20px"
      className="px-6"
      panelWidth="400px"
      panel={
        selectedCards.length > 0 ? (
          <InvoicingForm
            customers={selectedCards}
            onRemove={toggleCard}
            onClose={() => setSelectedIds([])}
            onGenerate={(data) => console.log("Generate receipt:", data)}
            onSplit={() => console.log("Split bill:", selectedCards)}
          />
        ) : null
      }
    >
      {/* Filter bar */}
      <FilterBar
        filters={FILTERS}
        activeFilter={activeType}
        onFilterChange={(filter) => setActiveType(filter as Filter)}
        search={search}
        onSearchChange={setSearch}
        onSearch={() => setAppliedSearch(search)}
        searchPlaceholder="Name, Table"
        staffOptions={staffOptions}
        staff={staff}
        onStaffChange={setStaff}
      />

      {/* Cards */}
      <div
        className={
          selectedCards.length > 0
            ? "lg:max-h-[calc(100vh-170px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }
      >
        {visibleCards.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            No orders match your filters.
          </p>
        ) : (
          <div className={gridClasses}>
            {visibleCards.map((card) => (
              <InvoicingCards
                key={card.id}
                type={card.type}
                reference={card.reference}
                name={card.name}
                number={card.number}
                waiter={card.waiter}
                table={card.table}
                time={card.time}
                itemCount={card.invoiceItems.length}
                isSelected={selectedIds.includes(card.id)}
                onClick={() => toggleCard(card.id)}
              />
            ))}
          </div>
        )}
      </div>
    </TwoPanelLayout>
  );
};

export default InvoicingLayout;
