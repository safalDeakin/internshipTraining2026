import { X } from "lucide-react";
import type { POSSessionMode } from "../../../types/POSUserSession";

interface SessionModeModalProps {
  onClose: () => void;
  onSelect?: (mode: POSSessionMode) => void;
  onEndSession?: () => void;
  onPause?: () => void;
  isSessionActive?: boolean;
  staffName: string;
  terminal: string;
  date: string;
  activeSessionStartTime?: string;
}

interface ButtonModeProps {
  title: string;
  onClick?: () => void;
}

export const ButtonMode = ({ title, onClick }: ButtonModeProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-amber-50 bg-orange-500 px-2 py-2 text-white shadow-md hover:bg-orange-600"
    >
      <p className="p-2 text-sm">{title}</p>
    </button>
  );
};

const sessionModes: {
  label: string;
  value: POSSessionMode;
}[] = [
  { label: "Session Mode (Standard)", value: "Standard" },
  { label: "Over The Air", value: "Over The Air" },
  { label: "Manager Mode", value: "Manager Mode" },
  {
    label: "Service and Technical Check",
    value: "Service and Technical Check",
  },
];

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
  const handleSessionMode = (mode: POSSessionMode) => {
    onSelect?.(mode);
  };

  return (
    <div
      className="relative mb-2 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-mode-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        aria-label="Close session mode"
      >
        <X className="h-5 w-5" />
      </button>

      <h1 id="session-mode-title" className="text-center font-bold">
        Select Shell Mode
      </h1>

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
        <h2 className="text-md">Choose:</h2>

        <div className="mt-4 flex flex-col gap-3 px-2">
          {isSessionActive ? (
            <>
              <ButtonMode title="End Session" onClick={onEndSession} />
              {/* Pause now has its own handler (previously it called onEndSession) */}
              <ButtonMode title="Pause" onClick={onPause} />
            </>
          ) : (
            sessionModes.map((mode) => (
              <ButtonMode
                key={mode.value}
                title={mode.label}
                onClick={() => handleSessionMode(mode.value)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionModeModal;
