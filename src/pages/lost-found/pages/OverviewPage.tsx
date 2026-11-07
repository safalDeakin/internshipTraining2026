import { useState } from "react";
import {
    Archive,
    ChevronDown,
    Download,
    Eye,
    FilePlus2,
    Search,
} from "lucide-react";

import type { Item } from "../../../domain/lostfound";
import { useRepoLostAndFoundHook } from "../context/LostAndFoundProvider";

import {
    Button,
    Field,
    Header,
    inputClass,
    SelectField,
} from "../components/shared";

interface OverviewPageProps {
    items: Item[];
    onAddFound: () => void;
    onViewItem: (item: Item) => void;
}

export function OverviewPage({
    items,
    onAddFound,
    onViewItem,
}: OverviewPageProps) {
    const { selectItem } = useRepoLostAndFoundHook();

    const [tab, setTab] = useState<"lost" | "claimed">("lost");
    const [search, setSearch] = useState("");

    const visible = items.filter(
        (item) =>
            (tab === "lost"
                ? item.status === "In Storage"
                : item.status === "Claimed") &&
            `${item.name} ${item.id}`
                .toLowerCase()
                .includes(search.toLowerCase()),
    );

    const cards: [string, number][] = [
        ["Total Item", items.length],
        [
            "In Storage",
            items.filter((item) => item.status === "In Storage").length,
        ],
        ["Returned", 7],
        [
            "Claimed/Closed",
            items.filter((item) => item.status === "Claimed").length,
        ],
    ];

    const handleView = (item: Item) => {
        selectItem(item);
        onViewItem(item);
    };

    return (
        <main className="min-h-screen bg-white text-slate-800">
            <Header
                actions={
                    <div className="flex items-center gap-3">
                        <Button variant="ghost">
                            <Download className="h-4 w-4" />
                            Export
                            <ChevronDown className="h-3.5 w-3.5" />
                        </Button>

                        <Button onClick={onAddFound}>
                            <FilePlus2 className="h-4 w-4" />
                            Add Found
                        </Button>
                    </div>
                }
            />

            <div className="p-6">
                <section className="grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
                    {cards.map(([label, value]) => (
                        <div
                            key={label}
                            className="flex h-24 items-center gap-4 rounded-md bg-sky-100 px-5 shadow-sm"
                        >
                            <span className="grid h-10 w-10 place-items-center rounded bg-white/80">
                                <Archive className="h-5 w-5 text-slate-800" />
                            </span>

                            <div>
                                <p className="text-sm font-semibold">
                                    {label}
                                </p>

                                <p className="mt-1 text-xl font-bold">
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-6 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                    <div className="flex h-12 gap-1 bg-slate-50 px-2 pt-2">
                        <button
                            onClick={() => setTab("lost")}
                            className={`rounded-t-md px-4 text-sm ${tab === "lost"
                                ? "bg-sky-400 text-white"
                                : "text-slate-600"
                                }`}
                        >
                            Lost Items
                        </button>

                        <button
                            onClick={() => setTab("claimed")}
                            className={`rounded-t-md px-4 text-sm ${tab === "claimed"
                                ? "bg-sky-400 text-white"
                                : "text-slate-600"
                                }`}
                        >
                            Claimed Items
                        </button>
                    </div>

                    <div className="grid gap-4 border-b border-slate-200 p-4 md:grid-cols-[1fr_1fr_1fr_1.7fr]">
                        <SelectField label="Category">
                            <option value="">All</option>
                            <option>Mobile Phone</option>
                            <option>Wallet / Bag</option>
                        </SelectField>

                        <SelectField label="Location">
                            <option value="">All</option>
                            <option>Lobby</option>
                            <option>Restaurant</option>
                        </SelectField>

                        <SelectField label="Status">
                            <option value="">All</option>
                            <option>In Storage</option>
                            <option>Claimed</option>
                        </SelectField>

                        <Field label="Search">
                            <span className="relative">
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search item"
                                    className={inputClass}
                                />

                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-500" />
                            </span>
                        </Field>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-225 text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-medium text-slate-500">
                                <tr>
                                    {[
                                        "Item ID",
                                        "Item Name",
                                        "Category",
                                        "Found Location",
                                        "Date Found",
                                        "Reported By",
                                        "Retention Until",
                                        "Status",
                                        "Action",
                                    ].map((heading) => (
                                        <th
                                            key={heading}
                                            className="px-4 py-3"
                                        >
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {visible.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-slate-200 hover:bg-slate-50"
                                    >
                                        <td className="px-4 py-3 text-sky-600">
                                            {item.id}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.category}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.location}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.date}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.reportedBy}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.retention}
                                        </td>

                                        <td className="px-4 py-3">
                                            {item.status}
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() =>
                                                    handleView(item)
                                                }
                                                className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-sky-600"
                                            >
                                                View
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {visible.length === 0 && (
                            <p className="p-10 text-center text-slate-500">
                                No items found.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}