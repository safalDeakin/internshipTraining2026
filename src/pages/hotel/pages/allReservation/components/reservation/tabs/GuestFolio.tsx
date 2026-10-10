import { Plus } from 'lucide-react';
import { useReservationState } from '../../../../../hooks/allReservation/useReservationState';
import { useAppContext } from '../../../context/AppContext';
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function GuestFolio() {
    const { selectedReservation: r } = useReservationState();
    const { repo } = useAppContext();

    const totalCharges = r.folioItems.reduce((sum: any, i: { charge: any; }) => sum + i.charge, 0);
    const totalCredits = r.folioItems.reduce((sum: any, i: { credit: any; }) => sum + i.credit, 0);
    const balance = totalCharges - totalCredits;

    const handleAddCharge = () => {
        const desc = prompt('Charge description:');
        const amt = prompt('Amount:');
        if (desc && amt && !isNaN(Number(amt))) {
            repo.addFolioItem(r.id, {
                date: new Date().toLocaleDateString(),
                description: desc,
                charge: Number(amt),
                credit: 0,
            });
        }
    };

    return (
        <div className="py-4 px-2">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Guest Folio</h3>
                <button
                    onClick={handleAddCharge}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 border border-blue-300 px-2 py-1 rounded transition-colors"
                >
                    <Plus size={12} /> Add Charge
                </button>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden">
                <table className="w-full text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-3 py-2 text-gray-600 font-medium">Date</th>
                            <th className="text-left px-3 py-2 text-gray-600 font-medium">Description</th>
                            <th className="text-right px-3 py-2 text-gray-600 font-medium">Charge</th>
                            <th className="text-right px-3 py-2 text-gray-600 font-medium">Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {r.folioItems.map((item: { id: Key | null | undefined; date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; charge: number; credit: number; }) => (
                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-3 py-2 text-gray-500">{item.date}</td>
                                <td className="px-3 py-2 text-gray-700">{item.description}</td>
                                <td className="px-3 py-2 text-right text-gray-800">
                                    {item.charge > 0 ? item.charge.toLocaleString() : '-'}
                                </td>
                                <td className="px-3 py-2 text-right text-gray-800">
                                    {item.credit > 0 ? item.credit.toLocaleString() : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t border-gray-200 font-medium">
                        <tr>
                            <td colSpan={2} className="px-3 py-2 text-gray-700">Total</td>
                            <td className="px-3 py-2 text-right text-gray-800">{totalCharges.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right text-gray-800">{totalCredits.toLocaleString()}</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                            <td colSpan={2} className="px-3 py-2 text-gray-700">Balance Due</td>
                            <td colSpan={2} className={`px-3 py-2 text-right font-semibold text-gray-800`}>
                                {balance.toLocaleString()}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
