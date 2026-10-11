interface StockOutRecord {
  productName: string;
  quantity: number;
  reason: string;
  date: string;
  value: number;
}
interface StockOutProps {
  records?: StockOutRecord[];
}

const StockOut = ({ records = [
  {
    productName: "Mineral Water",
    quantity: 18,
    reason: "Sales",
    date: "2026-09-14",
    value: 900
  },
  {
    productName: "Coffee",
    quantity: 7,
    reason: "Sales",
    date: "2026-09-15",
    value: 2100
  },
  {
    productName: "Green Tea",
    quantity: 5,
    reason: "Damaged",
    date: "2026-09-16",
    value: 750
  },
] }: StockOutProps) => (
  <>
    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Stock Out
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

              <th className=" px-2 py-4 text-left">
                Reason
              </th>

              <th className=" px-2 py-4 text-right">
                Value
              </th>

            </tr>

          </thead>


          <tbody>

            {records.map((record) => (

              <tr
                key={record.productName}
                className="hover:bg-gray-100"
              >

                <td className=" px-2 py-4 text-left">
                  {record.productName}
                </td>

                <td className=" px-2 py-4 text-center">
                  {record.quantity}
                </td>

                <td className=" px-2 py-4 text-left">
                  {record.reason}
                </td>

                <td className=" px-2 py-4 text-right">
                  Rs.{" "}
                  {record.value}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  </>
);

export default StockOut;
