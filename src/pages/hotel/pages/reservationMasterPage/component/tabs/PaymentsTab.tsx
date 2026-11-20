import { useReservationDetail } from '../../provider/detailProvider/useReservationDetail';
import Container from '../../../../../../lib/component/Container/Container';

export default function PaymentsTab() {
    const r = useReservationDetail();
    return (
        <>
            <Container>
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
            </Container>
        </>
    );
}
