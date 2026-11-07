import { ArrowLeft, Check, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { SelectField } from "./SelectField"
import type { Room, TaskType } from "../../../domain/houseKeeping"

type RoomSelectionPageProps = {
    rooms: Room[]
    taskType: TaskType
    selectedRoomIds: number[]
    onSelectionChange: (ids: number[]) => void
    onCancel: () => void
    onSave: () => void
}

export function RoomSelectionPage({
    rooms,
    taskType,
    selectedRoomIds,
    onSelectionChange,
    onCancel,
    onSave,
}: RoomSelectionPageProps) {
    const isMaintenance = taskType === "maintenance"
    const [floor, setFloor] = useState("All")
    const [roomType, setRoomType] = useState("All")
    const [status, setStatus] = useState("All")
    const [search, setSearch] = useState("")

    const filteredRooms = useMemo(
        () =>
            rooms.filter(
                (room) =>
                    (floor === "All" || room.floor === floor) &&
                    (roomType === "All" || room.type === roomType) &&
                    (status === "All" ||
                        (isMaintenance
                            ? room.maintenanceStatus === status
                            : room.housekeepingStatus === status)) &&
                    room.number.includes(search.trim()),
            ),
        [floor, roomType, status, search, rooms, isMaintenance],
    )

    const visibleIds = filteredRooms.map((room) => room.id)
    const allVisibleSelected =
        visibleIds.length > 0 &&
        visibleIds.every((id) => selectedRoomIds.includes(id))
    const toggleRoom = (id: number) =>
        onSelectionChange(
            selectedRoomIds.includes(id)
                ? selectedRoomIds.filter((roomId) => roomId !== id)
                : [...selectedRoomIds, id],
        )

    const toggleAll = () => {
        if (allVisibleSelected) {
            onSelectionChange(
                selectedRoomIds.filter((id) => !visibleIds.includes(id)),
            )
        } else {
            onSelectionChange([...new Set([...selectedRoomIds, ...visibleIds])])
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-7">
            <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-6xl flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="grid size-9 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50"
                        aria-label="Back to overview"
                    >
                        <ArrowLeft className="size-4" />
                    </button>
                    <div>
                        <h1 className="font-semibold text-slate-900">
                            {isMaintenance
                                ? "Maintenance Room Selection"
                                : "Housekeeping Room Selection"}
                        </h1>
                        <p className="text-xs text-slate-500">
                            Choose rooms to include in this task sheet
                        </p>
                    </div>
                </header>

                <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                    <SelectField
                        label="Floor"
                        value={floor}
                        options={["1", "2"]}
                        onChange={setFloor}
                    />
                    <SelectField
                        label="Room Type"
                        value={roomType}
                        options={["Deluxe", "Standard", "Suite"]}
                        onChange={setRoomType}
                    />
                    <SelectField
                        label={isMaintenance ? "MT Status" : "HK Status"}
                        value={status}
                        options={
                            isMaintenance
                                ? ["Pending", "In Progress", "Completed"]
                                : ["Clean", "Dirty", "Inspection", "In Progress"]
                        }
                        onChange={setStatus}
                    />
                    <label className="block min-w-0">
                        <span className="mb-2 block text-sm font-medium text-slate-700">
                            Search room
                        </span>
                        <span className="relative block">
                            <input
                                className="h-11 w-full rounded-md border border-slate-200 px-3 pr-10 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                placeholder="Search by number"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-between border-y border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
                    <p className="text-sm font-semibold text-slate-800">
                        Selected rooms:{" "}
                        <span className="text-slate-950">{selectedRoomIds.length}</span>
                    </p>
                    <button
                        type="button"
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40"
                        onClick={() => onSelectionChange([])}
                        disabled={selectedRoomIds.length === 0}
                    >
                        Clear selection
                    </button>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full min-w-180 border-collapse text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                                <th className="w-16 px-4 py-3 sm:px-6">
                                    <Checkbox
                                        checked={allVisibleSelected}
                                        onChange={toggleAll}
                                        label="Select all visible rooms"
                                    />
                                </th>
                                {(isMaintenance
                                    ? [
                                        "Room Number",
                                        "Room Type",
                                        "Floor",
                                        "Issue Type",
                                        "Status",
                                        "Remark",
                                    ]
                                    : [
                                        "Room Number",
                                        "Room Type",
                                        "Floor",
                                        "HK Status",
                                        "Check Out",
                                    ]
                                ).map((heading) => (
                                    <th key={heading} className="px-4 py-3 font-medium">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.map((room) => {
                                const checked = selectedRoomIds.includes(room.id)
                                return (
                                    <tr
                                        key={room.id}
                                        className={`cursor-pointer border-b border-slate-100 text-slate-600 transition hover:bg-slate-50 ${checked ? "bg-slate-50" : ""
                                            }`}
                                        onClick={() => toggleRoom(room.id)}
                                    >
                                        <td className="px-4 py-3 sm:px-6">
                                            <Checkbox
                                                checked={checked}
                                                onChange={() => toggleRoom(room.id)}
                                                label={`Select room ${room.number}`}
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {room.number}
                                        </td>
                                        <td className="px-4 py-3">{room.type}</td>
                                        <td className="px-4 py-3">{room.floor}</td>
                                        {isMaintenance ? (
                                            <>
                                                <td className="px-4 py-3">{room.issueType}</td>
                                                <td className="px-4 py-3">{room.maintenanceStatus}</td>
                                                <td className="max-w-48 px-4 py-3">{room.remark}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-4 py-3">{room.housekeepingStatus}</td>
                                                <td className="px-4 py-3">{room.checkOut}</td>
                                            </>
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 p-4 sm:flex-row sm:justify-end sm:p-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-11 rounded-md border border-slate-300 bg-white px-8 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={selectedRoomIds.length === 0}
                        onClick={onSave}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange-600 px-8 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <Check className="size-4" />
                        Save &amp; Print
                    </button>
                </footer>
            </section>
        </main>
    )
}

function Checkbox({
    checked,
    onChange,
    label,
}: {
    checked: boolean
    onChange: () => void
    label: string
}) {
    return (
        <label
            className="inline-grid cursor-pointer place-items-center"
            onClick={(event) => event.stopPropagation()}
        >
            <input
                className="peer sr-only"
                type="checkbox"
                checked={checked}
                onChange={onChange}
                aria-label={label}
            />
            <span className="grid size-5 place-items-center rounded border-2 border-slate-400 bg-white peer-checked:border-slate-900 peer-checked:bg-slate-900">
                {checked && <Check className="size-3.5 text-white" />}
            </span>
        </label>
    )
}
