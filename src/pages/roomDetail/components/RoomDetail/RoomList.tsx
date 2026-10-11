import type { Room } from "../../types/roomDetail.types";
import RoomRow from "./RoomRow";

type RoomListProps = {
    rooms: Room[];
};

export default function RoomList({ rooms }: RoomListProps) {
    return (
        <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[17px] text-[#858585]">
                    Rooms (
                    <span className="text-[#00a54f]">
                        {rooms.length}
                    </span>
                    )
                </h2>

                <button className="font-semibold text-[#0675e8]">
                    + Options
                </button>
            </div>

            <div className="space-y-1.5">
                {rooms.map((room) => (
                    <RoomRow
                        key={room.id}
                        room={room}
                    />
                ))}
            </div>
        </section>
    );
}