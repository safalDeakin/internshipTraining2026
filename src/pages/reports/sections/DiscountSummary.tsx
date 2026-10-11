
interface DiscountSummaryProps {
  totalDiscount?: number;
  discountedOrders?: number;
  averageDiscount?: number;
  discountRate?: number;
}

const DiscountSummary = ({
  totalDiscount = 13500,
  discountedOrders = 45,
  averageDiscount = 300,
  discountRate = 4.8,
}: DiscountSummaryProps) => (
  <>
    <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together px-4 py-4">
      <h2 className="text-sm font-bold">
        Discount Summary
      </h2>

      <div className="mt-3 space-y-2 text-sm">

        <div className=" max-w-md">
          <span>
            Total Discount:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {totalDiscount.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Discount Orders:
          </span>

          <span className="ml-3">
            {discountedOrders.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Average Discount:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {averageDiscount.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Discount Rate:
          </span>

          <span className="ml-3">
            {discountRate.toLocaleString()}%
          </span>
        </div>

      </div>

    </section>
  </>
);

export default DiscountSummary;
