import { useState } from "react";
import { Download, Printer, Search, Wallet } from "lucide-react";
import ReusableButton from "../../../../../../shell/shared/components/ReusableButton";
import PettyCashEntryModal from "../petty-cash/PettyCashEntryModal";
import Toolbar from "../../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../../lib/component/Container/Container";

const OPENING_BALANCE = 10000;

// Mock data (UI only)
const MOCK_ROWS = [
  {
    id: 1,
    date: "2083/02/03",
    voucherNo: "CTV#121",
    particular: "Bikram Thapa",
    type: "Opening Balance",
    cashOut: 0,
    cashIn: 0,
    balance: 10000,
    approvedBy: "Tina",
  },
  {
    id: 2,
    date: "2083/02/03",
    voucherNo: "CTV#121",
    particular: "Bikram Thapa",
    type: "Cash In",
    cashOut: 0,
    cashIn: 1000,
    balance: 11000,
    approvedBy: "Tina",
  },
  {
    id: 3,
    date: "2083/02/03",
    voucherNo: "CTV#121",
    particular: "Dipa Shrestha",
    type: "Cash Out",
    cashOut: 1000,
    cashIn: 0,
    balance: 10000,
    approvedBy: "Tina",
  },
  {
    id: 4,
    date: "2083/02/03",
    voucherNo: "CTV#121",
    particular: "Ram Thapa",
    type: "Cash In",
    cashOut: 0,
    cashIn: 1000,
    balance: 11000,
    approvedBy: "Tina",
  },
  {
    id: 5,
    date: "2083/02/03",
    voucherNo: "CTV#121",
    particular: "Krishna Ghimire",
    type: "Cash Out",
    cashOut: 1000,
    cashIn: 0,
    balance: 10000,
    approvedBy: "Tina",
  },
];

const selectClass =
  "h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 focus:border-[#005395] focus:outline-none";

const FilterField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="w-full sm:w-50">
    <label className="mb-1 block  text-gray-700">{label}</label>
    {children}
  </div>
);

const CashMovement = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="rounded-xl bg-white p-4">
      {/* HEADER */}
      <Toolbar
        left={
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-[#005395]" />
            <h2 className="text-base font-semibold text-gray-900">
              Cash Movement
            </h2>
          </div>
        }
        right={
          <div className="flex items-center gap-2">
            <ReusableButton
              type="button"
              title="Add Cash In"
              variant="secondary"
              size="sm"
              onClick={() => setModalOpen(true)}
            />
            <ReusableButton
              type="button"
              title="Add Cash Out"
              variant="secondary"
              size="sm"
              onClick={() => setModalOpen(true)}
            />
            <ReusableButton
              type="button"
              title="Export CSV"
              variant="outline"
              icon={<Download className="text-gray-500 w-4 h-4" />}
              size="sm"
            />
            <ReusableButton
              type="button"
              title="Print as PDF"
              icon={<Printer className="text-gray-500 w-4 h-4" />}
              variant="outline"
              size="sm"
            />
          </div>
        }
      />

      <Container type="box" background="surface-default">
        {/* FILTERS */}
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <FilterField label="Transaction Type">
            <select className={selectClass} defaultValue="">
              <option value="">All Category</option>
              <option value="in">Cash In</option>
              <option value="out">Cash Out</option>
            </select>
          </FilterField>

          <FilterField label="Department">
            <select className={selectClass} defaultValue="">
              <option value="">All Department</option>
            </select>
          </FilterField>

          <FilterField label="Status">
            <select className={selectClass} defaultValue="">
              <option value="">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </FilterField>

          <div className="w-full sm:w-70">
            <label className="mb-1 block text-gray-700">Search By</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search By"
                className={`${selectClass} pr-9`}
              />
              <Search
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-center text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                {[
                  "S.N",
                  "Date",
                  "Voucher No",
                  "Particular",
                  "Transaction Type",
                  "Cash Out",
                  "Cash In",
                  "Running Balance",
                  "Approved By",
                ].map((h) => (
                  <th key={h} className="px-3 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {MOCK_ROWS.map((r, i) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="px-3 py-3 text-[#005395]">{i + 1}</td>
                  <td className="px-3 py-3">{r.date}</td>
                  <td className="px-3 py-3">{r.voucherNo}</td>
                  <td className="px-3 py-3">{r.particular}</td>
                  <td className="px-3 py-3">{r.type}</td>
                  <td className="px-3 py-3">Rs {r.cashOut.toLocaleString()}</td>
                  <td className="px-3 py-3">Rs {r.cashIn.toLocaleString()}</td>
                  <td className="px-3 py-3">{r.balance.toLocaleString()}</td>
                  <td className="px-3 py-3">{r.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* MODAL */}
      <PettyCashEntryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => setModalOpen(false)}
        openingBalance={OPENING_BALANCE}
        currentBalance={OPENING_BALANCE}
        editingEntry={null}
      />
    </div>
  );
};

export default CashMovement;
