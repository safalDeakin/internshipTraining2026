// author: shrajja

import { useEffect, useMemo, useState, type ReactNode } from "react";

import {
  Download,
  FileText,
  SquarePen,
  Plus,
  Search,
  ListFilter,
} from "lucide-react";

import type {
  InfoRow,
  OfferType,
  ApplicableOfferItem,
  ApplicationItemOption,
} from "../../types/DropdownTypes";

import ReusableButton from "../../../../../shell/shared/components/ReusableButton";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../lib/component/Container/Container";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

import { useOffer } from "../context/useOffer";
import AddApplicationItemModal from "../../../modal/dropdown/AddApplicationItemModal";

// --------------------------------------------------
// Section Title
// --------------------------------------------------

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-3 text-sm font-semibold text-gray-800">{children}</h3>
);

// --------------------------------------------------
// Information List
// --------------------------------------------------

const InfoList = ({ rows }: { rows: InfoRow[] }) => (
  <div className="space-y-2">
    {rows.map((row) => (
      <p key={row.label} className="text-xs text-gray-600">
        {row.label}:{" "}
        <span className="font-medium text-gray-900">{row.value}</span>
      </p>
    ))}
  </div>
);

// --------------------------------------------------
// Applicable Items Table
// --------------------------------------------------

interface ApplicableItemsTableProps {
  items: ApplicableOfferItem[];
  onAddItem: () => void;
}

const ApplicableItemsTable = ({
  items,
  onAddItem,
}: ApplicableItemsTableProps) => {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [items, search]);

  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <ListFilter size={15} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-800">
            Applicable Item
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border px-2">
            <Search size={13} className="text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="w-24 py-1.5 text-xs outline-none sm:w-32"
            />
          </div>

          <ReusableButton
            variant="outline"
            size="sm"
            icon={<Plus size={13} />}
            onClick={onAddItem}
          >
            Add Item
          </ReusableButton>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-xs">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">S.N</th>
              <th className="px-4 py-3 font-medium">Item Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 text-center font-medium">
                Min Qty Order
              </th>
              <th className="px-4 py-3 text-center font-medium">Cash Back %</th>
              <th className="px-4 py-3 text-right font-medium">
                Cash Back Amt
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-500">{index + 1}</td>
                <td className="px-4 py-2.5 font-medium text-blue-600">
                  {item.itemName}
                </td>
                <td className="px-4 py-2.5 text-gray-600">{item.category}</td>
                <td className="px-4 py-2.5 text-center">{item.minQtyOrder}</td>
                <td className="px-4 py-2.5 text-center">
                  {item.cashBackPercent}%
                </td>
                <td className="px-4 py-2.5 text-right">
                  {item.cashBackAmount}
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No applicable items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t px-4 py-2 text-xs text-gray-500">
        Total Items: {items.length}
      </div>
    </section>
  );
};

// --------------------------------------------------
// Offer Details Page
// --------------------------------------------------

interface OffersDetailsProps {
  offer: OfferType;
  products: ApplicationItemOption[];
}

const OffersDetails = ({ offer, products }: OffersDetailsProps) => {
  const { showDialog, closeDialog } = useDialogBox();
  const { addApplicableItems } = useOffer();

  const [applicableItems, setApplicableItems] = useState<ApplicableOfferItem[]>(
    offer.applicableItems ?? [],
  );

  // Synchronize when selected offer changes.
  useEffect(() => {
    setApplicableItems(offer.applicableItems ?? []);
  }, [offer.id, offer.applicableItems]);

  // Open Add Application Item modal.
  const handleAddItem = async () => {
    await showDialog({
      title: "Add Applicable Item",
      width: 550,
      showHeader: false,
      closeOnBackdrop: true,
      closeOnEscape: true,

      content: (
        <AddApplicationItemModal
          products={products}
          existingItems={applicableItems}
          onClose={closeDialog}
          onConfirm={async (selectedProducts) => {
            // Convert selected options to applicable offer items.
            const newItems: ApplicableOfferItem[] = selectedProducts
              .filter(
                (product) =>
                  !applicableItems.some(
                    (item) => item.productId === product.id,
                  ),
              )
              .map((product) => ({
                id: `item-${product.id}`,
                productId: product.id,
                itemName: product.name,
                category: "-",
                minQtyOrder: 1,
                cashBackPercent: 0,
                cashBackAmount: 0,
              }));

            if (newItems.length === 0) return;

            // Save through Offer Provider.
            const success = await addApplicableItems(offer.id, newItems);

            if (!success) return;

            // Update table after successful save.
            setApplicableItems((previous) => [...previous, ...newItems]);

            closeDialog();
          }}
        />
      ),
    });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      {/* Fixed Toolbar */}
      <div className="shrink-0">
        <Toolbar
          left={
            <h1 className="font-semibold">
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
                onClick={() => console.log("Export CSV")}
              >
                Export CSV
              </ReusableButton>

              <ReusableButton
                variant="outline"
                size="sm"
                icon={<FileText size={13} />}
                onClick={() => console.log("Download PDF")}
              >
                Download PDF
              </ReusableButton>
            </div>
          }
        />
      </div>

      {/* Scrollable Content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <Container type="box" background="surface-default">
          {/* Offer Information */}
          <section className="rounded-lg border border-gray-200 bg-white p-4">
            <SectionTitle>Offer Information</SectionTitle>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoList rows={offer.leftInfo ?? []} />
              <InfoList rows={offer.rightInfo ?? []} />
            </div>
          </section>

          {/* Usage Limit */}
          <section className="mt-5 rounded-lg border border-gray-200 bg-white p-4">
            <SectionTitle>Usage Limit</SectionTitle>

            <div className="space-y-2">
              {(offer.usageLimits ?? []).map((row) => (
                <p key={row.label} className="text-xs text-gray-500">
                  {row.label}:{" "}
                  <span className="text-gray-700">{row.value}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Applicable Items */}
          <ApplicableItemsTable
            items={applicableItems}
            onAddItem={handleAddItem}
          />
        </Container>
      </div>
    </div>
  );
};

export default OffersDetails;
