import { Pencil, X } from "lucide-react";

import type { Item } from "../../../domain/lostfound";
import { useRepoLostAndFoundHook } from "../context/LostAndFoundProvider";

import {
    Button,
    Header,
    Info,
    Panel,
    photo,
} from "../components/shared";

interface DetailPageProps {
    onBack: () => void;
    onClaim: () => void;
}

export function DetailPage({
    onBack,
    onClaim,
}: DetailPageProps) {
    const { selectedItem } = useRepoLostAndFoundHook();

    if (!selectedItem) {
        return (
            <main className="min-h-screen bg-slate-50 p-6">
                <Button variant="ghost" onClick={onBack}>
                    Back to overview
                </Button>

                <p className="mt-6 text-slate-600">
                    No item selected.
                </p>
            </main>
        );
    }

    const selected = selectedItem;

    return (
        <main className="min-h-screen bg-slate-50">
            <Header
                onHome={onBack}
                actions={
                    <div className="flex gap-3">
                        <Button>
                            <Pencil className="h-4 w-4" />
                            Edit Item
                        </Button>

                        <Button variant="danger">
                            <X className="h-4 w-4" />
                            Clear
                        </Button>
                    </div>
                }
            />

            <div className="p-6">
                <section className="grid gap-7 rounded-lg bg-white p-7 shadow-sm md:grid-cols-[180px_1fr]">
                    <img
                        src={photo}
                        alt="Found phone held in a hand"
                        className="h-60 w-44 rounded-md object-cover shadow-md"
                    />

                    <div>
                        <h2 className="text-lg font-semibold">
                            Item Detail- {selected.id}
                        </h2>

                        <InfoGrid item={selected} />

                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-3 font-semibold">
                                    Found Detail
                                </h3>

                                <Info
                                    rows={[
                                        [
                                            "Found Location",
                                            selected.location,
                                        ],
                                        [
                                            "Reported on",
                                            `${selected.date} - 12:45`,
                                        ],
                                        [
                                            "Reported By",
                                            selected.reportedBy,
                                        ],
                                        [
                                            "Notes",
                                            "Found During Check Out",
                                        ],
                                    ]}
                                />
                            </div>

                            <Info
                                rows={[
                                    [
                                        "Current Storage",
                                        "Shelf 23A",
                                    ],
                                    [
                                        "Status",
                                        selected.status === "Claimed"
                                            ? "Claimed"
                                            : "Not Claimed",
                                    ],
                                ]}
                            />
                        </div>
                    </div>
                </section>

                <div className="mt-4 flex gap-1 border-b border-slate-200">
                    <button className="rounded-t-md bg-sky-400 px-4 py-2 text-sm text-white">
                        Claim &amp; Verification
                    </button>

                    <button className="px-4 py-2 text-sm text-slate-600">
                        Note &amp; Attachment
                    </button>
                </div>

                {selected.status === "Claimed" ? (
                    <section className="mt-4 grid gap-4">
                        <Panel title="Claimed By">
                            <Info
                                rows={[
                                    [
                                        "Guest Name",
                                        "Dipak Shrestha - RV#1234",
                                    ],
                                    [
                                        "Reservation No",
                                        "RV#1211",
                                    ],
                                    ["Room No", "R101"],
                                    [
                                        "Contact No",
                                        "9843323444",
                                    ],
                                ]}
                            />
                        </Panel>

                        <Panel title="Verification">
                            <Info
                                rows={[
                                    [
                                        "Description Provided By Guest",
                                        "",
                                    ],
                                    ["Id Type", "Passport"],
                                    [
                                        "Id Type No",
                                        "11232101",
                                    ],
                                    [
                                        "Proof Of Ownership",
                                        "Guest showed device detail & cover",
                                    ],
                                    ["Verified By", "Front Desk"],
                                    [
                                        "Verified Date",
                                        "2083/01/01",
                                    ],
                                ]}
                            />
                        </Panel>
                    </section>
                ) : (
                    <section className="mt-4 rounded-lg bg-white p-8 text-center shadow-sm">
                        <p className="mb-4 text-slate-600">
                            This item has not been claimed yet.
                        </p>

                        <Button onClick={onClaim}>
                            Register Claim
                        </Button>
                    </section>
                )}
            </div>
        </main>
    );
}

function InfoGrid({ item }: { item: Item }) {
    return (
        <Info
            rows={[
                ["Item Name", item.name],
                ["Category", item.category],
                [
                    "Description",
                    item.description || "No description available.",
                ],
            ]}
        />
    );
}