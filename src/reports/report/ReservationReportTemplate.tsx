import type { ReservationReportData } from "../reservationReportData";
import CancellationAnalysis from "./CancellationAnalysis";
import CancellationDetails from "./CancellationDetails";

import PaymentSummary from "./PaymentSummary";
import ReservationDetail from "./ReservationDetail";
import ReservationStatusAnalysis from "./ReservationStatusAnalysis";
import ReservationSummary from "./ReservationSummary";

interface ReservationReportTemplateProps {
    report: ReservationReportData;
}

const ReservationReportTemplate = ({
    report,
}: ReservationReportTemplateProps) => {

    return (
        <div className="bg-white text-black">

            {/* Report Header */}
            <div className="border-b-3 border-b-gray-300 pb-4">
                <h1 className="text-xl font-bold text-center">
                    Reservation Report
                </h1>

                <div className="mt-4 grid grid-cols-1 gap-y-2 text-sm ">

                    <div>
                        <span className="">
                            Property:
                        </span>{"      "}
                        {report.property.name}
                    </div>

                    <div>
                        <span className="">
                            Report Date:
                        </span>{" "}
                        {report.property.reportDate}
                    </div>

                    <div>
                        <span className="">
                            Prepared By:
                        </span>{" "}
                        {report.property.preparedBy}
                    </div>

                    <div>
                        <span className="">
                            Location:
                        </span>{" "}
                        {report.property.location}
                    </div>

                </div>

            </div>


            {/*Reservation Summary*/}
            <ReservationSummary report={report} />


            {/*Reservation Detail*/}
            <ReservationDetail report={report} />


            {/*Payment Summary*/}
            <PaymentSummary
                totalReservationAmount={report.payment.totalReservationAmount}
                totalAdvanceCollection={report.payment.totalAdvanceCollection}
                totalRemainingAmount={report.payment.totalRemainingAmount}
            />



            {/*Cancellation Details*/}
            <CancellationDetails data={report.cancellationDetails} />


            {/*Cancellation Analysis*/}
            <CancellationAnalysis data={report.cancellationAnalysis} />


            {/*Reservation Status Analysis*/}
            <ReservationStatusAnalysis data={report.statusAnalysis} />
        </div>
    );
};

export default ReservationReportTemplate;