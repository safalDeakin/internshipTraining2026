import type { RoomDetailData } from "../../types/roomDetail.types";
import RoomSidebar from "../RoomSidebar/RoomSidebar";

import RoomHeader from "./RoomHeader";
import RoomAmenities from "./RoomAmenities";
import RoomList from "./RoomList";

type RoomDetailProps = {
    data: RoomDetailData;
    searchQuery: string;
    selectedProductId: string;
    onSearchChange: (value: string) => void;
    onSelectProduct: (id: string) => void;
};

export default function RoomDetail({
    data,
    searchQuery,
    selectedProductId,
    onSearchChange,
    onSelectProduct,
}: RoomDetailProps) {
    return (
        <div className="flex min-h-screen bg-[#f6f6f6] text-[#4a4a4a]">
            {/* LEFT SIDEBAR */}
            <RoomSidebar
                rooms={data.products}
                searchQuery={searchQuery}
                selectedRoomId={selectedProductId}
                onSearchChange={onSearchChange}
                onSelectRoom={onSelectProduct}
            />

            {/* RIGHT CONTENT */}
            <main className="mt-5 min-h-243 flex-1 bg-white px-9 py-10">
                <div className="max-w-200">
                    <RoomHeader data={data} />

                    <RoomAmenities
                        amenities={data.amenities}
                    />

                    <RoomList
                        rooms={data.rooms}
                    />

                    <footer className="mt-3 text-[13px] leading-7 text-[#444]">
                        <p>
                            Created By: {data.createdBy}
                        </p>

                        <p>
                            Created DateTime: {data.createdAt}
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}