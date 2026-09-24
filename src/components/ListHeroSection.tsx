// import { useState } from "react";
import { Search } from "lucide-react";
import { useOffer } from "../hooks/useOffer";
import { useNavigate, useParams } from "react-router-dom";
import { useOrganization } from "../context/OrganizationContext";

const ListHeroSection = () => {
  const { setSearch, filteredOffers } = useOffer();
  // const [activeId, setActiveId] = useState<number>(1);
  console.log("filteredOffers:", filteredOffers);
  const navigate = useNavigate();
  const { id } = useParams();
  const { organization } = useOrganization();
  const storedId = localStorage.getItem("selectedOfferId");
  const selId = id ? Number(id) : Number(storedId);
  const handleOfferClick = (id: number) => {
    localStorage.setItem("selectedOfferId", String(id));
    navigate(`/${organization?.slug}/restaurant/offer/${id}`);
  };
  return (
    <div className="p-2">
      <div className=" flex justify-center items-center gap-2  border border-gray-600  rounded-2xl p-2">
        <Search className="search-icon" size={12} />
        <input
          type="text"
          placeholder="Search price lists..."
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none"
        />
      </div>

      <nav className="offers bg-gray-100 p-2 flex flex-col">
        {filteredOffers.map((offer: any) => {
          const isActive = selId === offer.id;
          return (
            <button
              key={offer.id}
              className={`offer-item p-2 ${isActive ? "bg-blue-200" : ""}`}
              onClick={() => handleOfferClick(offer.id)}
            >
              {offer.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ListHeroSection;
