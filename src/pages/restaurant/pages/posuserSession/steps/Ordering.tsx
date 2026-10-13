import { useState } from "react";
import ItemCards from "../components/ItemCards";
import type { OrderLine } from "../components/OrderSection";
import OrderForm from "../components/OrderForm";
import TwoPanelLayout from "../components/TwoPanelLayout";

export type MenuItem = {
  id: number;
  image?: string;
  label: string;
  date: string;
  status?: string;
  type: "food" | "beverage";
};

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
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderItems, setOrderItems] = useState<Record<number, number>>({});

  const filteredItems = foodItems.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase().trim()),
  );

  const orderedItems: OrderLine[] = foodItems
    .filter((item) => orderItems[item.id])
    .map((item) => ({
      ...item,
      qty: orderItems[item.id],
    }));

  const kotItems = orderedItems.filter((item) => item.type === "food");
  const botItems = orderedItems.filter((item) => item.type === "beverage");

  const gridClasses = selectedItem
    ? "grid grid-cols-2 gap-3 py-3 md:grid-cols-3 2xl:grid-cols-4"
    : "grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);

    setOrderItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? 0) + 1,
    }));
  };

  const changeQty = (id: number, delta: number) => {
    setOrderItems((prev) => {
      const next = (prev[id] ?? 0) + delta;
      const copy = { ...prev };

      if (next <= 0) delete copy[id];
      else copy[id] = next;

      return copy;
    });
  };

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
        className={`${
          selectedItem
            ? "lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1"
            : ""
        }`}
      >
        {" "}
        <div className={gridClasses}>
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
