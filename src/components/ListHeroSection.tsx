import { Search } from "lucide-react";
import { useOffer } from "../hooks/useOffer";
import { useNavigate, useParams } from "react-router-dom";

const ListHeroSection = () => {
  const { setSearch, filteredOffers } = useOffer();

  const navigate = useNavigate();
  const { id } = useParams();

  const storedId = localStorage.getItem("selectedOfferId");

  const selId = id
    ? Number(id)
    : storedId
      ? Number(storedId)
      : null;

  const handleOfferClick = (id: number) => {
    localStorage.setItem("selectedOfferId", String(id));
    navigate(`/restaurant/offer/${id}`);
  };

  return (
    <div className="min-h-svh rounded border border-[#e1e7ed] bg-white p-2">
      <div className="p-2">

        {/* Search */}
        <div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
          <Search
            size={18}
            className="mr-2 shrink-0 text-[#9ba7b5]"
          />

          <input
            type="text"
            placeholder="Search price lists..."
            className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Offer List */}
        <nav className="flex flex-col">
          {filteredOffers.map((offer: any) => {
            const isActive = selId === offer.id;

            return (
              <button
                key={offer.id}
                type="button"
                onClick={() => handleOfferClick(offer.id)}
                className={`
                  flex
                  min-h-12
                  w-full
                  items-center
                  px-3
                  text-left
                  text-[15px]
                  text-[#29445f]
                  transition-colors
                  cursor-pointer
                  ${
                    isActive
                      ? "rounded-[5px] border border-[#2779e6] bg-[#f5f9ff]"
                      : "border-0 border-b border-[#e5e9ed] bg-white hover:bg-[#f7faff]"
                  }
                `}
              >
                {offer.name}
              </button>
            );
          })}
        </nav>

      </div>
    </div>
  );
};

export default ListHeroSection;