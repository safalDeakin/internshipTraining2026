import ReusableButton from "../shared/components/ReusableButton";

interface ActiveSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  activeSessionStartTime?: string;
  onEndSession: () => void;
  onPause: () => void;
  onContinue: () => void;
}

const ActiveSessionModal = ({
  staffName,
  terminal,
  date,
  activeSessionStartTime,
  onEndSession,
  onPause,
  onContinue,
}: ActiveSessionModalProps) => {
  return (
    <div className="">
      {/* Description */}

      <p className="text-sm text-gray-500">
        Your POS session is currently active.
      </p>

      {/* Session details */}
      <div className="mt-2 space-y-3 rounded-xl bg-gray-50 ">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Session Started</h3>
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
  );
};

export default ActiveSessionModal;
