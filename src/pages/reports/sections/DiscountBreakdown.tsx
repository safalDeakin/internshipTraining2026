

interface DiscountItem {
  type: string;
  count: number;
  amount: number;
  percentage: number;
}

interface DiscountBreakdownProps {
  items?: DiscountItem[];
}

const defaultItems: DiscountItem[] = [
  {
    type: "Member Discount",
    count: 18,
    amount: 5400,
    percentage: 40
  },
  {
    type: "Seasonal Discount",
    count: 12,
    amount: 3600,
    percentage: 27
  },
  {
    type: "Offer Discount",
    count: 15,
    amount: 4500,
    percentage: 33
  },
];

const DiscountBreakdown = ({ items = defaultItems }: DiscountBreakdownProps) => (
  <>
    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Discount Breakdown
      </h2>

      <div className="mt-3 overflow-x-auto">

        <table className="w-full border-collapse text-xs">

          <thead className="bg-gray-100">

            <tr >
              <th className=" px-2 py-4 text-left">
                Discount Type
              </th>

              <th className=" px-2 py-4 text-center">
                Count
              </th>

              <th className=" px-2 py-4 text-right ">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>

            {items.map((item) => (

              <tr
                key={item.type}
                className="hover:bg-gray-100"
              >

                <td className=" px-2 py-4 text-left">
                  {item.type}
                </td>

                <td className=" px-2 py-4 text-center">
                  {item.count}
                </td>

                <td className=" px-2 py-4 text-right">
                  Rs.{" "}
                  {item.amount}
                </td>
              </tr>))}
          </tbody>
        </table>
        <div className="mt-2 flex justify-between border-t pt-2 font-bold text-sm px-2 py-2 border-gray-300">
          <span>Total Discount</span>
          <span>Rs. {(items.reduce((s, i) => s + i.amount, 0))}</span>
        </div>
      </div>
    </section>

  </>
);

export default DiscountBreakdown;
