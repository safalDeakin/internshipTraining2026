// author: shrjja
import { X } from "lucide-react";

interface SessionModeModalProps {
  onClose: () => void;
  onSelect?: () => void;
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
      className="bg-orange-500 shadow-md border border-amber-50 text-white w-full h-auto px-2 py-2 rounded-lg "
    >
      <p className="text-sm p-2">{title}</p>
    </button>
  );
};
const SessionModeModal = ({ onClose, onSelect }: SessionModeModalProps) => {
  const handleSessionMode = () => {
    onSelect?.();
  };
  return (
    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl mb-2">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        aria-label="Close session mode"
      >
        <X className="h-5 w-5" />
      </button>
      <h1 className="font-bold text-center">Select Shell Mode</h1>
      <div className="flex flex-col gap-1">
        <div className="">
          <h2 className="text-md">Staff</h2>
          <p className="text-sm text-gray-400">john</p>
        </div>
        <div className="">
          <h2 className="text-md">Terminal</h2>
          <p className="text-sm text-gray-400">Main Counter</p>
        </div>
        <div className="">
          <h2 className="text-md">Date</h2>
          <p className="text-sm text-gray-400">2083/1/03</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-md">Choose: </h2>
        <div className="px-2 mt-4 flex flex-col gap-3">
          <ButtonMode
            title="Session Mode (Standard)"
            onClick={handleSessionMode}
          />
          <ButtonMode title="Over The Air" />
          <ButtonMode title="Manager Mode" />
          <ButtonMode title="Service and Technical check" />
          <ButtonMode title="Review Only" />
        </div>
      </div>
    </div>
  );
};

export default SessionModeModal;
