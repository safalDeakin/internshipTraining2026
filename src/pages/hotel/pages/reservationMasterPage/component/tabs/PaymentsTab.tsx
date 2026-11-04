// import { CreditCard } from 'lucide-react';
import { useReservationState } from '../../../../../hooks/allReservation/useReservationState';

export default function PaymentsTab() {
    const { selectedReservation: r } = useReservationState();
    // const p = r.payment;

    return (
        <>
            {/* <div className="py-4 px-2">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Payment Details</h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="border border-gray-200 rounded p-3 bg-gray-50">
                        <p className="text-[11px] text-gray-500 mb-1">Total Amount</p>
                        <p className="text-lg font-bold text-gray-800">{p.totalAmount.toLocaleString()}</p>
                    </div>
                    <div className="border border-green-200 rounded p-3 bg-green-50">
                        <p className="text-[11px] text-gray-500 mb-1">Advance Paid</p>
                        <p className="text-lg font-bold text-green-700">{p.advancePaid.toLocaleString()}</p>
                    </div>
                    <div className="border border-red-200 rounded p-3 bg-red-50">
                        <p className="text-[11px] text-gray-500 mb-1">Outstanding</p>
                        <p className="text-lg font-bold text-red-600">{p.outstandingBalance.toLocaleString()}</p>
                    </div>
                </div>

                <div className="border border-gray-200 rounded overflow-hidden mb-4">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-700">Payment Breakdown</span>
                    </div>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-2 text-gray-600">Room Charge ({p.nights} Nights)</td>
                                <td className="px-3 py-2 text-right text-gray-800">{p.roomCharge.toLocaleString()}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-2 text-gray-600">Tax &amp; Fee</td>
                                <td className="px-3 py-2 text-right text-gray-800">{p.taxAndFee.toLocaleString()}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="px-3 py-2 text-gray-600">Discount</td>
                                <td className="px-3 py-2 text-right text-green-600">- {p.discount}</td>
                            </tr>
                            <tr className="border-b border-gray-100 font-medium bg-gray-50">
                                <td className="px-3 py-2 text-gray-700">Total Amount</td>
                                <td className="px-3 py-2 text-right text-gray-800">{p.totalAmount.toLocaleString()}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-2 text-gray-600">Advance Paid</td>
                                <td className="px-3 py-2 text-right text-green-600">- {p.advancePaid.toLocaleString()}</td>
                            </tr>
                            <tr className="font-semibold">
                                <td className="px-3 py-2 text-gray-700">Outstanding Balance</td>
                                <td className="px-3 py-2 text-right text-red-600">{p.outstandingBalance.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors">
                    <CreditCard size={13} />
                    Record Payment
                </button>
            </div> */}


            <div className='p-2'>
                {/* <h3 className="text-sm font-semibold text-gray-800 mb-2">Stay Information</h3> */}
                <div className="border border-gray-200 rounded overflow-hidden">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                        <span className="text-xs font-semibold text-gray-700">Payment Summary</span>
                    </div>
                    <table className="w-full max-w-xs">
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-1.5 text-xs text-gray-600">
                                    Room Charge ({r.payment.nights} Nights)
                                </td>
                                <td className="px-3 py-1.5 text-xs text-gray-800 text-right">
                                    {r.payment.roomCharge.toLocaleString()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-1.5 text-xs text-gray-600">Tax &amp; Fee</td>
                                <td className="px-3 py-1.5 text-xs text-gray-800 text-right">
                                    {r.payment.taxAndFee.toLocaleString()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="px-3 py-1.5 text-xs text-gray-600">Discount</td>
                                <td className="px-3 py-1.5 text-xs text-gray-800 text-right">
                                    {r.payment.discount}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-1.5 text-xs font-medium text-gray-700">Total Amount</td>
                                <td className="px-3 py-1.5 text-xs font-medium text-gray-800 text-right">
                                    {r.payment.totalAmount.toLocaleString()}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="px-3 py-1.5 text-xs text-gray-600">Advance Paid</td>
                                <td className="px-3 py-1.5 text-xs text-gray-800 text-right">
                                    {r.payment.advancePaid.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-3 py-1.5 text-xs text-gray-600">Outstanding Balance</td>
                                <td className="px-3 py-1.5 text-xs text-gray-800 font-medium text-right">
                                    {r.payment.outstandingBalance.toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
