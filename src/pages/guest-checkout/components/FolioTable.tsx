import type { FolioItem } from "../data/guestCheckout.data"


type FolioTableProps = {
    items: FolioItem[]
}

const columns = [
    "Date",
    "Description",
    "Category",
    "Reference",
    "Quantity",
    "Amount",
    "Status",
]

export function FolioTable({ items }: FolioTableProps) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_6px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                    Review Folio Items
                </h2>
                <p className="text-right text-[9px] text-slate-400 sm:text-[10px]">
                    Confirm items to include in final bill
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-162.5 border-separate border-spacing-y-1 text-left text-[10px] sm:text-xs">
                    <thead>
                        <tr className="bg-[#edf0fa] text-slate-400">
                            {columns.map((column) => (
                                <th
                                    className="px-4 py-2 font-normal first:rounded-l-sm last:rounded-r-sm"
                                    key={column}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                className="text-slate-700"
                                key={`${item.reference}-${item.description}`}
                            >
                                <td className="border-y border-l border-slate-200 px-4 py-2">
                                    {item.date}
                                </td>
                                <td className="border-y border-slate-200 px-4 py-2">
                                    {item.description}
                                </td>
                                <td className="border-y border-slate-200 px-4 py-2">
                                    {item.category}
                                </td>
                                <td className="border-y border-slate-200 px-4 py-2">
                                    {item.reference}
                                </td>
                                <td className="border-y border-slate-200 px-4 py-2 text-center">
                                    {item.quantity}
                                </td>
                                <td className="border-y border-slate-200 px-4 py-2 text-center">
                                    {item.amount}
                                </td>
                                <td className="border-y border-r border-slate-200 px-4 py-2 text-center">
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
