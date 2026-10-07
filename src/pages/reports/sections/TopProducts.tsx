

interface TopProduct {
  rank: number;
  productName: string;
  category: string;
  quantitySold: number;
  revenue: number;
}


interface TopProductsProps {
  products?: TopProduct[];
  limit?: number;
}

const defaultProducts: TopProduct[] = [
  {
    rank: 1,
    productName: "Coffee",
    category: "Beverage",
    quantitySold: 126,
    revenue: 37800
  },
  {
    rank: 2,
    productName: "Chicken Burger",
    category: "Food",
    quantitySold: 98,
    revenue: 34300
  },
  {
    rank: 3,
    productName: "Mineral Water",
    category: "Beverage",
    quantitySold: 87,
    revenue: 4350
  },
  {
    rank: 4,
    productName: "French Fries",
    category: "Food",
    quantitySold: 74,
    revenue: 14800
  },
  {
    rank: 5,
    productName: "Green Tea",
    category: "Beverage",
    quantitySold: 61,
    revenue: 9150
  },
];

const TopProducts = ({ products = defaultProducts }: TopProductsProps) => (
  <>


    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Top Products
      </h2>

      <div className="mt-3 overflow-x-auto">

        <table className="w-full border-collapse text-xs">

          <thead className="bg-gray-100">

            <tr >
              <th className=" px-2 py-4 text-left">
                S.N.
              </th>

              <th className=" px-2 py-4 text-left">
                Product
              </th>

              <th className=" px-2 py-4 text-center">
                Quantity Sold
              </th>

              <th className=" px-2 py-4 text-right">
                Revenue
              </th>

            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr
                key={product.rank}
                className="hover:bg-gray-100"
              >

                <td className=" px-2 py-4 text-left">
                  {product.rank}
                </td>

                <td className=" px-2 py-4 text-left">
                  {product.productName}
                </td>

                <td className=" px-2 py-4 text-center">
                  {product.quantitySold}
                </td>

                <td className=" px-2 py-4 text-right">
                  Rs.{" "}
                  {product.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  </>
);

export default TopProducts;
