// author: shrajja

import PricelistDetails from "./PricelistDetails";
import usePricelist from "../context/usePricelist";
import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import type { PricelistType } from "../../types/DropdownTypes";
import { Plus } from "lucide-react";

import PricelistAddModal, {
  type PricelistFormData,
} from "../../../modal/dropdown/PricelistAddModal";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

const PricelistLayout = () => {
  const { filteredPricelists, loading, search, setSearch } = usePricelist();

  const { showDialog, closeDialog } = useDialogBox();

  // Handle pricelist submission
  const handlePricelistSubmit = (data: PricelistFormData) => {
    console.log("Registered Pricelist:", data);

    // TODO: Call pricelist registration context/API here.
  };

  // Open Add Pricelist Dialog
  const handleAddPricelist = async () => {
    await showDialog({
      title: "Add PriceList-Form",
      width: 420,
      showHeader: false,
      closeOnBackdrop: true,
      closeOnEscape: true,

      content: (
        <PricelistAddModal
          onClose={() => closeDialog()}
          onConfirm={(formData) => {
            handlePricelistSubmit(formData);
            closeDialog();
          }}
          templates={[{ label: "Empty Pricelist", val: "empty" }]}
        />
      ),
    });
  };
  if (loading) {
    return (
      <div className="p-5 text-sm text-gray-500">Loading pricelists...</div>
    );
  }

  return (
    <MasterDetailView<PricelistType, string>
      title="Pricelist"
      items={filteredPricelists}
      searchQuery={search}
      onSearchChange={setSearch}
      getId={(item) => item.id}
      listItemBuilder={(item) => <span>{item.name}</span>}
      detailContentBuilder={(selectedId) => {
        const selectedPricelist = filteredPricelists.find(
          (item) => item.id === selectedId,
        );

        if (!selectedPricelist) {
          return (
            <p className="p-5 text-sm text-gray-500">Pricelist not found.</p>
          );
        }

        return <PricelistDetails pricelist={selectedPricelist} />;
      }}
      headerChildren={
        <button
          type="button"
          onClick={handleAddPricelist}
          className="p-2 rounded-md text-blue-600 border border-gray-300 hover:bg-gray-100"
          title="Add Pricelist"
        >
          <Plus size={18} />
        </button>
      }
    />
  );
};

export default PricelistLayout;
