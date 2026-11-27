import { CheckCircle2, Printer } from "lucide-react";
import type { ApprovalCard } from "../types/ApprovalTypes";

interface ApprovalReceiptProps {
  approval: ApprovalCard;
  remark: string;
  onBack: () => void;
}

const ApprovalReceipt = ({
  approval,
  remark,
  onBack,
}: ApprovalReceiptProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* Receipt Header */}
      <div className="flex flex-col items-center border-b border-dashed border-gray-300 pb-5 text-center">
        <CheckCircle2 className="mb-2 h-12 w-12 text-green-600" />

        <h3 className="text-lg font-semibold text-gray-800">
          Approval Successful
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Request has been approved successfully.
        </p>
      </div>

      {/* Receipt Information */}
      <div className="space-y-3 border-b border-gray-200 py-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Approval Information
        </h4>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Request No</span>
          <span>{approval.requestNo}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Request Type</span>
          <span>{approval.requestType}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Requested By</span>
          <span>{approval.requestedBy}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Requested Amount</span>
          <span>Rs. {approval.amount}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Approval Status</span>
          <span className="font-medium text-green-600">Approved</span>
        </div>
      </div>

      {/* Remark */}
      <div className="border-b border-gray-200 py-4">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">
          Approval Remark
        </h4>

        <p className="text-sm text-gray-600">
          {remark || "No remark provided"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Printer size={16} />
          Print Receipt
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-md bg-orange-600 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
        >
          Back to Approval
        </button>
      </div>
    </div>
  );
};

export default ApprovalReceipt;
