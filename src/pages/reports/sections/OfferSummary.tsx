

interface OfferSummaryProps {
  activeOffers?: number;
  totalUsage?: number;
  offerRevenue?: number;
  offerDiscount?: number;
}

const OfferSummary = ({
  activeOffers = 8, totalUsage = 192, offerRevenue = 149400, offerDiscount = 13500,
}: OfferSummaryProps) => (
  <>
    <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together px-4 py-4">
      <h2 className="text-sm font-bold">
        Offer Summary
      </h2>

      <div className="mt-3 space-y-2 text-sm">

        <div className=" max-w-md">
          <span>
            Active Offers:
          </span>

          <span className="ml-3">
            {" "}
            {activeOffers.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Total Usage:
          </span>

          <span className="ml-3">
            {" "}
            {totalUsage.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Offer Revenue:
          </span>

          <span className="ml-3">
            {" "}
            Rs. {offerRevenue.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Offer Discount:
          </span>

          <span className="ml-3">
            {" "}
            Rs. {offerDiscount.toLocaleString()}
          </span>
        </div>
      </div>

    </section>


  </>
);

export default OfferSummary;
