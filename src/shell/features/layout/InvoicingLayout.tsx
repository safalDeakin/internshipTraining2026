import { X } from "lucide-react";

import type { InvoiceLayoutProps } from "../../types/InvoiceTypes";

import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import InvoicingForm from "../forms/InvoicingForm";
import InvoicingCards from "../cards/InvoicingCards";
import SplitBillForm from "../forms/SplitBillForm";

import useInvoicingLayout from "../../hooks/useInvoicingLayout";

const InvoicingLayout = ({ onTrackClick }: InvoiceLayoutProps) => {
  const {
    visibleCards,
    selectedCards,
    selectedIds,
    loading,

    filters,
    activeType,
    setActiveType,
    search,
    setSearch,
    handleSearch,

    toggleCard,
    clearSelection,

    showSplitBill,
    showPanel,
    receiptOpen,
    setReceiptOpen,
    openSplitBill,
    closeSplitBill,

    gridClasses,
  } = useInvoicingLayout();

  return (
    <>
      <TwoPanelLayout
        panelWidth="400px"
        filters={filters}
        activeFilter={activeType}
        onFilterChange={(filter: string) =>
          setActiveType(filter as typeof activeType)
        }
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        searchPlaceholder="Name, Table"
        onHistoryClick={onTrackClick}
        panel={
          selectedCards.length > 0 ? (
            <InvoicingForm
              customers={selectedCards}
              onRemove={toggleCard}
              onClose={clearSelection}
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
          {loading ? (
            <p className="py-10 text-center text-sm text-gray-400">
              Loading billing records...
            </p>
          ) : visibleCards.length === 0 ? (
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
