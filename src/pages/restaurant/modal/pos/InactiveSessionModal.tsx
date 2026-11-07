import { useState } from "react";
import { X } from "lucide-react";

import { sessionModes } from "../../pages/posuserSession/constants/posSessionAlldata";
import ReusableButton from "../../pages/posuserSession/shared/components/reuse/ReusableButton";

import type { POSSessionMode } from "../../pages/posuserSession/types/posSessionTypes";

import StartingSessionModal from "./StartingSessionModal";

interface InactiveSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  onClose: () => void;
  onSelect: (
    mode: POSSessionMode,
    data: { openingCash: number; notes: string },
  ) => void;
}

const InactiveSessionModal = ({
  staffName,
  terminal,
  date,
  onClose,
  onSelect,
}: InactiveSessionModalProps) => {
  const [pickedMode, setPickedMode] = useState<POSSessionMode | null>(null);

  // Step 2: Opening cash form
  if (pickedMode) {
    return (
      <StartingSessionModal
        staffName={staffName}
        terminal={terminal}
        date={date}
        onCancel={() => setPickedMode(null)}
        onConfirm={(data) => onSelect(pickedMode, data)}
      />
    );
  }

  // Step 1: Session mode selection
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h1 className="text-center text-lg font-bold text-gray-900">
          Select Session Mode
        </h1>

        <div className="mt-5 space-y-4">
          <div>
            <h2 className="font-semibold text-gray-800">Staff</h2>
            <p className="text-sm text-gray-500">{staffName}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">Terminal</h2>
            <p className="text-sm text-gray-500">{terminal}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">Date</h2>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="font-semibold text-gray-800">Choose Session Mode</h2>

          <div className="mt-4 flex flex-col gap-3 px-2">
            {sessionModes.map((mode) => (
              <ReusableButton
                key={mode.value}
                title={mode.label}
                onClick={() => setPickedMode(mode.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveSessionModal;
