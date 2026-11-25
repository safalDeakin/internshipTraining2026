import { useState, type FormEvent } from "react";
import useDialogBox from "../../lib/component/DialogueBox/useDialogueBox";
import ReusableButton from "../shared/components/ReusableButton";
import { ArrowDown, CheckCircle } from "lucide-react";
import StatusOverlay from "../shared/components/StatusOverlay";

type ReturnItem = {
  name?: string;
  itemName?: string;
  quantity?: number;
  qty?: number;
  price?: number;
  amount?: number;
  total?: number;
};

type ReturnInvoice = {
  invoiceNumber: string;
  customerName: string;
  phone: string;
  date: string;
  totalAmount: number;
  items: ReturnItem[];
};

type ReturnRequest = {
  invoiceNumber: string;
  paymentMethod: string;
  refundMethod: string;
  items: {
    name: string;
    reason: string;
    quantity: number;
    amount: number;
  }[];
};

type ApplyReturnModalProps = {
  invoice: ReturnInvoice;
  onSubmit?: (request: ReturnRequest) => void;
};

const ApplyReturnModal = ({ invoice, onSubmit }: ApplyReturnModalProps) => {
  const { closeDialog } = useDialogBox();

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [refundMethod, setRefundMethod] = useState("Refund");
  const [showSuccess, setShowSuccess] = useState(false);

  const items = invoice.items.map((item) => {
    const quantity = item.quantity ?? item.qty ?? 1;
    const amount = item.total ?? item.amount ?? (item.price ?? 0) * quantity;

    return {
      name: item.name ?? item.itemName ?? "Item",
      reason: "Damaged",
      quantity,
      amount,
    };
  });

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (showSuccess) return;

    onSubmit?.({
      invoiceNumber: invoice.invoiceNumber,
      paymentMethod,
      refundMethod,
      items,
    });

    setShowSuccess(true);

    setTimeout(() => {
      closeDialog();
    }, 2000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            Invoice #{invoice.invoiceNumber}
          </p>

          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <p>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium text-gray-800">
                {invoice.customerName}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Phone Number:</span>{" "}
              <span className="font-medium text-gray-800">{invoice.phone}</span>
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Date:{" "}
            <span className="font-medium text-gray-800">{invoice.date}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[380px] text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 pr-2">S.No.</th>
                <th className="py-2 pr-2">Items</th>
                <th className="py-2 pr-2">Reason</th>
                <th className="py-2 pr-2 text-center">Qty</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 pr-2">{index + 1}</td>
                  <td className="py-2 pr-2">{item.name}</td>
                  <td className="py-2 pr-2">{item.reason}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right whitespace-nowrap">
                    Rs {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-2">
          <span className="font-bold">Total Amount</span>
          <span className="text-orange-600">Rs {totalAmount}</span>
        </div>

        <div className="flex justify-end">
          <ReusableButton
            type="button"
            title="Add"
            variant="primary"
            size="sm"
            className="w-auto"
            icon={<ArrowDown size={16} />}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Banking">Banking</option>
            <option value="Digital">Digital</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Refund Method:</label>
          <select
            value={refundMethod}
            onChange={(event) => setRefundMethod(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
          >
            <option value="Refund">Refund</option>
            <option value="Store Credit">Store Credit</option>
            <option value="Exchange">Exchange</option>
          </select>
        </div>

        <p className="text-sm text-gray-700">
          Purchase Date: <span className="font-semibold">{invoice.date}</span>
        </p>

        <div className="flex justify-center pt-3">
          <ReusableButton
            type="submit"
            title="Submit for Approval"
            variant="primary"
            size="md"
            className="w-auto"
            disabled={showSuccess}
          />
        </div>
      </form>

      <StatusOverlay
        show={showSuccess}
        icon={<CheckCircle size={60} className="text-green-500" />}
        title="Return Successful"
      />
    </div>
  );
};

export default ApplyReturnModal;
