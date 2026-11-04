// author: shrajja

import MasterDetailView from "../../../../../component/MasterDetailView/MasterDetailView";

import { useOffer } from "../context/useOffer";
import type { Offer } from "../data/initialOfferData";

import ListHeader from "./ListHeader";
import OffersDetails from "./OffersDetails";

const Offer = () => {
  const { filteredOffers, loading, search, setSearch } = useOffer();

  if (loading) {
    return <div className="p-5 text-sm text-gray-500">Loading offers...</div>;
  }

  return (
    <MasterDetailView<Offer, number>
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
      headerChildren={null}
    />
  );
};

export default Offer;
