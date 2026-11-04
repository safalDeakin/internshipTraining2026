// author: shrajja

import { useState } from "react";

import {
  ArrowDownToLine,
  ArrowRight,
  Pencil,
  Printer,
  TextAlignJustify,
  Trash,
} from "lucide-react";

import MsTable from "../../../../../component/table/components/MsTable";
import PricelistEditModal from "./PricelistEditModal";

import type { Pricelist } from "../data/initialPricelistData";

interface PricelistDetailsProps {
  pricelist: Pricelist;
}

const columns = [
  {
    key: "name",
    label: "Item Name",
    idealWidth: 180,
    minWidth: 150,
    priority: 1,
    render: (item: any) => (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 shrink-0"
          onClick={(event) => event.stopPropagation()}
        />
        <span>{item.name}</span>
      </div>
    ),
  },
  {
    key: "variant",
    label: "Variant",
    idealWidth: 100,
    minWidth: 80,
    priority: 2,
  },
  {
    key: "code",
    label: "Item Code",
    idealWidth: 110,
    minWidth: 90,
    priority: 3,
  },
  {
    key: "type",
    label: "Type",
    idealWidth: 80,
    minWidth: 70,
    priority: 4,
  },
  {
    key: "price",
    label: "Price",
    idealWidth: 90,
    minWidth: 80,
    priority: 5,
  },
];

const PricelistDetails = ({ pricelist }: PricelistDetailsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleToggleItem = (id: number) => {
    setSelectedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  return (
    <>
      {/* Header / Actions */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-100 p-4">
        <div className="flex min-w-0 flex-1 items-center gap-5">
          <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-800">
            <TextAlignJustify className="h-4 w-4 shrink-0" />
            <span className="truncate">{pricelist.name}</span>
          </p>

          <div className="flex shrink-0 items-center">
            <span className="rounded-full bg-[#D9B26A] px-3 py-1 text-[11px] font-semibold text-white">
              {pricelist.tax}
            </span>

            <span
              className={`-ml-2 rounded-full px-3 py-1 text-[11px] font-semibold text-white ${
                pricelist.status === "Active" ? "bg-[#1E8C86]" : "bg-gray-400"
              }`}
            >
              {pricelist.status}
            </span>
          </div>
        </div>

        <div className="hidden h-7 w-px bg-gray-300 lg:block" />

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export CSV
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            Print PDF
          </button>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-950 px-3 py-2 text-sm text-white shadow-sm transition hover:bg-blue-900"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white shadow-sm transition hover:bg-red-700"
          >
            <Trash className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Pricelist Details */}
      <div className="mt-3 p-5">
        <div className="mb-5">
          <h2 className="mb-1 font-bold text-gray-900">Description</h2>

          <p className="max-w-5xl leading-6 text-gray-600">
            {pricelist.description}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-gray-900">Effective Dates</h2>

          <div className="flex items-center gap-3 text-gray-700">
            <span className="px-3 py-1.5">{pricelist.startDate}</span>

            <ArrowRight className="h-4 w-4 text-gray-400" />

            <span className="px-3 py-1.5">{pricelist.endDate}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <MsTable
          columns={columns}
          data={pricelist.items}
          selectedItems={selectedItems}
          onToggleItem={handleToggleItem}
          showSearchBar={true}
          searchType="All"
          onSearchTypeChange={() => {}}
          onChange={setItemSearch}
        />
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <PricelistEditModal onClose={() => setIsEditOpen(false)} />
      )}
    </>
  );
};

export default PricelistDetails;
