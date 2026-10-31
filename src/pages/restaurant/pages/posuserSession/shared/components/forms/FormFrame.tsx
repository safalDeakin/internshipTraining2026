import type { ReactNode } from "react";
import { X } from "lucide-react";

interface FormFrameProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const FormFrame = ({
  title,
  description,
  children,
  footer,
  onClose,
  className = "",
}: FormFrameProps) => {
  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {/* Form Header */}
      <div className="flex shrink-0 items-start justify-between px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>

          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Form Body */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {children}
      </div>

      {/* Form Footer */}
      {footer && (
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default FormFrame;
