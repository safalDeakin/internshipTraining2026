import { RoomStatusProvider } from "../context/RoomStatusContext"
import { RoomsDetail } from "./RoomsDetail"

const RoomsDetailRenderer = () => {
    return (
        <RoomStatusProvider>
            <RoomsDetail />
        </RoomStatusProvider>
    )
}

export default RoomsDetailRenderer