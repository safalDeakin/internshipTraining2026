import { ArrowRight, Plus } from "lucide-react";
// import { useOffer } from "../hooks/useOffer";

export default function ReservationSidebarHeader (){
    //   const { addOffer } = useOffer();

    const handleAdd = () => {
        // addOffer("2025-New Special");
        console.log("Added item!!")
    };

    return (
        <div className="flex items-center h-6 justify-between">

            {/**Left Side */}
            <div className="flex items-center gap-3 text-[#0066b3] text-xl font-medium">
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                />
                <span className="text-[12px]font-medium text-[#0066B3]">All Reservations</span>
            </div>

            {/**Right Side Add button */}
            <button
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white cursor-pointer hover:bg-[#f3f7fb] "
                onClick={handleAdd}
            >
                <Plus
                    size={20}
                    strokeWidth={2}
                    className="text-[#0066B3]"
                />
            </button>

        </div>
    );
};

