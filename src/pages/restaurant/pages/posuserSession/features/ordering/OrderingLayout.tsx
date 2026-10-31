import { useState } from "react";
import ItemCards from "./components/FoodCards";
import OrderForm from "./components/OrderForm";
import TwoPanelLayout from "../../shared/components/TwoPanelLayout";
import type { OrderLine } from "./components/OrderSection";
import type {
  FoodItem,
  Orderfilter,
  OrderingLayoutProps,
} from "./types/OrderingTypes";
import { foodItems, ORDER_FILTERS } from "./constant/OrderData";

const OrderingLayout = ({ onTrackClick }: OrderingLayoutProps) => {
  // Search and filter states
  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Orderfilter>("All");

  // Selected menu item and order quantities
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [orderItems, setOrderItems] = useState<Record<number, number>>({});

  // Filter menu items by category and search text
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
      panelWidth="400px"
      // Reusable filter and search
      filters={ORDER_FILTERS}
      activeFilter={activeFilter}
      onFilterChange={(filter) => setActiveFilter(filter as Orderfilter)}
      search={searchText}
      onSearchChange={setSearchText}
      onSearch={() => setAppliedSearch(searchText)}
      searchPlaceholder="Search menu items..."
      // Reusable history button
      onHistoryClick={onTrackClick}
      // Right-side order form
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
      {/* Menu cards */}
      <div
        className={
          selectedItem
            ? "lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }
      >
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
