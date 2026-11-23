import ReusableButton from "../shared/components/ReusableButton";
import type { POSSession } from "../types/posSessionTypes";
import { useState, type ReactNode } from "react";

interface ExitSessionModalProps {
  session: POSSession
  loadEndSession: (
    onBack: () => void
  ) => ReactNode;
  onPauseSession: () => void;
  onCancel: () => void;
}

export const ExitSessionModal = ({
  session,
  loadEndSession,
  onPauseSession,
  onCancel,
}: ExitSessionModalProps) => {

  const [closeSelected, setCloseSelected] = useState<boolean>(false);

  return (
    <>
      {
        closeSelected == true ?
          loadEndSession(
            () => { setCloseSelected(false); }
          )
          : <div className="">
            {/* Description */}

            <p className="text-sm text-gray-500">
              Your POS session is currently active.
            </p>

            {/* Session details */}
            <div className="mt-2 space-y-3 rounded-xl bg-gray-50 ">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Session Started</h3>
                <p className="mt-1 font-semibold text-gray-800">
                  {
                    new Date(
                      session!.startTime
                    ).toLocaleTimeString()
                    || "Start time unavailable"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Staff</h3>
                <p className="mt-1 font-semibold text-gray-800">{session?.staffName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Terminal</h3>
                <p className="mt-1 font-semibold text-gray-800">{session?.terminal}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 font-semibold text-gray-800">{session?.date}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <ReusableButton
                title="Cancel"
                onClick={onCancel}
                variant="primary"
              />

              <ReusableButton
                title="Pause Session"
                onClick={onPauseSession}
                variant="secondary"
              />

              <ReusableButton
                title="End Session"
                onClick={() => setCloseSelected(true)}
                variant="danger"
              />
            </div>
          </div>
      }

    </>

  );
};

export default ExitSessionModal;
