import {
    BedDouble,
    Download,
    Eye,
    FileDown,
    Hotel,
    Printer,
    Search,
} from "lucide-react"
import { useMemo, useState } from "react"
import { SelectField } from "./SelectField"
import type { Room } from "../../../domain/houseKeeping"

type OverviewPageProps = {
    rooms: Room[]
    onAddHousekeepingTask: () => void
    onAddMaintenanceTask: () => void
}

const summaryCards = [
    { value: 105, label: "Total Room", className: "bg-sky-50" },
    { value: 58, label: "Clean", className: "bg-indigo-50" },
    { value: 15, label: "Dirty", className: "bg-violet-50" },
    { value: 42, label: "In Progress", className: "bg-blue-50" },
    { value: 2, label: "Out Of Service", className: "bg-rose-50" },
]

export function OverviewPage({
    rooms,
    onAddHousekeepingTask,
    onAddMaintenanceTask,
}: OverviewPageProps) {
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
                    (status === "All" || room.housekeepingStatus === status) &&
                    room.number.includes(search.trim()),
            ),
        [floor, roomType, status, search, rooms],
    )

    return (
        <main className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-7">
            <section className="mx-auto min-h-[calc(100vh-3.5rem)] max-w-375 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                    <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-900 text-white">
                            <Hotel className="size-5" />
                        </span>
                        <div>
                            <h1 className="font-medium text-slate-900">
                                Housekeeping / Maintenance Overview
                            </h1>
                        </div>
                    </div>
                    <nav
                        className="flex flex-wrap gap-2"
                        aria-label="Housekeeping actions"
                    >
                        <ActionButton
                            icon={Download}
                            label="Print Housekeeping List"
                            onClick={() => window.print()}
                        />
                        <ActionButton
                            icon={Download}
                            label="Add New Housekeeping Task"
                            onClick={onAddHousekeepingTask}
                        />
                        <ActionButton
                            icon={Download}
                            label="Add New Maintenance Task"
                            onClick={onAddMaintenanceTask}
                        />
                        <ActionButton
                            icon={Printer}
                            label="Print as PDF"
                            onClick={() => window.print()}
                        />
                    </nav>
                </header>

                <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                        {summaryCards.map((card) => (
                            <article
                                key={card.label}
                                className={`${card.className} rounded-lg border border-slate-100 px-4 py-4 shadow-sm`}
                            >
                                <BedDouble className="mb-3 size-5 text-slate-700" />
                                <strong className="block text-2xl text-slate-950">
                                    {card.value}
                                </strong>
                                <span className="text-sm font-semibold text-slate-700">
                                    {card.label}
                                </span>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-4 border-b border-slate-200 pb-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr]">
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
                            label="Status"
                            value={status}
                            options={["Clean", "Dirty", "Inspection", "In Progress"]}
                            onChange={setStatus}
                        />
                        <label className="block min-w-0">
                            <span className="mb-2 block text-sm font-medium text-slate-700">
                                Search room
                            </span>
                            <span className="relative block">
                                <input
                                    className="h-11 w-full rounded-md border border-slate-200 px-3 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                    placeholder="Search by room number"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-250 border-collapse text-left text-sm">
                            <thead>
                                <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                                    {[
                                        "Room No",
                                        "Floor",
                                        "Room Type",
                                        "Room Status",
                                        "HK/MT Status",
                                        "Performed By",
                                        "Last Clean",
                                        "Next Clean",
                                        "Action",
                                    ].map((heading) => (
                                        <th key={heading} className="px-4 py-3 font-medium">
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRooms.map((room) => (
                                    <tr
                                        key={room.id}
                                        className="border-b border-slate-100 text-slate-600 hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {room.number}
                                        </td>
                                        <td className="px-4 py-3">{room.floor}</td>
                                        <td className="px-4 py-3">{room.type}</td>
                                        <td className="px-4 py-3">{room.roomStatus}</td>
                                        <td className="px-4 py-3">{room.housekeepingStatus}</td>
                                        <td className="px-4 py-3">{room.performedBy}</td>
                                        <td className="px-4 py-3">{room.lastClean}</td>
                                        <td className="px-4 py-3">{room.nextClean}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                className="rounded p-1.5 text-slate-600 hover:bg-slate-200"
                                                aria-label={`View room ${room.number}`}
                                            >
                                                <Eye className="size-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredRooms.length === 0 && (
                        <p className="py-12 text-center text-sm text-slate-500">
                            No rooms match your filters.
                        </p>
                    )}
                </div>
            </section>
        </main>
    )
}

type ActionButtonProps = {
    icon: typeof FileDown
    label: string
    onClick: () => void
}

function ActionButton({
    icon: Icon,
    label,
    onClick,
}: ActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition sm:text-sm border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
        >
            <Icon className="size-4 shrink-0" />
            {label}
        </button>
    )
}
