import { useReservationState } from '../../../hooks/useReservationState';

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-1.5 border-b border-gray-50 last:border-0">
            <span className="w-44 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value}</span>
        </div>
    );
}

export default function CustomerDetails() {
    const { selectedReservation: r } = useReservationState();

    return (
        <div className="py-4 px-2 space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Guest Information</h3>
                <div>
                    <InfoRow label="Guest Name" value={r.guest.name} />
                    <InfoRow label="Nationality" value={r.guest.nationality} />
                    <InfoRow label="Phone Number" value={r.guest.phone} />
                    <InfoRow label="E-mail" value={r.guest.email} />
                    <InfoRow label="ID Type/Number" value={r.guest.idType} />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Room Information</h3>
                <div className="p-3 bg-blue-50/30">
                    <InfoRow label="Room Number" value={r.room.number} />
                    <InfoRow label="Room Type" value={r.room.type} />
                    <InfoRow label="Floor" value={r.room.floor} />
                    <InfoRow label="Bed Type" value={r.room.bedType} />
                    <InfoRow label="Smoking" value={r.room.smoking} />
                    <InfoRow label="Occupancy" value={r.room.occupancy} />
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Stay Information</h3>
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
        </div>
    );
}
