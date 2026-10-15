import { useEffect, useMemo, useState } from "react";
import { AU, GB, IN, NP, US } from "country-flag-icons/react/1x1";
import { ChevronDown, Download, X } from "lucide-react";
import type { InvoiceCards } from "../../steps/InvoicingLayout";

const countries = [
  { code: "NP", dialCode: "+977", Flag: NP },
  { code: "IN", dialCode: "+91", Flag: IN },
  { code: "US", dialCode: "+1", Flag: US },
  { code: "GB", dialCode: "+44", Flag: GB },
  { code: "AU", dialCode: "+61", Flag: AU },
];

interface InvoicingFormProps {
  customers: InvoiceCards[]; // every selected KOT / BOT / Reservation card
  onRemove: (id: number) => void; // un-select one card (chip "x")
  onClose: () => void; // clear the whole selection
  onGenerate?: (data: {
    guest: string;
    phone: string;
    references: string[];
    total: number;
  }) => void;
  onSplit?: () => void;
}

const VAT_RATE = 0.13;

const inputClass =
  "h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

const InvoicingForm = ({
  customers,
  onRemove,
  onClose,
  onGenerate,
  onSplit,
}: InvoicingFormProps) => {
  const [guest, setGuest] = useState("");
  const [selectedCode, setSelectedCode] = useState("+977");
  const [phone, setPhone] = useState("");

  const selectedCountry =
    countries.find((c) => c.dialCode === selectedCode) ?? countries[0];

  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");

  // Pre-fill guest details from the first selected card
  const primary = customers[0];
  useEffect(() => {
    if (primary) {
      setGuest(primary.name);
      setPhone(primary.number);
    }
  }, [primary]);

  // Combine items of all selected cards (ids repeat across cards, so build a unique key)
  const rows = useMemo(
    () =>
      customers.flatMap((c) =>
        c.invoiceItems.map((item) => ({ ...item, key: `${c.id}-${item.id}` })),
      ),
    [customers],
  );

  const subtotal = useMemo(
    () => rows.reduce((sum, item) => sum + item.amount, 0),
    [rows],
  );
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const handleGenerate = () => {
    onGenerate?.({
      guest,
      phone: `${selectedCode}${phone}`,
      references: customers.map((c) => c.reference),
      total,
    });
  };

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-gray-800">Invoice</h2>
          <p className="text-xs text-gray-500">Date: {today}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close invoice"
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Customer billing information */}
      <h3 className="mb-2 text-xs font-semibold text-gray-800">
        Customer Billing Info
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.6fr]">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="guest-name" className="text-[11px] font-medium">
            Guest Name
          </label>
          <input
            id="guest-name"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="guest-phone" className="text-[11px] font-medium">
            Mobile Number
          </label>

          <div className="flex h-9 items-center rounded-lg border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
            <div className="relative flex h-full shrink-0 items-center border-r border-gray-300">
              <selectedCountry.Flag className="pointer-events-none absolute left-2.5 h-4 w-4 rounded-full object-cover" />
              <select
                aria-label="Country code"
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="h-full appearance-none rounded-l-lg bg-transparent pl-9 pr-7 text-sm outline-none"
              >
                {countries.map(({ code, dialCode }) => (
                  <option key={code} value={dialCode}>
                    {dialCode}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-gray-400" />
            </div>

            <input
              id="guest-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9800000000"
              className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reference numbers (one blue chip per selected KOT / BOT / Reservation) */}
      <div className="mt-3 rounded-lg border border-gray-300 p-3">
        <p className="mb-2 text-xs font-semibold text-gray-800">
          Reference Number
        </p>
        <div className="flex flex-wrap gap-2">
          {customers.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {c.reference}
              <button
                type="button"
                onClick={() => onRemove(c.id)}
                aria-label={`Remove ${c.reference}`}
                className="rounded-full p-0.5 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mt-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 font-semibold text-gray-800">
              <th className="py-1.5">S.No.</th>
              <th>Items</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={item.key} className="text-gray-700">
                <td className="py-1.5">{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">{item.quantity} Unit</td>
                <td className="text-right">Rs {item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 flex items-center justify-between border-t border-gray-300 pt-2 text-xs">
          <span className="text-gray-900">Subtotal</span>
          <span>Rs {subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-gray-300 pt-2 text-xs">
          <span className="text-gray-900">Tax (13% Vat)</span>
          <span>Rs {vat.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-gray-300 pt-2">
          <span className="text-sm font-bold text-gray-900">Total</span>
          <span className="text-sm font-semibold text-orange-600">
            Rs {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <button
          type="button"
          onClick={handleGenerate}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          Generate Sales Receipt <Download className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSplit}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          Split Bill <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InvoicingForm;
