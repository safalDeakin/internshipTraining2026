import type { ReservationReportData } from "../reservationReportData";

interface ReservationReportTemplateProps {
    report: ReservationReportData;
}

const ReservationDetail = ({ report }: ReservationReportTemplateProps) => {
    return (
        <div>
            <section className="mt-6 border-b-3 border-b-gray-300 pb-6">

                <h2 className="text-sm font-bold">
                    Reservation Detail
                </h2>

                <div className="mt-3 overflow-x-auto">

                    <table className="w-full border-collapse text-xs">

                        <thead className="bg-gray-100">

                            <tr >
                                <th className=" px-2 py-4 text-left">
                                    R.No
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Name
                                </th>

                                <th className=" px-2 py-4 text-left print-hidden">
                                    Contact
                                </th>

                                <th className=" px-2 py-4 text-center">
                                    Guest No
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Date
                                </th>

                                <th className=" px-2 py-4 text-right">
                                    Total Amount
                                </th>

                                <th className=" px-2 py-4 text-right">
                                    Advance
                                </th>

                                <th className=" px-2 py-4 text-right">
                                    Remaining
                                </th>

                                <th className=" px-2 py-4 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {report.details.map((reservation) => (

                                <tr
                                    key={reservation.reservationId}
                                    className="hover:bg-gray-100"
                                >

                                    <td className=" px-2 py-4">
                                        {reservation.reservationId}
                                    </td>

                                    <td className=" px-2 py-4">
                                        {reservation.guestName}
                                    </td>

                                    <td className=" px-2 py-4 print-hidden">
                                        {reservation.contact}
                                    </td>

                                    <td className=" px-2 py-4 text-center">
                                        {reservation.guestCount}
                                    </td>

                                    <td className=" px-2 py-4">
                                        {reservation.date}
                                    </td>

                                    <td className=" px-2 py-4 text-right">
                                        
                                        {reservation.totalAmount.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4 text-right">
                                        
                                        {reservation.advanceAmount.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4 text-right">
                                        
                                        {reservation.remainingAmount.toLocaleString()}
                                    </td>

                                    <td className=" px-2 py-4">
                                        {reservation.status}
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

export default ReservationDetail