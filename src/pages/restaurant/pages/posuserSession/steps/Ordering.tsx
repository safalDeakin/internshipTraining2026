// author: shrajja

import { useState } from "react";
import ItemCards from "../components/ItemCards";
import { ButtonMode } from "../../../popup/SessionModeModal";
import { X } from "lucide-react";
const foodItems = [
  {
    id: 1,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
    status: "N/A",
  },
  {
    id: 2,
    image: "/images.jpg",
    label: "MoMo",
    date: "2080/01/22",
  },
  {
    id: 3,

    label: " Mojito",
    date: "2083/01/22",
  },
  {
    id: 4,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
  },
  {
    id: 5,
    image: "/images.jpg",
    label: "MoMo",
    date: "2083/01/22",
  },
  {
    id: 6,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },
  {
    id: 7,
    image: "/images.jpg",
    label: "Coke ",
    date: "2083/01/22",
  },
  {
    id: 8,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },
  {
    id: 9,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
    status: "N/A",
  },
  {
    id: 10,
    status: "N/A",
    label: "Coke ",
    date: "2083/01/22",
  },
  {
    id: 11,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },
  {
    id: 12,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },

  {
    id: 13,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },
  {
    id: 14,
    image: "/images.jpg",
    label: "Steam MOMO ",
    date: "2083/01/22",
  },
];
const Ordering = () => {
  const [searchType, setSearchType] = useState("All");
  const [searchText, setSearchText] = useState("");

  const [selectedItem, setSelectedItem] = useState<
    (typeof foodItems)[number] | null
  >(null);

  const filteredItems = foodItems.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase().trim()),
  );

  return (
    <div className="flex w-full gap-5 px-6">
      {/* Left side: Food cards */}
      <div className={`min-w-0 ${selectedItem ? "w-2/3" : "w-full"}`}>
        <div className="grid grid-cols-2 gap-3 py-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item) => (
            <ItemCards
              key={item.id}
              {...item}
              isSelected={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Right side: Details panel */}
      {selectedItem && (
        <form className="sticky top-4 h-fit w-1/3 min-w-64 rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Place Order</h2>
            <button
              onClick={() => setSelectedItem(null)}
              className="rounded px-3 py-1 text-gray-100 hover:bg-gray-100"
            >
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label>Particular</label>
            <input
              placeholder="Full Name"
              className="p-1 border border-gray-300 rounded-lg auto"
            />
          </div>
          <div className="w-full flex gap-2">
            <div className="flex flex-col gap-2">
              <label>Particular</label>
              <input
                placeholder="Full Name"
                className="p-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Particular</label>
              <input
                placeholder="Full Name"
                className="p-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <ButtonMode title="Submit" />
        </form>
      )}
    </div>
  );
};

export default Ordering;
