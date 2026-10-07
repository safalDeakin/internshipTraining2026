import type { Amenity } from "../../types/roomDetail.types";
import Icon from "./Icon";

type AmenityChipProps = {
    amenity: Amenity;
};

export default function AmenityChip({
    amenity,
}: AmenityChipProps) {
    return (
        <div className="flex h-11 items-center gap-2 rounded-lg border border-[#dfdfdf] bg-white px-5 text-[15px] text-[#383838] shadow-sm">
            <Icon
                name={amenity.icon}
                className="h-6 w-6 text-black"
            />
            <span>{amenity.label}</span>
        </div>
    );
}


