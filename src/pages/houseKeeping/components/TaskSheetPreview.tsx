import { ArrowLeft, Printer } from "lucide-react"
import type { Room, TaskType } from "../../../domain/houseKeeping"

type TaskSheetPreviewProps = {
    rooms: Room[]
    taskType: TaskType
    onBack: () => void
}

export function TaskSheetPreview({
    rooms,
    taskType,
    onBack,
}: TaskSheetPreviewProps) {
    const isMaintenance = taskType === "maintenance"
    return (
        <main className="min-h-screen bg-slate-200 p-3 sm:p-6 lg:p-10">
            <div className="no-print mx-auto mb-4 flex max-w-5xl items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                    <ArrowLeft className="size-4" />
                    Edit selection
                </button>
                <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                    <Printer className="size-4" />
                    Print task sheet
                </button>
            </div>

            <article className="print-sheet mx-auto min-h-225 max-w-5xl bg-white p-5 text-[12px] text-slate-800 shadow-lg sm:p-8 lg:p-10">
                <header className="grid grid-cols-[1fr_auto] gap-5 border-b border-slate-800 pb-5 sm:grid-cols-3 sm:items-start">
                    <div className="font-semibold leading-5">
                        Vintage Yard Hotel
                        <br />
                        Dhulikhel
                    </div>
                    <h1 className="col-span-2 text-right text-base font-bold sm:col-span-1 sm:text-center sm:text-lg">
                        {isMaintenance
                            ? "Maintenance Task Sheet"
                            : "Housekeeping Task Sheet"}
                    </h1>
                    <div className="col-span-2 ml-auto w-full max-w-52 rounded border border-slate-400 p-2 shadow-sm sm:col-span-1">
                        <InfoLine label="Date" value="2083/01/02" />
                        <InfoLine label="Time" value="11:00 AM" />
                        <InfoLine label="Prepared By" value="Front Office" />
                    </div>
                </header>

                <section className="mt-5 grid gap-2 rounded border border-slate-300 p-3 shadow-sm sm:grid-cols-3 sm:gap-0">
                    <div className="space-y-2 sm:border-r sm:border-slate-300 sm:pr-5">
                        <InfoLine label="Total Rooms In Property" value="105" />
                        <InfoLine label="Room Selected" value={String(rooms.length)} />
                    </div>
                    <div className="space-y-2 sm:border-r sm:border-slate-300 sm:px-5">
                        <InfoLine label="Floor" value="All Floor" />
                        <InfoLine label="Room Type" value="All Type" />
                    </div>
                    <div className="space-y-2 sm:pl-5">
                        <InfoLine
                            label={isMaintenance ? "MT Status" : "HK Status"}
                            value="All"
                        />
                        <InfoLine label="View" value="All" />
                    </div>
                </section>

                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-162.5 border-separate border-spacing-y-1 text-center">
                        <thead>
                            <tr className="bg-slate-200 text-slate-600">
                                {[
                                    "S.N",
                                    "Room Number",
                                    "Room Type",
                                    "Floor",
                                    isMaintenance ? "Issue Type" : "HK Status",
                                    "Priority",
                                    "Check Out",
                                ].map((heading) => (
                                    <th key={heading} className="px-3 py-3 font-medium">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room, index) => (
                                <tr
                                    key={room.id}
                                    className="outline -outline-offset-1 outline-slate-200"
                                >
                                    <td className="px-3 py-3">{index + 1}</td>
                                    <td className="px-3 py-3">{room.number}</td>
                                    <td className="px-3 py-3">{room.type}</td>
                                    <td className="px-3 py-3">{room.floor}</td>
                                    <td className="px-3 py-3">
                                        {isMaintenance ? room.issueType : room.housekeepingStatus}
                                    </td>
                                    <td className="px-3 py-3">High</td>
                                    <td className="px-3 py-3">{room.checkOut}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <footer className="mt-10 flex justify-between gap-8 px-4 sm:mt-14 sm:px-6">
                    <SignatureBlock title="Issued By" />
                    <SignatureBlock title="Received By" />
                </footer>
            </article>
        </main>
    )
}

function InfoLine({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4">
            <span>{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    )
}

function SignatureBlock({ title }: { title: string }) {
    return (
        <div className="space-y-3">
            <p className="font-medium">{title}</p>
            <p>Name&nbsp;&nbsp; __________________</p>
            <p>Signature&nbsp;&nbsp; __________________</p>
            <p>Date&nbsp;&nbsp; __________________</p>
        </div>
    )
}
