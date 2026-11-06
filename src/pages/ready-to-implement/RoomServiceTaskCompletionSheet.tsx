const completedRequests = [
    {
        id: "SR-001",
        requestNo: "REQ-2026-001",
        date: "2083/01/03",
        guestName: "John Smith",
        roomNo: "101",
        taskFormed: "Airport Pickup",
        completedBy: "Ram Thapa",
        timeCompleted: "01:45 PM",
        status: "Completed",
    },
    {
        id: "SR-002",
        requestNo: "REQ-2026-002",
        date: "2083/01/03",
        guestName: "Nia Shrestha",
        roomNo: "301",
        taskFormed: "Extra Towel & Linen",
        completedBy: "Sita Rai",
        timeCompleted: "02:15 PM",
        status: "Completed",
    },
    {
        id: "SR-003",
        requestNo: "REQ-2026-003",
        date: "2083/01/04",
        guestName: "Ram Sharma",
        roomNo: "205",
        taskFormed: "Airport Drop Off",
        completedBy: "Hari Gurung",
        timeCompleted: "04:30 PM",
        status: "Completed",
    },
    {
        id: "SR-004",
        requestNo: "REQ-2026-004",
        date: "2083/01/04",
        guestName: "Sarah Wilson",
        roomNo: "402",
        taskFormed: "Room Cleaning",
        completedBy: "Maya Tamang",
        timeCompleted: "10:20 AM",
        status: "Completed",
    },
    {
        id: "SR-005",
        requestNo: "REQ-2026-005",
        date: "2083/01/05",
        guestName: "Michael Brown",
        roomNo: "106",
        taskFormed: "Breakfast Request",
        completedBy: "Bikash KC",
        timeCompleted: "08:40 AM",
        status: "Completed",
    },
];
export function RoomServiceTaskCompletionSheet() {
    return (
        <main className="min-h-screen bg-slate-200 p-3 sm:p-6 lg:p-10">
            <article className="print-sheet mx-auto min-h-225 max-w-5xl bg-white p-5 text-[12px] text-slate-800 shadow-lg sm:p-8 lg:p-10">
                <header className="grid grid-cols-[1fr_auto] gap-5 border-b border-slate-800 pb-5 sm:grid-cols-3 sm:items-start">
                    <div className="font-semibold leading-5">
                        Vintage Yard Hotel
                        <br />
                        Dhulikhel
                    </div>
                    <h1 className="col-span-2 text-right text-base font-bold sm:col-span-1 sm:text-center sm:text-lg">Room Service Task Completion Sheet
                    </h1>
                    <div className="col-span-2 ml-auto w-full max-w-52 rounded border border-slate-400 p-2 shadow-sm sm:col-span-1">
                        <InfoLine label="Date" value="2083/01/02" />
                        <InfoLine label="Time" value="11:00 AM" />
                        <InfoLine label="Prepared By" value="Front Office" />
                    </div>
                </header>

                <section className="mt-5 grid gap-2 rounded border border-slate-300 p-3 shadow-sm sm:grid-cols-3 sm:gap-0">
                    <div className="space-y-2 sm:border-r sm:border-slate-300 sm:pr-5">
                        <InfoLine label="Guest Comfort" value="2" />
                        <InfoLine label="Room Amentities" value={String(completedRequests.length)} />
                    </div>
                    <div className="space-y-2 sm:border-r sm:border-slate-300 sm:px-5">
                        <InfoLine label="Sepecial Request" value="2" />
                        <InfoLine label="Room In room Setup" value="1" />
                    </div>
                    <div className="space-y-2 sm:pl-5">
                        <InfoLine label="Extra Bed & Bedding" value="2" />
                        <InfoLine label="View" value="All" />
                    </div>
                </section>

                <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-162.5 border-separate border-spacing-y-1 text-center">
                        <thead>
                            <tr className="bg-slate-200 text-slate-600">
                                {[
                                    "Request No",
                                    "Date",
                                    "Guest Name",
                                    "Room No",
                                    "Task Formed",
                                    "Completed By",
                                    "Time Completed",
                                    "Status",
                                ].map((heading) => (
                                    <th key={heading} className="px-3 py-3 font-medium">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {completedRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="outline -outline-offset-1 outline-slate-200"
                                >
                                    <td className="px-3 py-3">{request.requestNo}</td>
                                    <td className="px-3 py-3">{request.date}</td>
                                    <td className="px-3 py-3">{request.guestName}</td>
                                    <td className="px-3 py-3">{request.roomNo}</td>
                                    <td className="px-3 py-3">{request.taskFormed}</td>
                                    <td className="px-3 py-3">{request.completedBy}</td>
                                    <td className="px-3 py-3">{request.timeCompleted}</td>
                                    <td className="px-3 py-3">{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <footer className="mt-10 flex justify-between gap-8 px-4 sm:mt-14 sm:px-6">
                    <SignatureBlock title="Issued By" />
                    <SignatureBlock title="Verified By" />
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
