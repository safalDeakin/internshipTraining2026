

interface TaxItem {
  name: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}


interface TaxBreakDownProps {
  items?: TaxItem[];
}

const defaultItems: TaxItem[] = [
  {
    name: "VAT",
    rate: 13,
    taxableAmount: 180000,
    taxAmount: 23400
  },
  {
    name: "Service Tax",
    rate: 2,
    taxableAmount: 150000,
    taxAmount: 3000
  },
];

const TaxBreakDown = ({ items = defaultItems }: TaxBreakDownProps) => (
  <>

    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">

      <h2 className="text-sm font-bold">
        Tax BreakDown
      </h2>

      <div className="mt-3 overflow-x-auto">

        <table className="w-full border-collapse text-xs">

          <thead className="bg-gray-100">

            <tr >
              <th className=" px-2 py-4 text-left">
                Tax Type
              </th>

              <th className=" px-2 py-4 text-left">
                Rate
              </th>

              <th className=" px-2 py-4 text-center">
                Taxable Amount
              </th>

              <th className=" px-2 py-4 text-right">
                Tax Amount
              </th>

            </tr>

          </thead>


          <tbody>

            {items.map((item) => (

              <tr
                key={item.name}
                className="hover:bg-gray-100"
              >

                <td className=" px-2 py-4 text-left">
                  {item.name}
                </td>

                <td className=" px-2 py-4 text-left">
                  {item.rate}%
                </td>

                <td className=" px-2 py-4 text-center">
                  Rs.{" "}
                  {item.taxableAmount}
                </td>

                <td className=" px-2 py-4 text-right">
                  Rs.{" "}
                  {item.taxAmount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  </>
);

export default TaxBreakDown;
