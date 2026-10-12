import RoomDetail from "./components/RoomDetail/RoomDetail";
import { RoomDetailProvider } from "./context/RoomDetailProvider";
import { useRoomDetailContext } from "./context/RoomDetailContext";

function RoomDetailContent() {
    const roomDetail = useRoomDetailContext();

    return <RoomDetail {...roomDetail} />;
}

export default function RoomDetailRenderer() {
    return (
        <RoomDetailProvider>
            <RoomDetailContent />
        </RoomDetailProvider>
    );
}