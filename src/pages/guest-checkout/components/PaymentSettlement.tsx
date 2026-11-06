import { CreditCard } from "lucide-react"

export function PaymentSettlement() {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_6px_rgba(15,23,42,0.04)]">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Folio Payment Settlement
            </h2>
            <label
                className="mt-3 block text-[10px] text-slate-500 sm:text-[11px]"
                htmlFor="payment-method"
            >
                Choose Outstanding Settlement Payment Method
            </label>
            <div className="relative mt-1.5 max-w-140">
                <CreditCard
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
                />
                <select
                    className="h-9 w-full appearance-auto rounded border border-slate-300 bg-white pl-9 pr-3 text-[10px] text-slate-400 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-[11px]"
                    defaultValue=""
                    id="payment-method"
                >
                    <option disabled value="">
                        Select payment method
                    </option>
                    <option>Cash</option>
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                </select>
            </div>
        </section>
    )
}
