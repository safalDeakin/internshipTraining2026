import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../component/ListView/Listview";
import SidebarList from "../component/ListView/ListViewList";
import SearchInput from "../component/ListView/SearchInput";

import { useOffer } from "../hooks/useOffer";
import type { Offer } from "../store/OfferState";
import { useAuth } from "../utils/secureclient/useAuth";

const ListHeroSection = () => {
    const { setSearch, filteredOffers } = useOffer();

    const navigate = useNavigate();
    const { id } = useParams();
    const { organization } = useAuth();

    const storedId = localStorage.getItem("selectedOfferId");

    const selId = id
        ? Number(id)
        : storedId
            ? Number(storedId)
            : null;

    const [search, setSearchValue] = useState("");

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        setSearch(value);
    };

    const handleOfferClick = (offer: Offer) => {
        localStorage.setItem("selectedOfferId", String(offer.id));

        navigate(
            `/${organization?.slug}/restaurant/offer/${offer.id}`
        );
    };

    return (
        <Sidebar className="rounded border border-[#e1e7ed] p-2">
            <div className="p-2">

                {/* Search */}
                <SearchInput
                    value={search}
                    handleChange={handleSearchChange}
                    placeholder="Search price lists..."
                    className="mb-3"
                />

                {/* Offer List */}
                <SidebarList<Offer>
                    items={filteredOffers}
                    selectedId={
                        selId !== null
                            ? String(selId)
                            : undefined
                    }
                    getId={(offer) => String(offer.id)}
                    onSelect={handleOfferClick}
                    renderItem={(offer) => (
                        <span>{offer.name}</span>
                    )}
                />

            </div>
        </Sidebar>
    );
};

export default ListHeroSection;