//author:shrajja

import {
  ArrowDownToLine,
  ArrowRight,
  ChevronDown,
  Pencil,
  Plus,
  Printer,
  Search,
  TextAlignJustify,
  Trash,
} from "lucide-react";
import { useState } from "react";
import PricelistEditModal from "../popup/PricelistEditModal";

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
const Pricelist = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <section className="w-full h-full ">
      <aside></aside>

      <main className="relative ">
        {/* top */}
        <div className="flex w-full items-center justify-between bg-gray-200 p-5">
          {/* Left */}
          <div className="flex shrink-0 items-center gap-10">
            <p className="flex items-center gap-2">
              <TextAlignJustify className="h-3 w-3" />
              2024-Winter Special
            </p>

            <div className="inline-flex shrink-0 items-center">
              <button
                type="button"
                className="h-5 rounded-full bg-[#D9B26A] pl-2.5 pr-3 text-[11px] font-semibold leading-none text-white"
              >
                Tax I
              </button>

              <button
                type="button"
                className="-ml-2 h-5 rounded-full bg-[#1E8C86] px-3.5 text-[11px] font-semibold leading-none text-white"
              >
                Active
              </button>
            </div>
          </div>

          {/* Vertical Line  */}
          <div className="h-6 w-px bg-gray-500" />

          <button className="cursor-pointer flex shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm whitespace-nowrap">
            <ArrowDownToLine className="h-4 w-4" />
            Export CSV
          </button>

          <button className=" cursor-pointer flex shrink-0 items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm whitespace-nowrap">
            <Printer className="h-4 w-4" />
            Print as PDF
          </button>

          <button
            className="cursor-pointer flex shrink-0 items-center gap-2 rounded-lg bg-blue-950 px-3 py-2 text-sm text-white whitespace-nowrap"
            onClick={() => setIsEditOpen(!isEditOpen)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button className=" cursor-pointer flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white whitespace-nowrap">
            <Trash className="h-4 w-4" />
            Delete
          </button>
        </div>
        {/* Description */}
        <div className="p-5">
          {/* head */}
          <div className="mb-6 max-w-4xl">
            <h1 className="mb-1 font-bold text-gray-900">Description :</h1>
            <p className="leading-6 text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur
              ut iusto quaerat sit itaque, esse ipsam quia aliquam, perferendis
              porro cum ipsum, incidunt voluptate non doloribus quisquam
              eveniet. Sequi, ut?
            </p>
            <h1 className="mt-4 mb-1 font-bold text-gray-900">
              Effective Dates:
            </h1>
            <p className="flex gap-1 items-center text-gray-700  leading-6">
              <span>2081/10/12</span>{" "}
              <ArrowRight className="text-gray-700 w-5 h-4" />{" "}
              <span>2082/10/12</span>
            </p>
          </div>
          {/* Search ,add item*/}
          <div className="mb-6 flex items-center gap-10">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-gray-400 bg-gray-200 py-2 pl-9 pr-9 text-sm outline-none transition focus:ring-1 focus:ring-gray-500"
              />
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-200 p-2 text-gray-600">
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>

          {/* table */}
          <div className="mt-4 w-full overflow-x-auto bg-gray-50">
            <table className="w-full border-collapse text-sm">
              <thead className="w-full">
                <tr className="text-left text-gray-900 bg-gray-300 w-full">
                  <th className="px-4 py-3 font-medium">Item Name</th>
                  <th className="px-4 py-3 text-center font-medium">Varient</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Item Code
                  </th>
                  <th className="px-4 py-3 text-center font-medium">Type</th>
                  <th className=" py-3 text-center font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isEditOpen && (
          <>
            <PricelistEditModal />
          </>
        )}
      </main>
    </section>
  );
};

export default Pricelist;
