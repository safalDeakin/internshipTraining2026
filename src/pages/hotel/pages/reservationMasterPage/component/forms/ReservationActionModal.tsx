
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ReservationActionModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export default function ReservationActionModal({
    title,
    onClose,
    children,
}: ReservationActionModalProps) {
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-2xl animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {title}
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
