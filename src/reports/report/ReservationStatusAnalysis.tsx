import type { ReservationReportData } from "../reservationReportData";

interface ReservationStatusAnalysisProps {
    data: ReservationReportData["statusAnalysis"];
}

const ReservationStatusAnalysis = ({
    data,
}: ReservationStatusAnalysisProps) => {
    return (
        <section className="mt-6 border-b-3 border-b-gray-300 pb-6">
            <h2 className="text-sm font-bold ">
                Reservation Status Analysis
            </h2>

            <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className=" px-2 py-4 text-left">
                                Status
                            </th>
                            <th className=" px-2 py-4 text-center">
                                Reservations
                            </th>
                            <th className=" px-2 py-4 text-right">
                                Percentage
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.status} className="hover:bg-gray-100">
                                <td className=" px-2 py-4">
                                    {item.status}
                                </td>

                                <td className=" px-2 py-4 text-center">
                                    {item.count}
                                </td>

                                <td className=" px-2 py-4 text-right">
                                    {item.percentage}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ReservationStatusAnalysis;