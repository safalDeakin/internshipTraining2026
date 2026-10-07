
interface Shift {
  shiftName: string;
  staffName: string;
  startTime: string;
  endTime: string;
  sales: number;
  transactions: number;
}

interface ShiftSummaryProps { shifts?: Shift[]; }

const defaultShifts: Shift[] = [
  {
    shiftName: "Morning",
    staffName: "John",
    startTime: "07:00",
    endTime: "14:00",
    sales: 82400,
    transactions: 43
  },
  {
    shiftName: "Afternoon",
    staffName: "Doe",
    startTime: "14:00",
    endTime: "18:00",
    sales: 61700,
    transactions: 31
  },
  {
    shiftName: "Evening",
    staffName: "Rita",
    startTime: "18:00",
    endTime: "22:00",
    sales: 88000,
    transactions: 49
  },
];

const ShiftSummary = ({ shifts = defaultShifts }: ShiftSummaryProps) => (
  <div >
    <section className="mt-6 border-b-3 border-b-gray-300 pb-6 px-4 py-4 report-keep-together">
      <h2 className="text-sm font-bold">
        Shift Summary
      </h2>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead className="bg-gray-100">

            <tr >
              <th className=" px-2 py-4 text-left">
                Shift
              </th>

              <th className=" px-2 py-4 text-left">
                Staff Name
              </th>

              <th className=" px-2 py-4 text-left print-hidden">
                Start Time
              </th>

              <th className=" px-2 py-4 text-center">
                End Time
              </th>

              <th className=" px-2 py-4 text-center">
                Sales
              </th>

              <th className=" px-2 py-4 text-right">
                Tansactions
              </th>
            </tr>
          </thead>

          <tbody>
            {shifts.map((staff) => (
              <tr key={staff.staffName}
                className="hover:bg-gray-100"
              >
                <td className=" px-2 py-4">
                  {staff.shiftName}
                </td>

                <td className=" px-2 py-4">
                  {staff.staffName}
                </td>

                <td className=" px-2 py-4 print-hidden">
                  {staff.startTime}
                </td>

                <td className=" px-2 py-4 text-center">
                  {staff.endTime}
                </td>

                <td className=" px-2 py-4 text-center">
                  Rs.{" "}
                  {staff.sales}
                </td>

                <td className=" px-2 py-4 text-right">
                  {staff.transactions}
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

    </section>
  </div>

);

export default ShiftSummary;
