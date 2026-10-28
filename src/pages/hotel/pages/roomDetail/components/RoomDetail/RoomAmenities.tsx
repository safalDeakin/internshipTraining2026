import type { Amenity } from "../../types/roomDetail.types";
import AmenityChip from "../common/AmenityChip";
import Icon from "../common/Icon";

type RoomAmenitiesProps = {
    amenities: Amenity[];
};

export default function RoomAmenities({
    amenities,
}: RoomAmenitiesProps) {
    return (
        <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[17px] text-[#858585]">
                    General Amenities&nbsp; ({amenities.length} items)
                </h2>

                <button className="border-b border-[#0066d9] text-[15px] text-[#0066d9]">
                    + Edit Amenities
                </button>
            </div>

            <div className="flex min-h-18.75 items-center justify-between gap-4 bg-[#fbfbfb] px-4">
                <div className="flex flex-wrap gap-2.5">
                    {amenities.map((amenity) => (
                        <AmenityChip
                            key={amenity.id}
                            amenity={amenity}
                        />
                    ))}
                </div>

                <button
                    className="text-[#1677ff]"
                    aria-label="Edit amenities"
                >
                    <Icon
                        name="edit"
                        className="h-6 w-6"
                    />
                </button>
            </div>
        </section>
    );
}