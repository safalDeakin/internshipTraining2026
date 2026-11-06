import { Loader } from "lucide-react";

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <>
      <div className="absolute inset-0 z-40 rounded-lg bg-white/30 backdrop-blur-[3px]" />
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3">
        <Loader className="h-10 w-10 animate-spin text-gray-700" />
        <p className="text-sm font-semibold text-gray-800">{message}</p>
      </div>
    </>
  );
};

export default LoadingOverlay;
