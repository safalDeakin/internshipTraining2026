import { Download, Printer, ReceiptText } from "lucide-react";

import type { GuestFolio } from "./BillingLayout";

import Toolbar from "../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../lib/component/Container/Container";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";

interface BillingDetailsProps {
  folio: GuestFolio;
  onReceivePayment: () => void;
  onExportCSV: () => void;
  onPrintPDF: () => void;
}

const formatCurrency = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-IN")}`;

const BillingDetails = ({
  folio,
  onReceivePayment,
  onExportCSV,
  onPrintPDF,
}: BillingDetailsProps) => {
  const subTotal = folio.details.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return (
    <>
      {/* HEADER TOOLBAR */}

      <Toolbar
        left={
          <div className="flex items-center gap-2">
            <ReceiptText size={17} className="text-gray-600" />

            <span className="text-sm font-semibold text-gray-700">
              {folio.roomNo}-#{folio.folioNo}
            </span>
          </div>
        }
        right={
          <div className="flex flex-wrap items-center gap-2">
            <ReusableButton variant="outline" size="sm" onClick={onExportCSV}>
              <Download size={14} />
              Export CSV
            </ReusableButton>

            <ReusableButton variant="outline" size="sm" onClick={onPrintPDF}>
              <Printer size={14} />
              Print as PDF
            </ReusableButton>
          </div>
        }
      />

      {/* GUEST INFORMATION */}

      <Container type="box" background="surface-default">
        <div className="space-y-2">
          <p className="text-xs text-gray-600">FOL- {folio.folioNo}</p>

          <h3 className="text-sm font-semibold text-gray-900">
            {folio.guestName}
          </h3>

          <p className="text-xs text-gray-400">
            {folio.roomNo} | {folio.roomType} | {folio.checkIn}
          </p>
        </div>
      </Container>

      {/* PAYMENT SUMMARY */}

      <Container type="box" background="surface-default">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-700">Total Charge</p>

            <p className="mt-1 text-sm font-semibold">
              {formatCurrency(folio.totalCharge)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-700">Amount Paid</p>

            <p className="mt-1 text-sm font-semibold">
              {formatCurrency(folio.amountPaid)}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-gray-400">Outstanding Amount</p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {formatCurrency(folio.outstandingAmount)}
            </p>
          </div>
        </div>
      </Container>

      {/* FOLIO DETAIL */}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800">Folio Detail</h3>

        <Container type="box" background="surface-default">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-3 font-medium">Description</th>

                  <th className="p-3 text-right font-medium">
                    Total Remaining
                  </th>
                </tr>
              </thead>

              <tbody>
                {folio.details.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 text-gray-700">{item.description}</td>

                    <td className="p-3 text-right text-gray-700">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}

                <tr className="border-b border-gray-100 font-semibold">
                  <td className="p-3">Sub Total</td>
                  <td className="p-3 text-right">{formatCurrency(subTotal)}</td>
                </tr>

                <tr className="border-b border-gray-100 font-semibold">
                  <td className="p-3">Tax (13%)</td>
                  <td className="p-3 text-right">Rs. 0</td>
                </tr>

                <tr className="font-semibold">
                  <td className="p-3">Total</td>
                  <td className="p-3 text-right">{formatCurrency(subTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </div>

      {/* PAYMENT HISTORY */}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">Payment History</h3>

        {folio.paymentHistory.length > 0 ? (
          <div className="space-y-2">
            {folio.paymentHistory.map((payment, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-700"
              >
                <span>{payment.date}</span>
                <span>{payment.method}</span>
                <span>{formatCurrency(payment.amount)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No payment history available.</p>
        )}
      </div>

      {/* RECEIVE PAYMENT */}

      <div className="flex justify-end pt-5 pb-4">
        <ReusableButton variant="primary" onClick={onReceivePayment}>
          Receive Payment
        </ReusableButton>
      </div>
    </>
  );
};

export default BillingDetails;
