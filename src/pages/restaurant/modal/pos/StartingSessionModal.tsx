// author: shrajja

import { useState } from "react";
import ReusableButton from "../../pages/posuserSession/shared/components/reuse/ReusableButton";

interface StartingSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  onCancel: () => void;
  onConfirm: (data: { openingCash: number; notes: string }) => void;
}

const StartingSessionModal = ({
  staffName,
  terminal,
  date,
  onCancel,
  onConfirm,
}: StartingSessionModalProps) => {
  const [openingCash, setOpeningCash] = useState("7000");
  const [notes, setNotes] = useState("hhhhhhhhhhhhhhhhhhhhhhhhhhhh");

  const cash = Number(openingCash);

  //prevent empty input
  const isValidCash =
    openingCash.trim() !== "" && Number.isFinite(cash) && cash >= 0;
  //executes when confirm button clicked
  const handleConfirm = () => {
    if (!isValidCash) return;
    //Send data to the parent
    onConfirm({
      openingCash: cash,
      notes: notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-white p-6 shadow-2xl">
        {/* Title */}
        <h1 className="text-center text-lg font-semibold text-gray-800">
          Starting Session
        </h1>

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

        {/* Opening Cash */}
        <div className="mt-5">
          <label
            htmlFor="openingCash"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Opening Cash
          </label>

          <input
            id="openingCash"
            type="number"
            min="0"
            step="any"
            value={openingCash}
            onChange={(e) => setOpeningCash(e.target.value)}
            placeholder="Enter opening cash amount"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label
            htmlFor="sessionNotes"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Notes <span className="font-normal text-gray-400">(Optional)</span>
          </label>

          <textarea
            id="sessionNotes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes (optional)"
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between gap-3">
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

export default StartingSessionModal;
