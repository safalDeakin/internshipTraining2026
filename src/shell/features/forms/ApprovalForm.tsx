import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import type { ApprovalCard } from "../types/ApprovalTypes";

interface ApprovalFormProps {
  approval: ApprovalCard;
  onAccept: (remark: string) => void;
  onDecline: (remark: string) => void;
}

const ApprovalForm = ({ approval, onAccept, onDecline }: ApprovalFormProps) => {
  const [remark, setRemark] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const initials = approval.requestedBy
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleAccept = () => {
    onAccept(remark);
    setIsApproved(true);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {/* Success Message */}
      {isApproved && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />

          <div>
            <p className="text-sm font-semibold text-green-700">
              Approval Successful!
            </p>
            <p className="text-xs text-green-600">
              The request has been approved successfully.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <h3 className="mb-4 text-base font-semibold text-gray-800">Approval</h3>

      {/* Requester */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm text-white">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800">
            {approval.requestType}
          </p>
          <p className="text-xs text-gray-400">
            Request no: {approval.requestNo}
          </p>
        </div>
      </div>

      {/* Requested Information */}
      <div className="space-y-3 border-b border-gray-200 pb-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Requested Information
        </h4>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Requested By</span>
          <span>{approval.requestedBy}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Request Type</span>
          <span>{approval.requestType}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Waiting Time</span>
          <span>{approval.requestedAgo}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Status</span>
          <span
            className={
              approval.status === "Overdue" ? "text-red-500" : "text-cyan-600"
            }
          >
            {approval.status}
          </span>
        </div>
      </div>

      {/* Transaction Information */}
      <div className="space-y-3 border-b border-gray-200 py-4">
        <h4 className="text-sm font-semibold text-gray-800">
          Transaction Information
        </h4>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Invoice No</span>
          <span>{approval.requestNo}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Customer Name</span>
          <span>{approval.customerName ?? "-"}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Original Amount</span>
          <span>Rs. {approval.originalAmount ?? approval.amount}</span>
        </div>

        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Payment Method</span>
          <span>{approval.paymentMethod ?? "-"}</span>
        </div>
      </div>

      {/* Request Detail */}
      <div className="border-b border-gray-200 py-4">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">
          Request Detail
        </h4>

        <p className="text-sm text-gray-600">
          Reason: {approval.reason ?? "No reason provided"}
        </p>

        {approval.note && (
          <p className="mt-2 text-sm text-gray-600">Note: {approval.note}</p>
        )}
      </div>

      {/* Remark */}
      <div className="py-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Remark
        </label>

        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter remark"
          disabled={isApproved}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-cyan-600 disabled:bg-gray-100"
        />
      </div>

      {/* Actions */}
      {!isApproved && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleAccept}
            className="w-full rounded-md bg-orange-600 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
          >
            Accept
          </button>

          <button
            type="button"
            onClick={() => onDecline(remark)}
            className="w-full rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default ApprovalForm;
