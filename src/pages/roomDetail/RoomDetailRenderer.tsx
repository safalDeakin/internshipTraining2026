import RoomDetail from "./components/RoomDetail/RoomDetail";
import { useRoomDetail } from "./hooks/useRoomDetail";

export default function RoomDetailRenderer() {
    const roomDetail = useRoomDetail();

    return <RoomDetail {...roomDetail} />;
}