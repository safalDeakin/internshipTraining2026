import { DoorClosed } from "lucide-react";
import type { Room } from "../../types/roomDetail.types";
import Icon from "../common/Icon";


type RoomRowProps = {
    room: Room;
};

export default function RoomRow({ room }: RoomRowProps) {
    return (
        <article className="flex min-h-34.5 items-start gap-5 bg-[#fbfbfb] px-5 py-4 shadow-[0_1px_10px_rgba(0,0,0,0.025)]">
            <DoorClosed size={70} />

            <div className="flex-1 text-[15px] leading-[1.42] text-[#969696]">
                <h3 className="mb-2 text-[17px] font-medium text-[#4b4b4b]">
                    {room.name}
                </h3>

                <p>Floor: {room.floor}</p>
                <p>Bed type: {room.bedType}</p>
                <p>Max Occupancy: {room.maxOccupancy}</p>
                <p>Extra Amenities: {room.extraAmenities}</p>
            </div>

            <div className="flex items-center gap-4 pt-1 text-[#1677ff]">
                <button
                    className="cursor-pointer"
                    aria-label={`Edit ${room.name}`}
                >
                    <Icon name="edit" className="h-6 w-6" />
                </button>

                <button
                    className="cursor-pointer text-2xl font-light leading-none"
                    aria-label={`Remove ${room.name}`}
                >
                    −
                </button>
            </div>
        </article>
    );
}