

interface TaxSummaryProps {
  totalTax?: number;
  taxableSales?: number;
  taxTransactions?: number;
  averageTax?: number;
}

const TaxSummary = ({
  totalTax = 26400,
  taxableSales = 180000,
  taxTransactions = 118,
  averageTax = 224,
}: TaxSummaryProps) => (
  <>

    <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together px-4 py-4">
      <h2 className="text-sm font-bold">
        Tax Summary
      </h2>

      <div className="mt-3 space-y-2 text-sm">

        {/* Total Reservation Amount */}
        <div className=" max-w-md">
          <span>
            Total Tax:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {totalTax.toLocaleString()}
          </span>
        </div>


        {/* Advance Collection */}
        <div className="max-w-md">
          <span>
            Taxable Sales:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {taxableSales.toLocaleString()}
          </span>
        </div>


        {/* Remaining Amount */}
        <div className="max-w-md">
          <span>
            Tax Transactions:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {taxTransactions.toLocaleString()}
          </span>
        </div>

        <div className="max-w-md">
          <span>
            Average Tax:
          </span>

          <span className="ml-3">
            Rs.{" "}
            {averageTax.toLocaleString()}
          </span>
        </div>

      </div>

    </section>
  </>
);

export default TaxSummary;
