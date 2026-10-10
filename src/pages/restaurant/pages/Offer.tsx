//author:shrajja
import { Outlet } from "react-router-dom";
import ListView from "../../../component/ListView/Listview";
import { useState } from "react";
import { initialData } from "../../../data/data";

const Offer = () => {
  const [search, setSearch] = useState("")
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

  const filteredOffers = initialData.filter((offer) =>
    offer.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  const handleOfferSelect = (offer: any) => {
    setSelectedOfferId(offer.id)
  }

  return (
    <div>
      <ListView
        title="Offers"
        items={filteredOffers}
        getKey={(offer) => offer.id}
        selectedId={selectedOfferId}
        onSelect={handleOfferSelect}
        onAdd={() => {
          console.log("Add offer");
        }}
        renderItem={(offer) => (
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[#29445f]">
              {offer.name}
            </span>
          </div>
        )}
        searchable
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search offers..."
      />

      <Outlet />
    </div>
  );
};

export default Offer;
