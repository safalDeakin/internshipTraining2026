import { useMemo, useState } from "react";
import InvoicingForm from "./components/InvoicingForm";
import InvoicingCards from "./components/InvoicingCards";
import SplitBillForm from "./components/splitbillprocess/SplitBillForm";
import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import { X } from "lucide-react";
import type { Invoicefilter, InvoiceLayoutProps } from "./types/InvoiceTypes";
import { INVOICE_FILTERS, invoicingCards } from "./constants/InvoiceData";

const InvoicingLayout = ({ onTrackClick }: InvoiceLayoutProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeType, setActiveType] = useState<Invoicefilter>("All");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [staff, setStaff] = useState("All");

  const [showSplitBill, setShowSplitBill] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  // Staff filter options
  const staffOptions = useMemo(
    () => Array.from(new Set(invoicingCards.map((card) => card.waiter))).sort(),
    [],
  );

  // Filter invoice cards
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
  }, [activeType, staff, appliedSearch]);

  // Get selected invoice cards
  const selectedCards = useMemo(
    () => invoicingCards.filter((card) => selectedIds.includes(card.id)),
    [selectedIds],
  );

  // Select or deselect invoice cards
  const toggleCard = (id: number) => {
    setSelectedIds((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds.filter((selectedId) => selectedId !== id);
      }

      return [...previousIds, id];
    });
  };
  // Open split bill panel
  const openSplitBill = () => {
    setShowSplitBill(true);

    requestAnimationFrame(() => {
      setShowPanel(true);
    });
  };

  // Close split bill panel
  const closeSplitBill = () => {
    setShowPanel(false);

    setTimeout(() => {
      setShowSplitBill(false);
      setReceiptOpen(false);
    }, 300);
  };

  // Invoice card grid layout
  const gridClasses =
    selectedCards.length > 0
      ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
      : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <>
      <TwoPanelLayout
        panelWidth="400px"
        filters={INVOICE_FILTERS}
        activeFilter={activeType}
        onFilterChange={(filter) => setActiveType(filter as Invoicefilter)}
        search={search}
        onSearchChange={setSearch}
        onSearch={() => setAppliedSearch(search)}
        searchPlaceholder="Name, Table"
        onHistoryClick={onTrackClick}
        panel={
          selectedCards.length > 0 ? (
            <InvoicingForm
              customers={selectedCards}
              onRemove={toggleCard}
              onClose={() => setSelectedIds([])}
              onGenerate={(data) => console.log("Generate receipt:", data)}
              onSplit={openSplitBill}
            />
          ) : null
        }
      >
        {/* Invoice Cards */}
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

      {/* Split Bill Sliding Panel */}
      {showSplitBill && (
        <div className="fixed inset-0 z-[9999]">
          {/* Background overlay */}
          <div
            onClick={closeSplitBill}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Sliding panel */}
          <div
            className={`absolute right-10 w-full overflow-y-auto rounded bg-white shadow-2xl transition-all duration-300 ease-in-out ${
              receiptOpen
                ? "top-4 max-h-[calc(100vh-2rem)] max-w-md"
                : "top-0 h-full max-w-6xl"
            } ${showPanel ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Close button - hidden when receipt is displayed */}
            {!receiptOpen && (
              <button
                type="button"
                onClick={closeSplitBill}
                className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close split bill"
              >
                <X size={20} />
              </button>
            )}

            <SplitBillForm
              cards={selectedCards}
              onClose={closeSplitBill}
              onReceiptChange={setReceiptOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InvoicingLayout;
