import type { BillItem } from "../../../../../domain/GuestRequest";

const currency = (amount: number) => `Rs ${amount.toLocaleString("en-US")}`;

export function BillingTable({ items, compact = false }: { items: BillItem[]; compact?: boolean }) {
    const total = items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-130 border-collapse text-left text-[clamp(10px,0.7vw,12px)]">
                <thead>
                    <tr className="border-b border-slate-300 font-semibold text-slate-700">
                        <th className="w-16 px-2 py-2">S.No.</th>
                        <th className="px-2 py-2">Service</th>
                        <th className="w-24 px-2 py-2 text-center">Quantity</th>
                        {!compact && <th className="px-2 py-2 text-center">Reference/Transaction Id</th>}
                        <th className="w-28 px-2 py-2 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b border-slate-200 text-slate-600">
                            <td className="px-2 py-2">{item.id}</td>
                            <td className="px-2 py-2">{item.service}</td>
                            <td className="px-2 py-2 text-center">{item.quantity}</td>
                            {!compact && <td className="px-2 py-2 text-center">{item.reference}</td>}
                            <td className="px-2 py-2 text-right font-bold text-slate-800">
                                {currency(item.amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="font-bold text-slate-800">
                        <td colSpan={compact ? 3 : 4} className="px-2 py-2">
                            Total Paid
                        </td>
                        <td className="px-2 py-2 text-right">{currency(total)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
