// author: shrajja

import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import type { OfferType } from "../../types/DropdownTypes";
import { useOffer } from "../context/useOffer";
import OffersDetails from "./OffersDetails";

const OfferLayout = () => {
  //data from context
  const { filteredOffers, loading, search, setSearch } = useOffer();

  if (loading) {
    return <div className="p-5 text-sm text-gray-500">Loading offers...</div>;
  }

  return (
    <MasterDetailView<OfferType, number>
      title="Offers"
      items={filteredOffers}
      searchQuery={search}
      onSearchChange={setSearch}
      //Get the ID of each offer
      getId={(item) => item.id}
      //Display each offer in the list
      listItemBuilder={(item) => <span>{item.name}</span>}
      //details of that offer appear on the right side.
      detailContentBuilder={(selectedId) => {
        const selectedOffer = filteredOffers.find(
          (item) => item.id === selectedId,
        );

        if (!selectedOffer) {
          return <p className="p-5 text-sm text-gray-500">Offer not found.</p>;
        }

        return <OffersDetails offer={selectedOffer} />;
      }}
      //header of master details view
      headerChildren={null}
    />
  );
};

export default OfferLayout;
