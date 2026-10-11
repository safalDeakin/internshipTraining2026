

interface StockItem {
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  value: number;
}

interface ClosigStockProps {
  items?: StockItem[];
  totalValue?: number;
}

const defaultItems: StockItem[] = [
  {
    productName: "Mineral Water",
    sku: "MW-001",
    quantity: 42,
    unit: "pcs",
    value: 2100
  },
  {
    productName: "Coffee",
    sku: "CF-002",
    quantity: 18,
    unit: "packs",
    value: 5400
  },
  {
    productName: "Green Tea",
    sku: "GT-003",
    quantity: 25,
    unit: "packs",
    value: 3750
  },
];

const ClosigStock = ({ items = defaultItems, totalValue }: ClosigStockProps) => {
  const total = totalValue ?? items.reduce((sum, item) => sum + item.value, 0);
  return (
    <>

      <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

        <h2 className="text-sm font-bold">
          Closing Stock
        </h2>

        <div className="mt-3 overflow-x-auto">

          <table className="w-full border-collapse text-xs">

            <thead className="bg-gray-100">

              <tr >
                <th className=" px-2 py-4 text-left">
                  Product
                </th>

                <th className=" px-2 py-4 text-center">
                  Quantity
                </th>

                <th className=" px-2 py-4 text-right">
                  Value
                </th>

              </tr>

            </thead>


            <tbody>

              {items.map((item) => (

                <tr
                  key={item.sku}
                  className="hover:bg-gray-100"
                >

                  <td className=" px-2 py-4 text-left">
                    {item.productName}
                  </td>

                  <td className=" px-2 py-4 text-center">
                    {item.quantity} {item.unit}
                  </td>

                  <td className=" px-2 py-4 text-right">
                    Rs.{" "}
                    {item.value}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="mt-2 flex justify-between border-t border-gray-300 pt-2 font-bold text-sm py-2 px-2" >
            <span>Total Closing Stock</span><span>Rs. {(total)}</span>
          </div>

        </div>

      </section>

    </>
  );
};

export default ClosigStock;
