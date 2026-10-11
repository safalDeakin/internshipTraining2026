import { ArrowRight, ChevronDown, Plus, Search, X } from "lucide-react";
import MsTable from "../../../component/table/components/MsTable";
const editColumns = [
  {
    key: "name",
    label: "Item Name",
    idealWidth: 220,
    minWidth: 180,
    priority: 1,
    render: (item: any) => (
      <div className="flex items-center gap-2">
        {/* First checkbox: select item */}
        <input
          type="checkbox"
          className="h-4 w-4"
          onClick={(event) => event.stopPropagation()}
        />

        <span className="flex items-center gap-1 text-blue-500">
          {item.name}
          {item.sub}
        </span>
      </div>
    ),
  },

  {
    key: "variant",
    label: "Variant",
    idealWidth: 120,
    minWidth: 100,
    priority: 2,
  },

  {
    key: "code",
    label: "Item Code",
    idealWidth: 120,
    minWidth: 100,
    priority: 3,
  },

  {
    key: "type",
    label: "Type",
    idealWidth: 100,
    minWidth: 80,
    priority: 4,
  },

  {
    key: "price",
    label: "Price",
    idealWidth: 100,
    minWidth: 80,
    priority: 5,
    render: (item: any) => `Rs. ${item.price}`,
  },

  {
    key: "exclude",
    label: "Exclude",
    idealWidth: 100,
    minWidth: 80,
    priority: 6,
    render: () => (
      <div className="flex justify-center">
        {/* Second checkbox: exclude */}
        <input
          type="checkbox"
          className="h-4 w-4"
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    ),
  },
];
const items = [
  {
    id: 1,
    name: "Pizza Margherita",
    variant: "Small",
    code: "AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 2,
    name: "Pizza  Margherita",
    variant: "Small",
    code: "AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 3,
    name: "Pizza  Pepperoni",
    variant: "Small",
    code: "AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 4,
    name: "Momo  Buff",
    variant: "Fry / Half",
    code: "AF7899",
    type: "Food",
    price: "Rs. 200",
  },
];
const PricelistEditModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Modal */}
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="text-center px-6 py-4 ">
          <h1 className="text-xl font-semibold text-gray-900  ">
            Update Pricelists
          </h1>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search items..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Add item */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Table */}
        <div className="min-h-0 flex-1 overflow-auto p-4">
          <div className="min-w-[750px] overflow-hidden rounded-lg border border-gray-200">
            <MsTable columns={editColumns} data={items} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricelistEditModal;
