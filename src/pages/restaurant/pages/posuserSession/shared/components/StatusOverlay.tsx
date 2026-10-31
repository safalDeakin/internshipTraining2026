import type { ReactNode } from "react";

interface StatusOverlayProps {
  show: boolean;
  icon: ReactNode;
  title: string;
}

const StatusOverlay = ({ show, icon, title }: StatusOverlayProps) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-gray-500/40 backdrop-blur-sm">
      <div className="flex min-h-[220px] w-[90%] max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-white/60 bg-white/95 px-8 py-8 text-center shadow-lg">
        {icon}

        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default StatusOverlay;
