interface OpeningStockItem {
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  value: number;
}
interface OpeningStockProps {
  items?: OpeningStockItem[];
  totalValue?: number;
}

const defaultItems: OpeningStockItem[] = [
  {
    productName: "Mineral Water",
    sku: "MW-001",
    quantity: 60,
    unit: "pcs",
    value: 3000
  },
  {
    productName: "Coffee",
    sku: "CF-002",
    quantity: 25,
    unit: "packs",
    value: 7500
  },
  {
    productName: "Green Tea",
    sku: "GT-003",
    quantity: 30,
    unit: "packs",
    value: 4500
  },
];

const OpeningStock = ({ items = defaultItems }: OpeningStockProps) => {
  return (
    <>


      <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

        <h2 className="text-sm font-bold">
          Opening Stock
        </h2>

        <div className="mt-3 overflow-x-auto">

          <table className="w-full border-collapse text-xs">

            <thead className="bg-gray-100">

              <tr >
                <th className=" px-2 py-4 text-left">
                  Product Name
                </th>

                <th className=" px-2 py-4 text-center">
                  Quantity
                </th>

                <th className=" px-2 py-4 text-center ">
                  units
                </th>

                <th className=" px-2 py-4 text-right ">
                  Amount
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
                    {item.quantity}
                  </td>


                  <td className=" px-2 py-4 text-center">
                    {item.unit}
                  </td>

                  <td className=" px-2 py-4 text-right">
                    Rs.{" "}
                    {item.value}
                  </td>
                </tr>))}
            </tbody>
          </table>
          <div className="mt-2 flex justify-between border-t pt-2 font-bold text-sm px-2 py-2 border-gray-300">
            <span>Total Opening Stock</span>
            <span>Rs. {(items.reduce((s, i) => s + i.value, 0))}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpeningStock;
