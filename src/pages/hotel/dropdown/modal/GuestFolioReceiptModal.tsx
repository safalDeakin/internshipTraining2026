import { Printer, X } from "lucide-react";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";

export interface GuestFolioReceiptData {
  hotelName: string;
  address: string;
  phone: string;

  receiptNo: string;
  paymentDate: string;

  guestName: string;
  reservationNumber: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;

  totalBookingAmount: number;
  currentAdvancePayment: number;
  totalPaid: number;
  totalDue: number;

  amountInWords: string;
  advanceReason: string;
  receivedBy: string;
}

interface GuestFolioReceiptModalProps {
  receipt: GuestFolioReceiptData;
  onClose: () => void;
}

const GuestFolioReceiptModal = ({
  receipt,
  onClose,
}: GuestFolioReceiptModalProps) => {
  const formatAmount = (amount: number) =>
    `Rs ${amount.toLocaleString("en-IN")}`;

  const guestInfo = [
    ["Guest Name", receipt.guestName],
    ["Reservation Number", receipt.reservationNumber],
    ["Room Number", receipt.roomNumber],
    ["Check In Date", receipt.checkInDate],
    ["Check Out Date", receipt.checkOutDate],
  ];

  return (
    <div className="">
      {/* Hotel Information */}
      <div className="mb-6 text-center">
        <h2 className="text-base font-bold leading-6">{receipt.hotelName}</h2>
        <p className="text-base font-bold leading-6">{receipt.address}</p>
        <p className="text-base font-bold leading-6">{receipt.phone}</p>
      </div>

      {/* Receipt Information */}
      <div className="mb-4 space-y-3 text-base">
        <p>Advance Receipt No: {receipt.receiptNo}</p>
        <p>Advance Payment Date: {receipt.paymentDate}</p>
      </div>

      {/* Guest Information */}
      <section className="mb-7">
        <h3 className="mb-2 px-1 text-base font-semibold">Guest Information</h3>

        <div className="space-y-2 rounded-lg border border-gray-200 px-2 py-3 text-xs">
          {guestInfo.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[138px_1fr]">
              <span className="text-gray-700">{label}</span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Advance Summary */}
      <section className="mb-4">
        <h3 className="mb-2 text-xs font-bold">Advance Summary</h3>

        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-y border-gray-200 text-left font-medium">
              <th className="px-2 py-3 font-medium">S.No.</th>
              <th className="py-3 text-center font-medium">Description</th>
              <th className="px-2 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-2 py-3">1</td>
              <td className="text-center text-gray-700">Total Booking</td>
              <td className="px-2 text-right font-bold">
                {formatAmount(receipt.totalBookingAmount)}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="px-2 py-3">2</td>
              <td className="text-center text-gray-700">
                Current Advance Payment
              </td>
              <td className="px-2 text-right font-bold">
                {formatAmount(receipt.currentAdvancePayment)}
              </td>
            </tr>
          </tbody>

          <tfoot className="text-sm">
            <tr className="border-b border-gray-200">
              <td colSpan={2} className="px-2 py-3 font-medium">
                Total Paid
              </td>
              <td className="px-2 text-right">
                {formatAmount(receipt.totalPaid)}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td colSpan={2} className="px-2 py-3 font-medium">
                Total Due
              </td>
              <td className="px-2 text-right">
                {formatAmount(receipt.totalDue)}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Additional Information */}
      <section className="space-y-4 px-2 text-xs">
        <div className="space-y-1">
          <p className="font-bold">Amount In Word</p>
          <p className="font-semibold text-gray-400">{receipt.amountInWords}</p>
        </div>

        <div className="space-y-1">
          <p className="font-bold">Advance Reason</p>
          <p className="font-semibold text-gray-400">{receipt.advanceReason}</p>
        </div>
      </section>

      {/* Signature */}
      <div className="mt-6 flex justify-end pr-2">
        <div className="space-y-1 text-right text-xs">
          <p className="mr-4 font-bold">Signature</p>
          <p>
            <span className="font-bold">Received By :</span>{" "}
            {receipt.receivedBy}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4 print:hidden">
        <ReusableButton variant="outline" onClick={onClose}>
          <X size={15} />
          Close
        </ReusableButton>

        <ReusableButton variant="primary" onClick={() => window.print()}>
          <Printer size={15} />
          Print Receipt
        </ReusableButton>
      </div>
    </div>
  );
};

export default GuestFolioReceiptModal;
