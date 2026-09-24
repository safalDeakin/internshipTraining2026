import type { ReservationReportData } from "../reservationReportData";

interface ReservationReportTemplateProps {
    report: ReservationReportData;
}

const ReservationSummary = ({ report }: ReservationReportTemplateProps) => {
    return (
        <div>
            <section className="mt-6 border-b-3 border-b-gray-300 pb-4">

                <h2 className="text-sm font-bold">
                    Reservation Summary
                </h2>

                <div className="mt-3 grid grid-cols-1 gap-y-2 text-sm">

                    <div>
                        Total Reservations:

                        <span className="ml-3">
                            {report.summary.totalReservations}
                        </span>
                    </div>


                    <div>
                        Total Guests:

                        <span className="ml-3">
                            {report.summary.totalGuests}
                        </span>
                    </div>


                    <div>
                        Total Reservation Amount:

                        <span className="ml-3">
                            Rs.{" "}
                            {report.summary.totalReservationAmount.toLocaleString()}
                        </span>
                    </div>


                    <div>
                        Total Advance Collection:

                        <span className="ml-3">
                            Rs.{" "}
                            {report.summary.totalAdvanceCollection.toLocaleString()}
                        </span>
                    </div>


                    <div>
                        Total Remaining Amount:

                        <span className="ml-3">
                            Rs.{" "}
                            {report.summary.totalRemainingAmount.toLocaleString()}
                        </span>
                    </div>


                    <div>
                        Confirmed Reservations:

                        <span className="ml-3">
                            {report.summary.confirmedReservations}
                        </span>
                    </div>


                    <div>
                        Cancelled Reservations:

                        <span className="ml-3">
                            {report.summary.cancelledReservations}
                        </span>
                    </div>


                    <div>
                        Completed Reservations:

                        <span className="ml-3">
                            {report.summary.completedReservations}
                        </span>
                    </div>

                </div>

            </section>

        </div>
    )
}

export default ReservationSummary