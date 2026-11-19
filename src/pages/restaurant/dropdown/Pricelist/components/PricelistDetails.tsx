// author: shrajja

import {
  ArrowDownToLine,
  ArrowRight,
  Pencil,
  Printer,
  TextAlignJustify,
  Trash,
} from "lucide-react";

import MsTable from "../../../../../lib/component/table/components/MsTable";
import PricelistEditModal from "../../../modal/dropdown/PricelistEditModal";

import ReusableButton from "../../../../../shell/shared/components/ReusableButton";
import type { PricelistType } from "../../types/DropdownTypes";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import React from "react";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../lib/component/Container/Container";

interface PricelistDetailsProps {
  pricelist: PricelistType;
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
  const { showDialog, closeDialog } = useDialogBox();

  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  const handleToggleItem = (id: number) => {
    setSelectedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  };

  // Open edit pricelist dialog
  const handleEditPricelist = () => {
    showDialog({
      title: "Update Pricelists",
      content: (
        <PricelistEditModal
          onClose={() => closeDialog()}
          items={pricelist.items ?? []}
        />
      ),
      width: 1100,
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header / Actions */}
      <Toolbar
        left={
          <div className="flex gap-2">
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
        }
        right={
          <div className="flex flex-wrap items-center gap-2">
            <ReusableButton
              variant="outline"
              size="sm"
              icon={<ArrowDownToLine size={16} />}
            >
              Export CSV
            </ReusableButton>

            <ReusableButton
              variant="outline"
              size="sm"
              icon={<Printer size={16} />}
            >
              Print PDF
            </ReusableButton>

            <ReusableButton
              variant="primary"
              size="sm"
              icon={<Pencil size={16} />}
              onClick={handleEditPricelist}
            >
              Edit
            </ReusableButton>

            <ReusableButton
              variant="danger"
              size="sm"
              icon={<Trash size={16} />}
            >
              Delete
            </ReusableButton>
          </div>
        }
      />

      {/* Pricelist Details */}
      <Container type="box" background="surface-default">
        <div className="mt-3 ">
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
      </Container>

      {/* Table */}
      <Container type="box" background="surface-default">
        <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <MsTable
            columns={columns}
            data={pricelist.items ?? []}
            selectedItems={selectedItems}
            onToggleItem={handleToggleItem}
            showSearchBar={true}
            searchType="All"
            onSearchTypeChange={() => {}}
          />
        </div>
      </Container>
    </div>
  );
};

export default PricelistDetails;
