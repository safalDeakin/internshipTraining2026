// author: shrajja

import { useState } from "react";

import { sessionModes } from "../constants/posSessionAlldata";
import ReusableButton from "../shared/components/ReusableButton";

import type { POSSessionMode } from "../types/posSessionTypes";
import StartSessionModal from "./StartSessionModal";

interface NewSessionModalProps {
  staffName: string;
  terminal: string;
  date: string;
  onClose: () => void;

  onSelect: (
    mode: POSSessionMode,
    data: {
      openingCash: number;
      notes: string;
    },
  ) => void;
}
//Lets staff select session mode	Passes selected mode and form data
export const NewSessionModal = ({
  staffName,
  terminal,
  date,
  onClose,
  onSelect,
}: NewSessionModalProps) => {
  const [pickedMode, setPickedMode] = useState<POSSessionMode | null>(null);
  // Step 1: Show session mode selection.
  return (
    <>
      {
        pickedMode ?
          <StartSessionModal
            staffName={staffName}
            terminal={terminal}
            date={date}
            onCancel={() => {
              //Check if it is rebuilding twice.
              setPickedMode(null)
            }}
            onConfirm={(data) => {
              onSelect(pickedMode, data);
            }} />
          :
          <div className="relative w-full rounded-2xl bg-white p-6 ">
            {/* Session details */}
            <div className="space-y-4">
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

            {/* Session mode selection */}
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
                <ReusableButton
                  className='CloseNewSessionPrompt'
                  key='close'
                  title='Close'
                  onClick={onClose}
                />
              </div>
            </div>
          </div>
      }
    </>

  );
};

export default NewSessionModal;
