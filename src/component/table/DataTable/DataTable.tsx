import type { ReactNode } from "react";
import "../styles/dataTableCss.css"

export type DataTableRowId = string | number;

export interface DataTableColumn<TRow> {
    key: string;
    header: string;
    className?: string;
    render: (row: TRow) => ReactNode;
}

interface DataTableSelection {
    selectedIds: ReadonlySet<DataTableRowId>;
    onToggle: (id: DataTableRowId) => void;
    onToggleAll: () => void;
}

interface DataTableProps<TRow> {
    columns: DataTableColumn<TRow>[];
    emptyMessage?: string;
    getRowId: (row: TRow) => DataTableRowId;
    rows: TRow[];
    selection?: DataTableSelection;
}

export function DataTable<TRow>({
    columns,
    emptyMessage = "No records found.",
    getRowId,
    rows,
    selection,
}: DataTableProps<TRow>) {
    const allSelected =
        selection !== undefined &&
        rows.length > 0 &&
        rows.every((row) => selection.selectedIds.has(getRowId(row)));

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {selection && (
                            <th className="selection-column">
                                <input
                                    aria-label="Select all visible rows"
                                    checked={allSelected}
                                    onChange={selection.onToggleAll}
                                    type="checkbox"
                                />
                            </th>
                        )}
                        {columns.map((column) => (
                            <th className={column.className} key={column.key}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        const rowId = getRowId(row);
                        return (
                            <tr key={rowId}>
                                {selection && (
                                    <td className="selection-column" data-label="Select">
                                        <input
                                            aria-label={`Select row ${rowId}`}
                                            checked={selection.selectedIds.has(rowId)}
                                            onChange={() => selection.onToggle(rowId)}
                                            type="checkbox"
                                        />
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td className={column.className} data-label={column.header} key={column.key}>
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {rows.length === 0 && <div className="no-results">{emptyMessage}</div>}
        </div>
    );
}


//UseCase
// <DataTable
//     columns={columns}
//     emptyMessage="No rooms match your filters."
//     getRowId={(room) => room.id}
//     rows={rooms}
//     selection={{
//         selectedIds: selectedRoomIds,
//         onToggle: (id: DataTableRowId) => onToggle(Number(id)),
//         onToggleAll,
//     }}
// />


//columns shoul be like this or something
// const columns: DataTableColumn<Room>[] = [
//         {
//             key: "room",
//             header: "Room",
//             render: (room) => <strong>{room.number}</strong>,
//         },
//         {
//             key: "type",
//             header: "Room type",
//             render: (room) => room.type,
//         },
//         {
//             key: "floor",
//             header: "Floor",
//             render: (room) => room.floor,
//         },
//         {
//             key: "reservation",
//             header: "Guest / reservation",
//             render: (room) => room.guestOrReservation,
//         },
//         {
//             key: "status",
//             header: "Current status",
//             render: (room) => (
//                 <span className={`status-pill ${statusClass(room.status)}`}>{room.status}</span>
//             ),
//         },
//         {
//             key: "remarks",
//             header: "Remarks",
//             className: "remarks",
//             render: (room) => room.remarks,
//         },
//         {
//             key: "updated",
//             header: "Last updated",
//             render: (room) => room.lastUpdated,
//         },
//         {
//             key: "action",
//             header: "Action",
//             render: () => (
//                 <button className="text-button" type="button">
//                     Edit
//                 </button>
//             ),
//         },
//     ];