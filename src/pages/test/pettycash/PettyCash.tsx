// author: shrajja
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Search } from "lucide-react";
import ReusableButton from "../../restaurant/pages/posuserSession/shared/components/reuse/ReusableButton";
import PettyCashEntryModal, {
  type PettyCashEntry,
} from "./PettyCashEntryModal";

// Sample entries
const initialEntries: PettyCashEntry[] = [
  {
    id: 1,
    type: "out",
    date: "2026-11-02",
    time: "09:30",
    refNo: "PC-001",
    category: "Supplies",
    description: "Cleaning materials",
    amount: 500,
    paymentMethod: "Cash",
  },
  {
    id: 2,
    type: "in",
    date: "2026-11-02",
    time: "11:15",
    refNo: "PC-002",
    category: "Cash Top-up",
    description: "Cash added from owner",
    amount: 2000,
    paymentMethod: "Cash",
  },
  {
    id: 3,
    type: "out",
    date: "2026-11-02",
    time: "14:00",
    refNo: "PC-003",
    category: "Transport",
    description: "Delivery charge",
    amount: 300,
    paymentMethod: "Cash",
  },
];

const formatRs = (value: number) => `Rs. ${value.toLocaleString()}`;

const PettyCash = () => {
  const [openingBalance, setOpeningBalance] = useState(5000);
  const [entries, setEntries] = useState<PettyCashEntry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PettyCashEntry | null>(null);

  // Totals
  const paidIn = entries
    .filter((e) => e.type === "in")
    .reduce((sum, e) => sum + e.amount, 0);

  const paidOut = entries
    .filter((e) => e.type === "out")
    .reduce((sum, e) => sum + e.amount, 0);

  const expectedBalance = openingBalance + paidIn - paidOut;

  // Rows with running balance (oldest -> newest), then filtered by search
  const rows = useMemo(() => {
    const sorted = [...entries].sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
    );

    let running = openingBalance;
    const withBalance = sorted.map((entry) => {
      running += entry.type === "in" ? entry.amount : -entry.amount;
      return { ...entry, balance: running };
    });

    const query = search.trim().toLowerCase();
    if (!query) return withBalance;

    return withBalance.filter((row) =>
      [row.refNo, row.description, row.category, row.date].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [entries, openingBalance, search]);

  // Open modal for new entry
  const handleAddEntry = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditEntry = (id: number) => {
    const entry = entries.find((e) => e.id === id) ?? null;
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  // Update opening balance
  const handleUpdateOpeningBalance = () => {
    const input = window.prompt(
      "Enter opening balance",
      String(openingBalance),
    );
    if (input === null) return;

    const value = Number(input);
    if (Number.isNaN(value) || value < 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setOpeningBalance(value);
  };

  // Save (create or update)
  const handleSaveEntry = (
    data: Omit<PettyCashEntry, "id">,
    editingId?: number,
  ) => {
    if (editingId) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingId ? { ...data, id: editingId } : e)),
      );
    } else {
      setEntries((prev) => [...prev, { ...data, id: Date.now() }]);
    }

    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const summaryBoxClass =
    "flex flex-col items-center justify-center rounded-lg bg-gray-500 p-4 text-center text-white";

  return (
    <div className="w-full min-w-0 bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <h2 className="text-lg font-semibold">Petty Cash</h2>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-b border-gray-200 pb-4">
        <ReusableButton
          type="button"
          title="Opening Balance"
          variant="outline"
          size="sm"
          onClick={handleUpdateOpeningBalance}
        />

        <ReusableButton
          type="button"
          title="Add Entry"
          variant="primary"
          size="sm"
          onClick={handleAddEntry}
        />
      </div>

      {/* SUMMARY BOXES */}
      <div className="mt-5 rounded-lg border border-gray-300 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* OPENING BALANCE */}
          <div className={summaryBoxClass}>
            <p className="text-sm">Opening Balance</p>
            <p className="mt-1 text-lg font-semibold">
              {formatRs(openingBalance)}
            </p>

            <button
              type="button"
              onClick={handleUpdateOpeningBalance}
              className="mt-3 rounded-md border border-white px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-white hover:text-gray-700"
            >
              Update
            </button>
          </div>

          {/* PAID IN */}
          <div className={summaryBoxClass}>
            <p className="text-sm">Paid In</p>
            <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
              {formatRs(paidIn)}
              <span>
                <ArrowDown size={16} />
              </span>
            </p>
          </div>

          {/* PAID OUT */}
          <div className={summaryBoxClass}>
            <p className="text-sm">Paid Out</p>
            <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
              {formatRs(paidOut)}
              <span>
                <ArrowUp size={16} />
              </span>
            </p>
          </div>

          {/* EXPECTED BALANCE */}
          <div className={summaryBoxClass}>
            <p className="text-sm">Expected Balance of the Day</p>
            <p className="mt-1 text-lg font-semibold">
              {formatRs(expectedBalance)}
            </p>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <h3 className="mt-6 text-sm font-semibold text-gray-900">Transaction</h3>

      <div className="relative mt-3 w-full max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 focus:border-[#005395] focus:outline-none"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold text-gray-600">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Ref No</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Paid-in</th>
              <th className="px-4 py-3">Paid-out</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="text-gray-800">
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.refNo || "-"}</td>
                  <td className="px-4 py-3">{row.description || "-"}</td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">
                    {row.type === "in" ? formatRs(row.amount) : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {row.type === "out" ? formatRs(row.amount) : "-"}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatRs(row.balance)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleEditEntry(row.id)}
                      className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#005395]"
                      aria-label="Edit entry"
                    >
                      <Pencil size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PETTY CASH ENTRY MODAL */}
      <PettyCashEntryModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEntry(null);
        }}
        onSave={handleSaveEntry}
        openingBalance={openingBalance}
        currentBalance={expectedBalance}
        editingEntry={editingEntry}
      />
    </div>
  );
};

export default PettyCash;
