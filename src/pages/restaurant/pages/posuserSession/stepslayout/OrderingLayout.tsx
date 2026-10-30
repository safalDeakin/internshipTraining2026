import { useState } from "react";
import ItemCards from "../components/ordering/ItemCards";
import type { OrderLine } from "../components/ordering/OrderSection";
import OrderForm from "../components/ordering/OrderForm";
import TwoPanelLayout from "../components/TwoPanelLayout";
import FilterBar from "../components/FilterBar";
import { History } from "lucide-react";

interface OrderingLayoutProps {
  onTrackClick: () => void;
}
// Types for menu items
export type MenuItem = {
  id: number;
  image?: string;
  label: string;
  date: string;
  status?: string;
  type: "food" | "beverage" | "extra";
};

// Mock data
const foodItems: MenuItem[] = [
  {
    id: 1,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 2,
    image: "/images.jpg",
    label: "MoMo",
    date: "2080/01/22",
    type: "food",
  },
  { id: 3, label: "Mojito", date: "2083/01/22", type: "beverage" },
  {
    id: 4,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 5,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 6,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 7,
    image: "/images.jpg",
    label: "Coke",
    date: "2083/01/22",
    type: "beverage",
  },
  {
    id: 8,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 9,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },
  {
    id: 10,
    label: "Coke",
    date: "2083/01/22",
    status: "N/A",
    type: "beverage",
  },
  {
    id: 11,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "extra",
  },
  {
    id: 12,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 13,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
  {
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO",
    date: "2083/01/22",
    type: "food",
  },
];

const FILTERS = ["All", "Food", "Drinks", "Extras"] as const;
type Filter = (typeof FILTERS)[number];

const OrderingLayout = ({ onTrackClick }: OrderingLayoutProps) => {
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderItems, setOrderItems] = useState<Record<number, number>>({});

  // Filter by category and applied search
  const filteredItems = foodItems.filter((item) => {
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

  // Convert selected quantities into order lines
  const orderedItems: OrderLine[] = foodItems
    .filter((item) => orderItems[item.id])
    .map((item) => ({
      ...item,
      qty: orderItems[item.id],
    }));

  // Separate food and beverages
  const kotItems = orderedItems.filter((item) => item.type === "food");
  const botItems = orderedItems.filter((item) => item.type === "beverage");

  // Grid layout
  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  // Select item and increase quantity
  const handleItemClick = (item: MenuItem) => {
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

  // Remove item completely
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

  return (
    <TwoPanelLayout
      gap="20px"
      className="px-6"
      panelWidth="400px"
      panel={
        selectedItem ? (
          <OrderForm
            orderedItems={orderedItems}
            kotItems={kotItems}
            botItems={botItems}
            onChangeQty={changeQty}
            onRemove={removeItem}
            onClose={() => setSelectedItem(null)}
          />
        ) : null
      }
    >
      <div
        className={
          selectedItem
            ? "lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }
      >
        {/* Reusable filter and search */}
        <div className="flex justify-between p-3">
          <FilterBar
            filters={FILTERS}
            activeFilter={activeFilter}
            onFilterChange={(filter) => setActiveFilter(filter as Filter)}
            search={searchText}
            onSearchChange={setSearchText}
            onSearch={() => setAppliedSearch(searchText)}
            searchPlaceholder="Search menu items..."
          />

          {/* Switches to the history tab inside the POS session (navbar stays visible) */}
          <button
            type="button"
            onClick={onTrackClick}
            className="p-2 hover:bg-gray-100"
            aria-label="View history"
          >
            <History size={20} />
          </button>
        </div>
        {/* Menu cards */}
        {filteredItems.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">
            No menu items found.
          </p>
        ) : (
          <div className={gridClasses}>
            {filteredItems.map((item) => (
              <ItemCards
                key={item.id}
                {...item}
                isSelected={selectedItem?.id === item.id}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        )}
      </div>
    </TwoPanelLayout>
  );
};

export default OrderingLayout;
