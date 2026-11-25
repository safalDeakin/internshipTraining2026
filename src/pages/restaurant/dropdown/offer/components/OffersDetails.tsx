// author: shrajja

import { useMemo, useState, type ReactNode } from "react";
import {
  Download,
  FileText,
  SquarePen,
  Plus,
  ListFilter,
  Search,
} from "lucide-react";

import type {
  InfoRow,
  OfferType,
  ApplicableOfferItem,
} from "../../types/DropdownTypes";

import ReusableButton from "../../../../../shell/shared/components/ReusableButton";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../lib/component/Container/Container";
import Scrollable from "../../../../../lib/component/scrollable/Scrollable";

// ------------------------------------------
// Section Title
// ------------------------------------------

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-4 font-semibold text-gray-800">{children}</h3>
);

// ------------------------------------------
// Information List
// ------------------------------------------

const InfoList = ({ rows }: { rows: InfoRow[] }) => (
  <div className="space-y-3">
    {rows.map((row) => (
      <p key={row.label} className="text-sm text-gray-600">
        {row.label}:{" "}
        <span className="font-medium text-gray-900">{row.value}</span>
      </p>
    ))}
  </div>
);

// ------------------------------------------
// Offer Information
// ------------------------------------------

const OfferInformation = ({ offer }: { offer: OfferType }) => (
  <section className="rounded-lg border border-gray-200 bg-white p-5">
    <SectionTitle>Offer Information</SectionTitle>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <InfoList rows={offer.leftInfo ?? []} />
      <InfoList rows={offer.rightInfo ?? []} />
    </div>
  </section>
);

// ------------------------------------------
// Usage Limit
// ------------------------------------------

const UsageLimit = ({ offer }: { offer: OfferType }) => (
  <section className="rounded-lg border border-gray-200 bg-white p-5">
    <SectionTitle>Usage Limit</SectionTitle>

    <InfoList rows={offer.usageLimits ?? []} />
  </section>
);

// ------------------------------------------
// Applicable Item Table
// ------------------------------------------

interface ApplicableItemTableProps {
  items: ApplicableOfferItem[];
  onAddItem?: () => void;
}

const ApplicableItemTable = ({
  items,
  onAddItem,
}: ApplicableItemTableProps) => {
  const [search, setSearch] = useState("");

  // Filter applicable items
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [items, search]);

  return (
    <section className=" rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <ListFilter size={17} className="text-gray-600" />

          <h3 className="font-semibold text-gray-800">Applicable Item</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-36 rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Add Item */}
          <button
            type="button"
            onClick={onAddItem}
            disabled={!onAddItem}
            className="flex items-center gap-1 rounded-md border border-blue-200 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={14} />
            Add Item
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <table className="w-full min-w-[750px] text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">S.N</th>

              <th className="px-4 py-3 text-left font-medium">Item Name</th>

              <th className="px-4 py-3 text-left font-medium">Category</th>

              <th className="px-4 py-3 text-center font-medium">
                Mini Qty Order
              </th>

              <th className="px-4 py-3 text-center font-medium">Cash Back %</th>

              <th className="px-4 py-3 text-center font-medium">
                Cash Back Amt
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-blue-600">{index + 1}</td>

                  <td className="px-4 py-3 text-blue-600">{item.itemName}</td>

                  <td className="px-4 py-3 text-gray-700">{item.category}</td>

                  <td className="px-4 py-3 text-center">{item.minQtyOrder}</td>

                  <td className="px-4 py-3 text-center">
                    {item.cashBackPercent}%
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.cashBackAmount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No applicable items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ------------------------------------------
// Offer Details Props
// ------------------------------------------

interface OffersDetailsProps {
  offer: OfferType;

  onAddItem?: (offer: OfferType) => void;
  onEdit?: (offer: OfferType) => void;
  onExportCSV?: (offer: OfferType) => void;
  onDownloadPDF?: (offer: OfferType) => void;
}

// ------------------------------------------
// Offer Details Page
// ------------------------------------------

const OffersDetails = ({
  offer,
  onAddItem,
  onEdit,
  onExportCSV,
  onDownloadPDF,
}: OffersDetailsProps) => {
  return (
    <>
      {/* Header */}
      <Toolbar
        left={
          <h1 className="font-semibold text-gray-800">
            {offer.name}{" "}
            <span className="font-normal text-gray-500">({offer.code})</span>
          </h1>
        }
        right={
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <ReusableButton
              variant="outline"
              size="sm"
              icon={<Download size={13} />}
              onClick={() => onExportCSV?.(offer)}
            >
              Export CSV
            </ReusableButton>

            <ReusableButton
              variant="outline"
              size="sm"
              icon={<FileText size={13} />}
              onClick={() => onDownloadPDF?.(offer)}
            >
              Download PDF
            </ReusableButton>

            <ReusableButton
              variant="outline"
              size="sm"
              icon={<SquarePen size={13} />}
              onClick={() => onEdit?.(offer)}
            >
              Edit Item Settings
            </ReusableButton>
          </div>
        }
      />

      {/* Details */}
      <Container type="box" background="surface-default">
        <div className="flex min-w-0 flex-col gap-5">
          <OfferInformation offer={offer} />

          <UsageLimit offer={offer} />

          <ApplicableItemTable
            items={offer.applicableItems ?? []}
            onAddItem={onAddItem ? () => onAddItem(offer) : undefined}
          />
        </div>
      </Container>
    </>
  );
};

export default OffersDetails;
