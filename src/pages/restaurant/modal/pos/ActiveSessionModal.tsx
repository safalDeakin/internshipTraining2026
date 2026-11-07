import { X } from "lucide-react";

import ReusableButton from "../../pages/posuserSession/shared/components/reuse/ReusableButton";

interface ActiveSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  activeSessionStartTime?: string;
  onClose: () => void;
  onEndSession: () => void;
  onPause: () => void;
  onContinue: () => void;
}

const ActiveSessionModal = ({
  staffName,
  terminal,
  date,
  activeSessionStartTime,
  onClose,
  onEndSession,
  onPause,
  onContinue,
}: ActiveSessionModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close active session modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Active Session</h2>

          <p className="mt-1 text-sm text-gray-500">
            Your POS session is currently active.
          </p>
        </div>

        {/* Session details */}
        <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Session Started
            </h3>
            <p className="mt-1 font-semibold text-gray-800">
              {activeSessionStartTime || "Start time unavailable"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Staff</h3>
            <p className="mt-1 font-semibold text-gray-800">{staffName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Terminal</h3>
            <p className="mt-1 font-semibold text-gray-800">{terminal}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="mt-1 font-semibold text-gray-800">{date}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <ReusableButton
            title="Continue"
            onClick={onContinue}
            variant="primary"
          />

          <ReusableButton
            title="Pause Session"
            onClick={onPause}
            variant="secondary"
          />

          <ReusableButton
            title="End Session"
            onClick={onEndSession}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveSessionModal;
