

interface SalesSummaryProps {
    totalSales?: number;
    totalOrders?: number;
    averageOrderValue?: number;
    growthPercentage?: number;
}

const SalesSummary = ({
    totalSales = 232100,
    totalOrders = 123,
    averageOrderValue = 1887,
    growthPercentage = 8.6,
}: SalesSummaryProps) => (
    <>
        <section className="mt-6 border-b-3 border-b-gray-300 pb-6 report-keep-together px-4 py-4">
            <h2 className="text-sm font-bold">
                Sales Summary
            </h2>

            <div className="mt-3 space-y-2 text-sm">

                <div className=" max-w-md">
                    <span>
                        Total Sales:
                    </span>

                    <span className="ml-3">
                        Rs.{" "}
                        {totalSales.toLocaleString()}
                    </span>
                </div>


                <div className="max-w-md">
                    <span>
                        Total Orders:
                    </span>

                    <span className="ml-3">
                        {totalOrders.toLocaleString()}
                    </span>
                </div>


                <div className="max-w-md">
                    <span>
                        Average Order Value:
                    </span>

                    <span className="ml-3">
                        Rs.{" "}
                        {averageOrderValue.toLocaleString()}
                    </span>
                </div>

                <div className="max-w-md">
                    <span>
                        Growth Percentage:
                    </span>

                    <span className="ml-3">
                        {growthPercentage.toLocaleString()}
                        %
                    </span>
                </div>

            </div>

        </section>
    </>
);

export default SalesSummary;
