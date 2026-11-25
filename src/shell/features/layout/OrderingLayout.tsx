import ItemCards from "../cards/FoodCards";
import OrderForm from "../forms/OrderForm";
import TwoPanelLayout from "../../shared/components/TwoPanelLayout";

import { ORDER_FILTERS } from "../../constants/OrderData";

import type {
  Orderfilter,
  OrderingLayoutProps,
} from "../../types/OrderingTypes";

import useOrderingLayout from "../../hooks/useOrderingLayout";

const OrderingLayout = ({ onTrackClick }: OrderingLayoutProps) => {
  const {
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
    loading,
  } = useOrderingLayout();

  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-4 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6";

  return (
    <TwoPanelLayout
      panelWidth="400px"
      filters={ORDER_FILTERS}
      activeFilter={activeFilter}
      onFilterChange={(filter) => setActiveFilter(filter as Orderfilter)}
      search={searchText}
      onSearchChange={setSearchText}
      onSearch={() => setAppliedSearch(searchText)}
      searchPlaceholder="Search menu items..."
      onHistoryClick={onTrackClick}
      panel={
        selectedItem ? (
          <OrderForm
            orderedItems={orderedItems}
            kotItems={kotItems}
            botItems={botItems}
            onChangeQty={changeQty}
            onRemove={removeItem}
            onClose={() => setSelectedItem(null)}
            onOrderSuccess={clearOrder}
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
        {loading ? (
          <p className="py-10 text-center text-sm text-gray-400">
            Loading menu items...
          </p>
        ) : filteredItems.length === 0 ? (
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
