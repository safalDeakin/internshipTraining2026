// import { useState } from "react";
import { Search } from "lucide-react";
import { useOffer } from "../hooks/useOffer";
import { useNavigate, useParams } from "react-router-dom";

const ListHeroSection = () => {
  const { setSearch, filteredOffers } = useOffer();
  // const [activeId, setActiveId] = useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const storedId = localStorage.getItem("selectedOfferId");
  const selId = id ? Number(id) : Number(storedId);
  const handleOfferClick = (id: number) => {
    localStorage.setItem("selectedOfferId", String(id));
    navigate(`/restaurant/offer/${id}`);
  };
  return (
    <div className="offer-list-container">
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search price lists..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <nav className="offers">
        {filteredOffers.map((offer: any) => {
          const isActive = selId === offer.id;
          return (
            <button
              key={offer.id}
              className={`offer-item ${isActive ? "active" : ""}`}
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
