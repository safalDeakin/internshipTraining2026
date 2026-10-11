import type { RoomDetailData } from "../../types/roomDetail.types";
import Icon from "../common/Icon";

type RoomHeaderProps = {
    data: RoomDetailData;
};

export default function RoomHeader({
    data,
}: RoomHeaderProps) {
    return (
        <header>
            <div className="flex items-start justify-between">
                <h1 className="flex items-center gap-2 text-[20px] font-medium text-[#303030]">
                    <Icon
                        name="bed"
                        className="h-6 w-6 text-black"
                    />

                    {data.name}

                    <span className="font-normal text-[#a1a1a1]">
                        ( {data.code} )
                    </span>
                </h1>

                <button className="font-semibold text-[#1677ff]">
                    Edit
                </button>
            </div>

            <p className="mt-3 max-w-197.5 text-[17px] leading-[1.45] text-[#969696]">
                {data.description}
            </p>

            <div className="mt-7 text-[17px] leading-normal text-[#969696]">
                <p>
                    Base Occupancy: {data.baseOccupancy}
                </p>

                <p>
                    Max Occupancy: {data.maxOccupancy}
                </p>
            </div>
        </header>
    );
}