import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { SplitBillReceiptProps } from "../../types/InvoiceTypes";
import ReceiptFrame from "../../../../shared/components/forms/ReceiptFrame";

const SMALL_SCROLLBAR =
  "[scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] " +
  "[&::-webkit-scrollbar]:w-1.5 " +
  "[&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:rounded-full " +
  "[&::-webkit-scrollbar-thumb]:bg-gray-300 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-gray-400";

const SplitBillReceipt = ({ bills, onClose }: SplitBillReceiptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstTotalRef = useRef<HTMLDivElement>(null);

  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const measure = () => {
      const total = firstTotalRef.current;
      if (!total) return;

      const height =
        total.getBoundingClientRect().bottom -
        container.getBoundingClientRect().top +
        container.scrollTop +
        12;

      setCollapsedHeight(Math.ceil(height));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [bills]);

  return (
    <div className="h-full w-full">
      <ReceiptFrame
        hotelName="VIP Restaurant"
        address="Banepa-07, Kavre"
        phone="01-11111111"
        onPrint={() => window.print()}
        onDownloadPDF={() => window.print()}
      >
        <div className="relative mx-auto w-full max-w-md">
          <div
            ref={scrollRef}
            id="split-receipt-print-area"
            style={
              collapsedHeight
                ? ({
                    "--collapsed-h": `${collapsedHeight}px`,
                  } as CSSProperties)
                : undefined
            }
            className={`w-full max-h-[var(--collapsed-h)] overflow-y-auto px-2 text-xs print:max-h-none print:overflow-visible ${SMALL_SCROLLBAR}`}
          >
            {bills.map((bill, index) => (
              <div
                key={bill.billNo}
                className="border-b border-dashed border-gray-300 pb-6 last:border-0"
              >
                {/* Bill Information */}
                <div
                  className={`space-y-1.5 text-gray-500 ${
                    index === 0 ? "mt-2" : "mt-5"
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
                    {bill.items.map((item, itemIndex) => (
                      <tr key={item.id}>
                        <td className="py-2">{itemIndex + 1}</td>
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
        </div>
      </ReceiptFrame>
    </div>
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
