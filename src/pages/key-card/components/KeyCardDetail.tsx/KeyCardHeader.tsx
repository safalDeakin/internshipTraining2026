
import { Download, Printer, SwatchBook } from 'lucide-react'
import { useRepoKeyCardHook } from '../../context/KeyCardProvider'

export function KeyCardHeader() {
    const { selectedCard } = useRepoKeyCardHook()

    const exportCsv = () => {
        if (!selectedCard) return

        const rows = [
            ['Card Number', selectedCard.cardNumber],
            ['Card Type', selectedCard.cardType],
            ['Card Technology', selectedCard.technology],
            ['Status', selectedCard.status],
            ['Current Holder', selectedCard.currentHolder],
            ['Current Room', selectedCard.currentRoom],
            ['Reservation No', selectedCard.reservationNo],
            ['Issued Date', selectedCard.issuedDate],
            ['Duration', selectedCard.duration],
        ]

        const csv = rows
            .map((row) =>
                row.map((value) =>
                    `"${String(value ?? '').replace(/"/g, '""')}"`
                ).join(',')
            )
            .join('\n')

        const url = URL.createObjectURL(
            new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        )

        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `${selectedCard.cardNumber}-details.csv`

        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)

        URL.revokeObjectURL(url)
    }

    return (
        <header className="flex min-h-15.5 flex-col items-stretch justify-between gap-2 border-b border-[#eceeef] bg-white px-3 py-2 sm:flex-row sm:items-center sm:gap-3 sm:px-4.5">

            <div className="flex min-w-0 items-center gap-1.5">

                <SwatchBook size={17} className="shrink-0 text-[#42515a]" />

                <div className="flex min-w-0 flex-wrap items-center gap-x-1 text-[13px]">
                    <span className="font-semibold text-[#303a3f]">
                        Key/Card Detail
                    </span>

                    <span className="text-[#81878a]">
                        (Shift ID: SH-111)
                    </span>

                    <span className="h-3 w-3 rounded-full bg-[#42dc30]" />
                </div>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2">
                <button
                    disabled={!selectedCard}
                    className="flex h-7.75 items-center gap-2 rounded-sm bg-white px-2 text-[10px] text-[#344047] shadow-[0_1px_8px_rgba(0,0,0,0.04)] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={exportCsv}
                >
                    <Download size={13} strokeWidth={1.5} />
                    <span>Export CSV</span>
                </button>

                <button
                    className="flex h-7.75 items-center gap-2 rounded-sm bg-white px-2 text-[10px] text-[#344047] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                    onClick={() => window.print()}
                >
                    <Printer size={13} strokeWidth={1.5} />
                    <span>Print as PDF</span>
                </button>
            </div>
        </header>
    )
}
