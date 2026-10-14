
import { DataTable, type DataTableColumn } from "../../../../component/table/DataTable/DataTable";
import type { RoomRate } from "../../types/types";
import ModalShell from "./ModalShell";

interface RoomDetailRow {
    id: string;
    serialNumber: number;
    roomNumber: string;
    floor: number;
}

interface Props {
    room: RoomRate;
    close: () => void;
}

export default function RoomDetailsModal({ room, close }: Props) {
    const rooms: RoomDetailRow[] = room.roomNumbers.map(
        (room, index) => ({
            id: room.number,
            serialNumber: index + 1,
            roomNumber: room.number,
            floor: room.floor,
        }),
    );

    const columns: DataTableColumn<RoomDetailRow>[] = [
        {
            key: "serialNumber",
            header: "S.N",
            render: (room) => room.serialNumber,
        },
        {
            key: "roomNumber",
            header: "Room No",
            render: (room) => <strong>{room.roomNumber}</strong>,
        },
        {
            key: "floor",
            header: "Floor",
            render: (room) => room.floor,
        },
    ];

    return (
        <ModalShell
            close={close}
            subtitle={room.code}
            title={`${room.name} - Room Details`}
        >
            <DataTable
                columns={columns}
                emptyMessage="No rooms available."
                getRowId={(room) => room.id}
                rows={rooms}
            />
        </ModalShell>
    );
}
