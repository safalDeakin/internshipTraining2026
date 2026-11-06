import { ActionButtons } from "./components/ActionButtons"
import { FolioTable } from "./components/FolioTable"
import { GuestDetails } from "./components/GuestDetails"
import { PaymentSettlement } from "./components/PaymentSettlement"
import { ReceiptSummary } from "./components/ReceiptSummary"
import { folioData } from "./data/guestCheckout.data"

export default function GuestCheckoutRenderer() {
    return (
        <main className="min-h-screen bg-[#f5f6f8] p-3 text-slate-800 sm:p-4">
            <div className="mx-auto max-w-360">

                <section className="min-h-[calc(100vh-54px)] border-2 border-slate-200 bg-white">
                    <GuestDetails guest={folioData.guest} />

                    <div className="h-4 bg-[#f5f6f8]" />

                    <div className="grid items-start gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,2.35fr)_minmax(280px,0.95fr)] lg:gap-4">
                        <div className="space-y-4">
                            <FolioTable items={folioData.items} />
                            <PaymentSettlement />
                        </div>

                        <aside className="space-y-4">
                            <ReceiptSummary receipt={folioData.receipt} />
                            <ActionButtons />
                        </aside>
                    </div>
                </section>
            </div>
        </main>
    )
}
