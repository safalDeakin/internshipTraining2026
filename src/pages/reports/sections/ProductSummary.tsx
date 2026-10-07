

interface ProductSummaryProps { totalProducts?: number; activeProducts?: number; outOfStock?: number; lowStock?: number; }

const ProductSummary = ({
  totalProducts = 248, activeProducts = 231, outOfStock = 7, lowStock = 10,
}: ProductSummaryProps) => (
  <>
    <section className="mt-6 border-b-3 border-b-gray-300 pb-4 report-keep-together px-4 py-4">
      <h2 className="text-sm font-bold">
        Product Summary
      </h2>

      <div className="mt-3 space-y-2 text-sm">

        <div className=" max-w-md">
          <span>
            Total Products:
          </span>

          <span className="ml-3">
            {" "}
            {totalProducts.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Active Products:
          </span>

          <span className="ml-3">
            {" "}
            {activeProducts.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Low Stock:
          </span>

          <span className="ml-3">
            {" "}
            {lowStock.toLocaleString()}
          </span>
        </div>


        <div className="max-w-md">
          <span>
            Out of Stock:
          </span>

          <span className="ml-3">
            {" "}
            {outOfStock.toLocaleString()}
          </span>
        </div>
      </div>

    </section>
  </>
);

export default ProductSummary;
