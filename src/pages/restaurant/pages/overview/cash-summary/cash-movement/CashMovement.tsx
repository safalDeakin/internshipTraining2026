// author: shrajja

import { useState } from "react";
import { Download, Printer, Search, Wallet } from "lucide-react";

import ReusableButton from "../../../../../../shell/shared/components/ReusableButton";
import PettyCashEntryModal from "../petty-cash/PettyCashEntryModal";
import Toolbar from "../../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../../lib/component/Container/Container";

import CashPaidOutForm, { type CashPaidOutData } from "./CashPaidOutForm";

import CashDropForm, { type CashDropData } from "./CashDropForm";
import TabView from "../../../../../../lib/component/Tabview/TabView";

const OPENING_BALANCE = 10000;

// MOCK DATA: BY SHIFT

const SHIFT_ROWS = [
  {
    id: 1,
    shift: "Morning",
    staffName: "Sita Shrestha",
    date: "2083/02/03",
    openingAmount: 10000,
    closingAmount: 100000,
    salesCollection: 70000,
    advanceCollection: 10000,
    dueCollection: 10000,
    outstandingAmount: 10000,
    cashOut: 10000,
  },
  {
    id: 2,
    shift: "Morning",
    staffName: "Ram Shrestha",
    date: "2083/02/03",
    openingAmount: 10000,
    closingAmount: 100000,
    salesCollection: 70000,
    advanceCollection: 10000,
    dueCollection: 10000,
    outstandingAmount: 10000,
    cashOut: 10000,
  },
  {
    id: 3,
    shift: "Morning",
    staffName: "Sita Shrestha",
    date: "2083/02/03",
    openingAmount: 10000,
    closingAmount: 100000,
    salesCollection: 70000,
    advanceCollection: 10000,
    dueCollection: 10000,
    outstandingAmount: 10000,
    cashOut: 10000,
  },
  {
    id: 4,
    shift: "Morning",
    staffName: "Sita Shrestha",
    date: "2083/02/03",
    openingAmount: 10000,
    closingAmount: 100000,
    salesCollection: 70000,
    advanceCollection: 10000,
    dueCollection: 10000,
    outstandingAmount: 10000,
    cashOut: 10000,
  },
  {
    id: 5,
    shift: "Morning",
    staffName: "Sita Shrestha",
    date: "2083/02/03",
    openingAmount: 10000,
    closingAmount: 100000,
    salesCollection: 70000,
    advanceCollection: 10000,
    dueCollection: 10000,
    outstandingAmount: 10000,
    cashOut: 10000,
  },
];

//  MOCK DATA: BY INVOICE

const INVOICE_ROWS = [
  {
    id: 1,
    date: "2083/02/03",
    invoiceNo: "CTV#121",
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
    invoiceNo: "CTV#122",
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
    invoiceNo: "CTV#123",
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
    invoiceNo: "CTV#124",
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
    invoiceNo: "CTV#125",
    particular: "Krishna Ghimire",
    type: "Cash Out",
    cashOut: 1000,
    cashIn: 0,
    balance: 10000,
    approvedBy: "Tina",
  },
];

// ---------------- COMMON STYLES ----------------

const selectClass =
  "h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 focus:border-[#005395] focus:outline-none";

const FilterField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="w-full sm:flex-1 sm:min-w-[140px]">
    <label className="mb-1 block text-xs text-gray-700">{label}</label>
    {children}
  </div>
);

const tableHeadClass =
  "border-b border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-600 whitespace-normal break-words leading-tight text-center";

const tableCellClass =
  "border-b border-gray-100 px-3 py-2.5 text-sm text-gray-700 whitespace-nowrap";
//- BY SHIFT TABLE

const ByShiftTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[90px] text-left">
        <thead>
          <tr>
            {[
              "S.N",
              "Shifts",
              "Staff Name",
              "Date",
              "Opening Amount",
              "Closing Amount",
              "Sales Collection",
              "Advance Collection",
              "Due Amount Collection",
              "Outstanding Amount",
              "Cash Out",
            ].map((heading) => (
              <th key={heading} className={tableHeadClass}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {SHIFT_ROWS.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className={`${tableCellClass} text-[#005395]`}>
                {index + 1}
              </td>
              <td className={tableCellClass}>{row.shift}</td>
              <td className={tableCellClass}>{row.staffName}</td>
              <td className={tableCellClass}>{row.date}</td>
              <td className={tableCellClass}>
                Rs.{row.openingAmount.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.closingAmount.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.salesCollection.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.advanceCollection.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.dueCollection.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.outstandingAmount.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.cashOut.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//  BY INVOICE TABLE

const ByInvoiceTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[950px] text-center">
        <thead>
          <tr>
            {[
              "S.N",
              "Date",
              "Invoice No",
              "Particular",
              "Transaction Type",
              "Cash Out",
              "Cash In",
              "Running Balance",
              "Approved By",
            ].map((heading) => (
              <th key={heading} className={tableHeadClass}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {INVOICE_ROWS.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className={`${tableCellClass} text-[#005395]`}>
                {index + 1}
              </td>
              <td className={tableCellClass}>{row.date}</td>
              <td className={tableCellClass}>{row.invoiceNo}</td>
              <td className={tableCellClass}>{row.particular}</td>
              <td className={tableCellClass}>{row.type}</td>
              <td className={tableCellClass}>
                Rs.{row.cashOut.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.cashIn.toLocaleString()}
              </td>
              <td className={tableCellClass}>
                Rs.{row.balance.toLocaleString()}
              </td>
              <td className={tableCellClass}>{row.approvedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//  MAIN COMPONENT
const CashMovement = () => {
  const [cashInModalOpen, setCashInModalOpen] = useState(false);
  const [cashOutModalOpen, setCashOutModalOpen] = useState(false);
  const [cashDropModalOpen, setCashDropModalOpen] = useState(false);

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
          <div className="flex flex-wrap items-center gap-2">
            <ReusableButton
              type="button"
              title="Add Cash In"
              variant="secondary"
              size="sm"
              onClick={() => setCashInModalOpen(true)}
            />

            <ReusableButton
              type="button"
              title="Add Cash Out"
              variant="secondary"
              size="sm"
              onClick={() => setCashOutModalOpen(true)}
            />

            <ReusableButton
              type="button"
              title="Cash Drop"
              variant="secondary"
              size="sm"
              onClick={() => setCashDropModalOpen(true)}
            />

            <ReusableButton
              type="button"
              title="Export CSV"
              variant="outline"
              icon={<Download className="h-4 w-4 text-gray-500" />}
              size="sm"
            />

            <ReusableButton
              type="button"
              title="Print as PDF"
              icon={<Printer className="h-4 w-4 text-gray-500" />}
              variant="outline"
              size="sm"
            />
          </div>
        }
      />

      <Container type="box" background="surface-default">
        {/* FILTERS */}
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <FilterField label="Shift">
            <select className={selectClass} defaultValue="">
              <option value="">All Category</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </FilterField>

          <FilterField label="Staff">
            <select className={selectClass} defaultValue="">
              <option value="">All Department</option>
              <option value="sita">Sita Shrestha</option>
              <option value="ram">Ram Shrestha</option>
            </select>
          </FilterField>

          <FilterField label="Transaction Type">
            <select className={selectClass} defaultValue="">
              <option value="">All Status</option>
              <option value="cash-in">Cash In</option>
              <option value="cash-out">Cash Out</option>
            </select>
          </FilterField>

          <div className="w-full sm:flex-[1.5] sm:min-w-[200px]">
            <label className="mb-1 block text-xs text-gray-700">
              Search By
            </label>

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

        {/* TABS */}
        <div className="mt-5">
          <TabView
            tabs={[
              {
                label: "By Shift",
                content: ByShiftTable,
              },
              {
                label: "By Invoice",
                content: ByInvoiceTable,
              },
            ]}
          />
        </div>
      </Container>

      {/* CASH IN MODAL */}
      <PettyCashEntryModal
        open={cashInModalOpen}
        onClose={() => setCashInModalOpen(false)}
        onSave={() => setCashInModalOpen(false)}
        openingBalance={OPENING_BALANCE}
        currentBalance={OPENING_BALANCE}
        editingEntry={null}
      />

      {/* CASH OUT MODAL */}
      <CashPaidOutForm
        open={cashOutModalOpen}
        onClose={() => setCashOutModalOpen(false)}
        onConfirm={(data: CashPaidOutData) => {
          console.log("Cash Paid Out:", data);
          setCashOutModalOpen(false);
        }}
      />

      {/* CASH DROP MODAL */}
      <CashDropForm
        open={cashDropModalOpen}
        onClose={() => setCashDropModalOpen(false)}
        onConfirm={(data: CashDropData) => {
          console.log("Cash Drop:", data);
          setCashDropModalOpen(false);
        }}
      />
    </div>
  );
};

export default CashMovement;
