import { useState } from "react";
import { Search } from "lucide-react";
import { useOffer } from "../hooks/useOffer";

const ListHeroSection = () => {
    const { setSearch, filteredOffers } = useOffer();
    const [activeId, setActiveId] = useState<number>(1);



    return (
        <div className="offer-list-container">
            <div className="search-container">
                <Search
                    className="search-icon"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search price lists..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <nav className="offers">
                {filteredOffers.map((offer: any) => {
                    const isActive = activeId === offer.id;
                    return (
                        <button
                            key={offer.id}
                            className={`offer-item ${isActive ? "active" : ""}`}
                            onClick={() => setActiveId(offer.id)}
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