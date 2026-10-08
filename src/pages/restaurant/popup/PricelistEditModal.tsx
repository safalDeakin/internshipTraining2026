import { ArrowRight, ChevronDown, Plus, Search } from "lucide-react";
import React from "react";

const items = [
  {
    name: "Pizza",
    sub: "Margerita",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "Pizza",
    sub: "Margerita",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "Pizza",
    sub: "Pepperoni",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "MoMo",
    sub: "Buff",
    variant: "Fry / Half",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "MoMo",
    sub: "Buff",
    variant: "Fry / Full",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "MoMo",
    sub: "Chicken",
    variant: "Fry / Half",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
  {
    name: "MoMo",
    sub: "Chicken",
    variant: "Fry / Full",
    code: "#AF7899",
    type: "Food",
    price: 200,
  },
];
const PricelistEditModal = () => {
  return (
    <div className="absolute bg-white top-15 w-full rounded-lg h-auto">
      <h1 className="text-2xl font-bold text-center mt-5">Update Pricelists</h1>
      <div className="mb-6 flex justify-between items-center px-2 py-3">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-gray-400  py-2 pl-9 pr-9 text-sm outline-none transition focus:ring-1 focus:ring-gray-500"
          />
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
        <button className="cursor-pointer flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-100 p-2 text-gray-600">
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>
      <div className="mt-4 w-full overflow-x-auto bg-gray-50">
        <table className="w-full border-collapse text-sm">
          <thead className="w-full">
            <tr className="text-left text-gray-900 bg-gray-300 w-full">
              <th className="px-4 py-3 font-medium">Item Name</th>
              <th className="px-4 py-3 text-center font-medium">Varient</th>
              <th className="px-4 py-3 text-center font-medium">Item Code</th>
              <th className="px-4 py-3 text-center font-medium">Type</th>
              <th className=" py-3 text-center font-medium">Price</th>
              <th className="py=3 text-center font-medium">Exclude</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border border-gray-200">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="flex items-center gap-1 text-blue-500">
                      {item.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                      {item.sub}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-gray-800">
                  {item.variant}
                </td>
                <td className="px-4 py-3 text-center text-blue-500">
                  {item.code}
                </td>
                <td className="px-4 py-3 text-center text-gray-800">
                  {item.type}
                </td>
                <td className="px-4 py-3 text-center text-gray-800">
                  Rs. {item.price}
                </td>
                <td className="px-4 py-3 text-center text-gray-800">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricelistEditModal;
