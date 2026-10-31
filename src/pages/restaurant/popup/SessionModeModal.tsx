import { X } from "lucide-react";
import type {
  POSSessionMode,
  SessionModeModalProps,
} from "../pages/posuserSession/types/posSessionTypes";
import { sessionModes } from "../pages/posuserSession/constants/posSessionAlldata";
import ReusableButton from "../pages/posuserSession/shared/components/reuse/ReusableButton";

const SessionModeModal = ({
  onClose,
  onSelect,
  onEndSession,
  onPause,
  isSessionActive = false,
  staffName,
  terminal,
  date,
  activeSessionStartTime,
}: SessionModeModalProps) => {
  return (
    <div className="relative mb-2 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
      >
        <X size={20} />
      </button>

      <h1 className="text-center font-bold">Select Shell Mode</h1>

      <div className="mt-5 flex flex-col gap-3">
        {isSessionActive && (
          <div>
            <h2 className="font-semibold">Active Session</h2>
            <p className="text-sm text-gray-400">
              {activeSessionStartTime ?? "Start time unavailable"}
            </p>
          </div>
        )}

        <div>
          <h2 className="font-semibold">Staff</h2>
          <p className="text-sm text-gray-400">{staffName}</p>
        </div>

        <div>
          <h2 className="font-semibold">Terminal</h2>
          <p className="text-sm text-gray-400">{terminal}</p>
        </div>

        <div>
          <h2 className="font-semibold">Date</h2>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>

      <div className="mt-5">
        <h2>Choose:</h2>

        <div className="mt-4 flex flex-col gap-3 px-2">
          {isSessionActive ? (
            <>
              <ReusableButton
                title="End Session"
                onClick={onEndSession}
                variant="danger"
              />
              <ReusableButton
                title="Pause"
                onClick={onPause}
                variant="secondary"
              />
            </>
          ) : (
            sessionModes.map((mode) => (
              <ReusableButton
                key={mode.value}
                title={mode.label}
                onClick={() => onSelect?.(mode.value as POSSessionMode)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionModeModal;
