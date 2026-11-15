import { useEffect } from "react";

type DummyModalProps = {
    onClose: () => void;
};

export default function DummyModal({ onClose }: DummyModalProps) {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-sm border border-slate-300 bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                    <h2 className="text-sm font-semibold text-slate-700">
                        Dummy Modal
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-lg text-slate-400 hover:text-slate-700"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-sm text-slate-600">
                        This is a dummy modal.
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                        The modal opened successfully from the Sidebar header button.
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-slate-200 px-4 py-3">
                    <button
                        onClick={onClose}
                        className="border border-slate-400 bg-slate-100 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
