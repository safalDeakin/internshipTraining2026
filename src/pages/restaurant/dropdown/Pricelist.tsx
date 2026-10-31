//author:shrajja
import "../../../component/table/styles/tableConent.css";
import { useState } from "react";
import Sidebar from "../../../component/ListView/Listview";
import SidebarHeader from "../../../component/ListView/ListViewHeader";
import SidebarList from "../../../component/ListView/ListViewList";
import SearchInput from "../../../component/ListView/SearchInput";
import MsTable from "../../../component/table/components/MsTable";
import {
  ArrowDownToLine,
  ArrowRight,
  Pencil,
  Printer,
  TextAlignJustify,
  Trash,
} from "lucide-react";
import PricelistEditModal from "../../test/PricelistEditModal";

const sidebarItems = [
  {
    id: "winter-special",
    label: "2024-Winter Special",
  },
  {
    id: "summer-special",
    label: "2024-Summer Special",
  },
  {
    id: "festival-special",
    label: "Festival Special",
  },
];
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
const items = [
  {
    id: 1,
    name: "Pizza Margherita",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 2,
    name: "Pizza  Margherita",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 3,
    name: "Pizza  Pepperoni",
    variant: "Small",
    code: "#AF7899",
    type: "Food",
    price: "Rs. 200",
  },
  {
    id: 4,
    name: "Momo  Buff",
    variant: "Fry / Half",
    code: "#AF7899",
    type: "Food",
    price: "Rs. 200",
  },
];

const Pricelist = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
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
    <section className="grid h-full min-h-0 w-full grid-cols-[280px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="min-h-0 border-r border-gray-200 bg-white">
        <Sidebar>
          <SidebarHeader title="Pricelist" />

          <SearchInput
            value={search}
            handleChange={setSearch}
            placeholder="Search pricelist..."
            className="mb-3 mt-3"
          />

          <SidebarList
            items={sidebarItems}
            selectedId={selectedId}
            getId={(item) => item.id}
            onSelect={(item) => setSelectedId(item.id)}
            renderItem={(item) => <span>{item.label}</span>}
          />
        </Sidebar>
      </aside>

      {/* Main content */}
      <main className="min-w-0 overflow-auto px-3 py-3">
        {/* Header / Actions */}
        <div className="flex flex-wrap items-center gap-3  p-4 bg-gray-100">
          {/* Pricelist information */}
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <p className="flex min-w-0 items-center gap-2 text-sm font-medium text-gray-800">
              <TextAlignJustify className="h-4 w-4 shrink-0" />

              <span className="truncate">2024-Winter Special</span>
            </p>

            <div className="flex shrink-0 items-center">
              <span className="rounded-full bg-[#D9B26A] px-3 py-1 text-[11px] font-semibold text-white">
                Tax I
              </span>

              <span className="-ml-2 rounded-full bg-[#1E8C86] px-3 py-1 text-[11px] font-semibold text-white">
                Active
              </span>
            </div>
          </div>

          {/* Divider */}
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

        {/* Pricelist details */}
        <div className="mt-3  p-5">
          {/* Description */}
          <div className="mb-5">
            <h2 className="mb-1 font-bold text-gray-900">Description</h2>

            <p className="max-w-5xl leading-6 text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate qui deserunt minus, quod sint tempore quis eaque amet
              similique ab rem non libero recusandae, sit est iusto iste
              consectetur quos?
            </p>
          </div>

          {/* Effective dates */}
          <div>
            <h2 className="mb-2 font-bold text-gray-900">Effective Dates</h2>

            <div className="flex items-center gap-3 text-gray-700">
              <span className=" px-3 py-1.5">2082/01/12</span>

              <ArrowRight className="h-4 w-4 text-gray-400" />

              <span className="px-3 py-1.5">2083/02/22</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-3 min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <MsTable
            columns={columns}
            data={items}
            selectedItems={selectedItems}
            onToggleItem={handleToggleItem}
            showSearchBar={true}
            searchType="All"
            onSearchTypeChange={() => {}}
            onChange={setItemSearch}
          />
        </div>
      </main>

      {/* Edit modal */}
      {isEditOpen && (
        <PricelistEditModal onClose={() => setIsEditOpen(false)} />
      )}
    </section>
  );
};

export default Pricelist;
