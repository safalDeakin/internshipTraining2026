// author: shrajja

import { Plus } from "lucide-react";

import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import type { OfferType } from "../../types/DropdownTypes";
import { useOffer } from "../context/useOffer";
import OffersDetails from "./OffersDetails";

import OfferAddModal, {
  type OfferFormData,
} from "../../../modal/dropdown/OfferAddModal";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

const OfferLayout = () => {
  const { filteredOffers, loading, search, setSearch } = useOffer();

  const { showDialog, closeDialog } = useDialogBox();

  // Handle offer submission
  const handleOfferSubmit = (data: OfferFormData) => {
    console.log("Registered Offer:", data);

    // TODO: Call offer registration context/API here.
  };

  // Open Create Offer Dialog
  const handleAddOffer = async () => {
    const result = await showDialog<OfferFormData>({
      title: "Create Offer",
      width: 530,
      showHeader: false,
      closeOnBackdrop: true,
      closeOnEscape: true,

      content: (
        <OfferAddModal
          onClose={() => closeDialog()}
          onConfirm={(data) => closeDialog(data)}
          labels={[
            { label: "General", val: "general" },
            { label: "Seasonal", val: "seasonal" },
            { label: "Promotional", val: "promotional" },
          ]}
        />
      ),
    });

    if (result) {
      handleOfferSubmit(result);
    }
  };

  if (loading) {
    return <div className="p-5 text-sm text-gray-500">Loading offers...</div>;
  }

  return (
    <MasterDetailView<OfferType, number>
      title="Offers"
      items={filteredOffers}
      searchQuery={search}
      onSearchChange={setSearch}
      getId={(item) => item.id}
      listItemBuilder={(item) => <span>{item.name}</span>}
      detailContentBuilder={(selectedId) => {
        const selectedOffer = filteredOffers.find(
          (item) => item.id === selectedId,
        );

        if (!selectedOffer) {
          return <p className="p-5 text-sm text-gray-500">Offer not found.</p>;
        }

        return <OffersDetails offer={selectedOffer} />;
      }}
      headerChildren={
        <button
          type="button"
          onClick={handleAddOffer}
          className="p-2 rounded-md text-blue-600 border border-gray-300 hover:bg-gray-100"
          title="Add Offer"
        >
          <Plus size={18} />
        </button>
      }
    />
  );
};

export default OfferLayout;
