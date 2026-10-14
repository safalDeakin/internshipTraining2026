import { DataTable, type DataTableColumn, type DataTableRowId } from "../../../../../component/table/DataTable/DataTable";
import type { Room } from "../model/roomStatusTypes";

interface RoomTableProps {
    rooms: Room[];
    selectedRoomIds: Set<number>;
    onToggle: (id: number) => void;
    onToggleAll: () => void;
}

const statusClass = (status: Room["status"]) => status.toLowerCase().replaceAll(" ", "-");

export function RoomTable({ rooms, selectedRoomIds, onToggle, onToggleAll }: RoomTableProps) {
    const columns: DataTableColumn<Room>[] = [
        {
            key: "room",
            header: "Room",
            render: (room) => <strong>{room.number}</strong>,
        },
        {
            key: "type",
            header: "Room type",
            render: (room) => room.type,
        },
        {
            key: "floor",
            header: "Floor",
            render: (room) => room.floor,
        },
        {
            key: "reservation",
            header: "Guest / reservation",
            render: (room) => room.guestOrReservation,
        },
        {
            key: "status",
            header: "Current status",
            render: (room) => (
                <span className={`status-pill ${statusClass(room.status)}`}>{room.status}</span>
            ),
        },
        {
            key: "remarks",
            header: "Remarks",
            className: "remarks",
            render: (room) => room.remarks,
        },
        {
            key: "updated",
            header: "Last updated",
            render: (room) => room.lastUpdated,
        },
        {
            key: "action",
            header: "Action",
            render: () => (
                <button className="text-button" type="button">
                    Edit
                </button>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            emptyMessage="No rooms match your filters."
            getRowId={(room) => room.id}
            rows={rooms}
            selection={{
                selectedIds: selectedRoomIds,
                onToggle: (id: DataTableRowId) => onToggle(Number(id)),
                onToggleAll,
            }}
        />
    );
}
