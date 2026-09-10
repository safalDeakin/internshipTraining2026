import type { ReservationReportData } from "../reservationReportData";

interface ReservationReportTemplateProps {
    data: ReservationReportData["cancellationDetails"];
}
const CancellationDetails = ({
    data
}: ReservationReportTemplateProps) => {
    return (
        <div>
            <section className="mt-6 border-b-3 border-b-gray-300 pb-6 report-keep-together">
                <h2 className="text-sm font-bold ">
                    Cancellation Detail
                </h2>

                <div className="mt-3 overflow-x-auto">
                    <table className="w-full border-collapse text-xs">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className=" px-2 py-4 text-left">
                                    R.No
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Name
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Date
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Guest No
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Total Amount
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Advance
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Refund
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Reason
                                </th>

                            </tr>
                        </thead>

                        <tbody>
                            {data.map((reservation) => (
                                <tr key={reservation.reservationId} className="hover:bg-gray-100">
                                    <td className=" px-2 py-4 text-left">
                                        {reservation.reservationId}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.guestName}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.Date}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.GuestNo}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.totalAmount.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.advance.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.refund.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4 text-left">
                                        {reservation.paymentStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default CancellationDetails