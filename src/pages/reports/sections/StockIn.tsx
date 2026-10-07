

interface StockInRecord {
  productName: string;
  quantity: number;
  supplier: string;
  date: string;
  value: number;
}
interface StockInProps { records?: StockInRecord[]; }

const defaultRecords: StockInRecord[] = [
  {
    productName: "Mineral Water",
    quantity: 50,
    supplier: "ABC Suppliers",
    date: "2026-09-14",
    value: 2500
  },
  {
    productName: "Coffee",
    quantity: 20,
    supplier: "Himalayan Traders",
    date: "2026-09-15",
    value: 6000
  },
  {
    productName: "Green Tea",
    quantity: 30,
    supplier: "Nepal Foods",
    date: "2026-09-16",
    value: 4500
  },
];

const StockIn = ({ records = defaultRecords }: StockInProps) => (
  <>

    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Stock In
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

              <th className=" px-2 py-4 text-center">
                Date
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

                <td className=" px-2 py-4 text-center">
                  {record.date}
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

export default StockIn;
