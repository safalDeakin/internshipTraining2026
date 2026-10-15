import { useState } from "react";
import ItemCards from "../components/ItemCards";
import type { OrderLine } from "../components/OrderSection";
import OrderForm from "../components/OrderForm";
import TwoPanelLayout from "../components/TwoPanelLayout";

// types for item
export type MenuItem = {
  id: number;
  image?: string;
  label: string;
  date: string;
  status?: string;
  type: "food" | "beverage";
};
//mock data for show
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
  {
    id: 3,
    label: " Mojito",
    date: "2083/01/22",
    type: "beverage",
  },

  {
    id: 4,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    type: "food",
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
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },

  {
    id: 7,
    image: "/images.jpg",
    label: "Coke ",
    date: "2083/01/22",
    type: "beverage",
  },

  {
    id: 8,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },

  {
    id: 9,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    status: "N/A",
    type: "food",
  },

  {
    id: 10,
    status: "N/A",
    label: "Coke ",
    date: "2083/01/22",
    type: "beverage",
  },

  {
    id: 11,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },

  {
    id: 12,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },

  {
    id: 13,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },

  {
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    type: "food",
  },
];

const Ordering = () => {
  const [searchText, setSearchText] = useState(""); //the user types in the search field.
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null); //currently selected menu item.
  const [orderItems, setOrderItems] = useState<Record<number, number>>({}); //quantities of selected items using their IDs.
  //filtered list based on the search text.
  const filteredItems = foodItems.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase().trim()),
  );
  //quantity map into a list of complete ordered items.
  const orderedItems: OrderLine[] = foodItems
    .filter((item) => orderItems[item.id])
    .map((item) => ({
      ...item,
      qty: orderItems[item.id],
    }));
  //separate the items type
  const kotItems = orderedItems.filter((item) => item.type === "food");
  const botItems = orderedItems.filter((item) => item.type === "beverage");
  //css grid layout
  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  //click menuitems
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item); //select the item.
    //increase its quantity.
    setOrderItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? 0) + 1,
    }));
  };
  //Increasing and decreasing quantity
  const changeQty = (id: number, delta: number) => {
    setOrderItems((prev) => {
      const next = (prev[id] ?? 0) + delta; //delta parameter represents the change:
      const copy = { ...prev };
      if (next <= 0)
        delete copy[id]; //calculates the new quantity.
      else copy[id] = next;

      return copy;
    });
  };
  //Removing an item completely
  const removeItem = (id: number) => {
    setOrderItems((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    //copies the existing map and deletes the requested ID.
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  return (
    //reusable layout
    <TwoPanelLayout
      gap="20px"
      className="px-6"
      panelWidth="400px"
      //  to display OrderForm
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
        className={`${
          selectedItem
            ? "lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }`}
      >
        {" "}
        <div className={gridClasses}>
          {/* search */}
          {filteredItems.map((item) => (
            <ItemCards
              key={item.id}
              {...item}
              isSelected={selectedItem?.id === item.id}
              onClick={() => handleItemClick(item)}
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </TwoPanelLayout>
  );
};

export default Ordering;
