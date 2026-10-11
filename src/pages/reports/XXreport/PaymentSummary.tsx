interface PaymentSummaryProps {
    totalReservationAmount: number;
    totalAdvanceCollection: number;
    totalRemainingAmount: number;
}

const PaymentSummary = ({
    totalReservationAmount,
    totalAdvanceCollection,
    totalRemainingAmount,
}: PaymentSummaryProps) => {
    return (
        <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together">
            <h2 className="text-sm font-bold">
                Payment Summary
            </h2>

            <div className="mt-3 space-y-2 text-sm">

                {/* Total Reservation Amount */}
                <div className=" max-w-md">
                    <span>
                        Total Reservation Amount:
                    </span>

                    <span className="ml-3">
                        Rs.{" "}
                        {totalReservationAmount.toLocaleString()}
                    </span>
                </div>


                {/* Advance Collection */}
                <div className="max-w-md">
                    <span>
                        Total Advance Collection:
                    </span>

                    <span className="ml-3">
                        Rs.{" "}
                        {totalAdvanceCollection.toLocaleString()}
                    </span>
                </div>


                {/* Remaining Amount */}
                <div className="max-w-md">
                    <span>
                        Total Remaining Amount:
                    </span>

                    <span className="ml-3">
                        Rs.{" "}
                        {totalRemainingAmount.toLocaleString()}
                    </span>
                </div>

            </div>

        </section>
    );
};

export default PaymentSummary;