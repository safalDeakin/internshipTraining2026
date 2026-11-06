
import type { DetailRow } from "../../../../domain/KeyCard"
import { useRepoKeyCardHook } from "../../context/KeyCardProvider"

function DetailRows({ rows }: { rows: DetailRow[] }) {
    return (
        <dl className="space-y-1">
            {rows.map((row) => (
                <div
                    key={row.label}
                    className="grid grid-cols-[140px_minmax(0,1fr)] gap-2 text-[12px] leading-3.75"
                >
                    <dt>{row.label}</dt>
                    <dd className="min-w-0 wrap-break-word">{row.value}</dd>
                </div>
            ))}
        </dl>
    )
}

export function CardDetails() {
    const { selectedCard } = useRepoKeyCardHook()

    // Handle initial state when no card is selected
    if (!selectedCard) {
        return (
            <main className="min-w-0 flex-1 bg-white text-[#171a1c]">
                <div className="p-4 text-center text-sm text-gray-500">
                    No Key Card selected.
                </div>
            </main>
        )
    }

    const primaryRows: DetailRow[] = [
        { label: 'Card Number', value: selectedCard.cardNumber },
        { label: 'Card Type', value: selectedCard.cardType },
        { label: 'Card Technology', value: selectedCard.technology },
        { label: 'Status', value: selectedCard.status },
        { label: 'Current Holder', value: selectedCard.currentHolder },
        { label: 'Current Room', value: selectedCard.currentRoom },
        { label: 'Reservation No', value: selectedCard.reservationNo },
    ]

    return (
        <main className="min-w-0 flex-1 bg-white text-[#171a1c]">
            <section className="grid min-h-39.5 gap-4 bg-[#fff7f7] px-2 py-2 sm:grid-cols-[minmax(360px,3fr)_minmax(240px,2fr)]">
                <DetailRows rows={primaryRows} />

                <DetailRows
                    rows={[
                        { label: 'Issued Date', value: selectedCard.issuedDate },
                        { label: 'Duration', value: selectedCard.duration },
                    ]}
                />
            </section>

            <section className="px-0 pb-6 pt-0">
                <div>
                    <h2 className="mb-2 text-[12px] font-semibold leading-3.75">
                        Holder Information
                    </h2>

                    <div className="px-2">
                        <DetailRows rows={selectedCard.holderInformation} />
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="mb-2 text-[12px] font-semibold leading-3.75">
                        Return Information
                    </h2>

                    <div className="px-2">
                        <DetailRows rows={selectedCard.returnInformation} />
                    </div>
                </div>
            </section>
        </main>
    )
}
