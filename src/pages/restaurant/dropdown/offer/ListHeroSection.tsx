import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOffer } from "../../../../hooks/useOffer";
import { useAuth } from "../../../../utils/secureclient/useAuth";
import type { Offer } from "../../../../store/OfferState";
import Sidebar from "../../../../component/ListView/Listview";
import SearchInput from "../../../../component/ListView/SearchInput";
import SidebarList from "../../../../component/ListView/ListViewList";

const ListHeroSection = () => {
  const { setSearch, filteredOffers } = useOffer();

  const navigate = useNavigate();
  const { id } = useParams();
  const { organization } = useAuth();

  const [search, setSearchValue] = useState("");

  const selectedId = id ?? localStorage.getItem("selectedOfferId") ?? undefined;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSearch(value);
  };

  const handleOfferClick = (offer: Offer) => {
    localStorage.setItem("selectedOfferId", String(offer.id));

    navigate(`/${organization?.slug}/restaurant/offer/${offer.id}`);
  };

  return (
    <Sidebar className="rounded border border-[#e1e7ed] p-2">
      <div className="p-2">
        <SearchInput
          value={search}
          handleChange={handleSearchChange}
          placeholder="Search offers..."
          className="mb-3"
        />

        <SidebarList<Offer>
          items={filteredOffers}
          selectedId={selectedId}
          getId={(offer) => String(offer.id)}
          onSelect={handleOfferClick}
          renderItem={(offer) => <span>{offer.name}</span>}
        />
      </div>
    </Sidebar>
  );
};

export default ListHeroSection;
