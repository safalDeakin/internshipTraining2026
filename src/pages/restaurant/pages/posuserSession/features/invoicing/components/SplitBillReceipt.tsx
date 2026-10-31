import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Printer, Download, HandCoins } from "lucide-react";
import FormFrame from "../../../shared/components/forms/FormFrame";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import StatusOverlay from "../../../shared/components/StatusOverlay";

interface SplitBillReceiptItem {
  id: string;
  name: string;
  qty: number;
  amount: number;
}

interface SplitBill {
  billNo: number;
  invoiceNo?: string | number;
  invoiceDate: string;
  customerName: string;
  tableNo: string;
  paymentMethod: string;
  items: SplitBillReceiptItem[];

  // Values received from backend
  amountPayable?: number; // falls back to total when not provided
  subtotal: number;
  vat: number;
  serviceCharge: number;
  total: number;
}

interface SplitBillReceiptProps {
  bills: SplitBill[];
  onClose: () => void;
}

// Small, subtle scrollbar (Chrome/Edge/Safari + Firefox)
const SMALL_SCROLLBAR =
  "[scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] " +
  "[&::-webkit-scrollbar]:w-1.5 " +
  "[&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:rounded-full " +
  "[&::-webkit-scrollbar-thumb]:bg-gray-300 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-gray-400";

const SplitBillReceipt = ({ bills, onClose }: SplitBillReceiptProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  // Collapsed height = from the top of the receipt down to Bill #1's
  // "Total Amount" row. Everything after it appears only when scrolling.
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstTotalRef = useRef<HTMLDivElement>(null);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [atBottom, setAtBottom] = useState(false);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const measure = () => {
      const total = firstTotalRef.current;
      if (!container || !total) return;

      const height =
        total.getBoundingClientRect().bottom -
        container.getBoundingClientRect().top +
        container.scrollTop +
        12; // small breathing room under the total row

      setCollapsedHeight(Math.ceil(height));
    };

    measure();

    // Re-measure when the panel width changes (e.g. while it animates to
    // receipt width) or the window is resized.
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [bills]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };

  const handlePrint = () => {
    if (isPrinting) return;

    setIsPrinting(true);
    setPrintSuccess(false);

    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);

      setTimeout(() => {
        setPrintSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <FormFrame
      title=" "
      onClose={onClose}
      footer={
        <div className="mx-auto flex w-full max-w-md flex-col gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2.5 text-xs font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            <Printer size={14} />
            {isPrinting ? "Preparing..." : "Print Invoice"}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      }
    >
      <div className="relative mx-auto w-full max-w-md">
        <div
          ref={scrollRef}
          id="split-receipt-print-area"
          onScroll={handleScroll}
          style={
            collapsedHeight
              ? ({ "--collapsed-h": `${collapsedHeight}px` } as CSSProperties)
              : undefined
          }
          className={`w-full overflow-y-auto px-2 text-xs max-h-[var(--collapsed-h)] print:max-h-none print:overflow-visible ${SMALL_SCROLLBAR}`}
        >
          {bills.map((bill, index) => (
            <div
              key={bill.billNo}
              className="border-b border-dashed border-gray-300 pb-6 last:border-0"
            >
              {/* Restaurant Information (only once, centered) */}
              {index === 0 && (
                <div className="text-center">
                  <p className="text-sm font-semibold">VIP Restaurant</p>
                  <p>Banepa-07, Kavre</p>
                  <p>01-11111111</p>
                </div>
              )}

              {/* Bill Information */}
              <div
                className={`space-y-1.5 text-gray-500 ${
                  index === 0 ? "mt-6" : "mt-5"
                }`}
              >
                <p>
                  Bill No: <b className="text-gray-900">#{bill.billNo}</b>
                </p>
                {bill.invoiceNo !== undefined && (
                  <p>
                    Invoice No:{" "}
                    <b className="text-gray-900">#{bill.invoiceNo}</b>
                  </p>
                )}
                <p>
                  Date: <b className="text-gray-900">{bill.invoiceDate}</b>
                </p>
                <p>
                  Table No:{" "}
                  <b className="text-gray-900">{bill.tableNo || "-"}</b>
                </p>
                <p>
                  Customer:{" "}
                  <b className="text-gray-900">{bill.customerName || "-"}</b>
                </p>
              </div>

              <p className="mt-5 text-gray-900">
                Amount Payable:{" "}
                <b>Rs {(bill.amountPayable ?? bill.total).toFixed(0)}</b>
              </p>

              {/* Items Table */}
              <table className="mt-4 w-full border-b border-gray-300 text-left">
                <thead>
                  <tr className="font-medium text-gray-900">
                    <th className="py-2 font-medium">S.no.</th>
                    <th className="font-medium">Items</th>
                    <th className="text-center font-medium">Qty</th>
                    <th className="text-right font-medium">Amt</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  {bill.items.map((item, i) => (
                    <tr key={item.id}>
                      <td className="py-2">{i + 1}</td>
                      <td>{item.name}</td>
                      <td className="text-center">{item.qty} Unit</td>
                      <td className="text-right">
                        Rs {item.amount.toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Bill Summary */}
              <div className="mt-2">
                <div className="border-b border-gray-300 pb-2">
                  <Row
                    label="Subtotal"
                    value={`Rs ${bill.subtotal.toFixed(0)}`}
                    bold
                  />
                </div>

                <div className="space-y-1 border-b border-gray-300 py-2">
                  <Row
                    label="Tax (13% Vat)"
                    value={`Rs ${bill.vat.toFixed(0)}`}
                  />
                  <Row
                    label="10% Service Charge"
                    value={`Rs ${bill.serviceCharge.toFixed(0)}`}
                  />
                </div>

                {/* Receipt is cut off right after this row until scrolled */}
                <div
                  ref={index === 0 ? firstTotalRef : undefined}
                  className="flex items-center justify-between py-3 text-sm font-bold"
                >
                  <span>Total Amount</span>
                  <span className="text-orange-500">
                    Rs {bill.total.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Payment Information */}
              <p className="mt-2 text-gray-600">
                Payment Method:{" "}
                <b className="text-gray-900">{bill.paymentMethod || "-"}</b>
              </p>

              <p className="mt-5 text-center font-medium text-gray-800">
                Thank You!!!
              </p>
            </div>
          ))}
        </div>

        {/* Hint that more of the receipt is below
        {hasMore && !atBottom && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-end justify-center bg-gradient-to-t from-white to-transparent pb-1 text-[10px] text-gray-400 print:hidden">
            Scroll down to see full receipt
          </div>
        )} */}
      </div>

      {isPrinting && <LoadingOverlay />}

      {printSuccess && (
        <StatusOverlay
          show={printSuccess}
          icon={<HandCoins className="h-16 w-16 text-blue-500" />}
          title="Invoice Generated Successfully!"
        />
      )}
    </FormFrame>
  );
};

const Row = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div
    className={`flex items-center justify-between ${
      bold ? "font-semibold text-gray-900" : "text-gray-700"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default SplitBillReceipt;
