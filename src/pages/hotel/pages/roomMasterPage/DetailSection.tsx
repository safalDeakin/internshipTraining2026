import type { RoomDetailModel } from "./model/RoomModel";
import RoomAmenities from "./components/RoomAmenities";
import RoomHeader from "./components/RoomHeader";
import RoomList from "./components/RoomList";

type DetailSectionProps = {
    data: RoomDetailModel;
};

export function DetailSection({
    data,
}: DetailSectionProps) {
    return (
        <main className="mt-5 min-h-243 flex-1 bg-white px-9 py-10">
            <div className="max-w-200">
                <RoomHeader name={data.name}
                    description={data.description}
                    code={data.code}
                    maxOccupancy={data.maxOccupancy}
                    baseOccupancy={data.baseOccupancy} />

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
        </main>);
}