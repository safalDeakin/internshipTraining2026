import { ArrowRight, Plus } from "lucide-react";
import { useOffer } from "../hooks/useOffer";

const ListHeader = () => {
    const { addOffer } = useOffer();

    const handleAdd = () => {
        addOffer("2025-New Special");
    };

    return (
        <div className="offer-header">
            <div className="offer-title">
                <ArrowRight
                    size={32}
                    strokeWidth={1.5}
                />
                <span>Offers</span>
            </div>
            <button
                className="add-button"
                onClick={handleAdd}
            >
                <Plus
                    size={18}
                    strokeWidth={1.5}
                />
            </button>

        </div>
    );
};

export default ListHeader;