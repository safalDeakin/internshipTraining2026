// author: shrajja

import { useState } from "react";

import ReusableButton from "../../pages/posuserSession/shared/components/reuse/ReusableButton";

interface ClosingSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  onCancel: () => void;
  onConfirm: (data: { closingCash: number; notes: string }) => void;
}

const ClosingSessionModal = ({
  staffName,
  terminal,
  date,
  onCancel,
  onConfirm,
}: ClosingSessionModalProps) => {
  const [closingCash, setClosingCash] = useState("");
  const [notes, setNotes] = useState("");

  const cash = Number(closingCash);

  const isValidCash =
    closingCash.trim() !== "" && Number.isFinite(cash) && cash >= 0;

  const handleConfirm = () => {
    if (!isValidCash) return;

    onConfirm({
      closingCash: cash,
      notes: notes.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Title */}
        <h1 className="text-center text-lg font-semibold text-gray-800">
          Closing Session
        </h1>

        <p className="mt-1 text-center text-sm text-gray-500">
          Enter the closing cash amount to end this session.
        </p>

        {/* Session Information */}
        <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-4">
          <div>
            <h2 className="text-sm font-medium text-gray-700">Staff</h2>
            <p className="mt-1 text-sm text-gray-500">{staffName}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-700">Terminal</h2>
            <p className="mt-1 text-sm text-gray-500">{terminal}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-700">Date</h2>
            <p className="mt-1 text-sm text-gray-500">{date}</p>
          </div>
        </div>

        {/* Closing Cash */}
        <div className="mt-5">
          <label
            htmlFor="closingCash"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Cash (Rs.)
          </label>

          <input
            id="closingCash"
            type="number"
            min="0"
            step="any"
            value={closingCash}
            onChange={(event) => setClosingCash(event.target.value)}
            placeholder="Enter closing cash amount"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label
            htmlFor="closingNotes"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Notes <span className="font-normal text-gray-400">(Optional)</span>
          </label>

          <textarea
            id="closingNotes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Enter closing notes (optional)"
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <ReusableButton
            title="Cancel"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          />

          <ReusableButton
            title="Confirm"
            variant="primary"
            onClick={handleConfirm}
            disabled={!isValidCash}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ClosingSessionModal;
