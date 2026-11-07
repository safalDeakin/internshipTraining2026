
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
    title: string;
    subtitle: string;
    close: () => void;
    children: ReactNode;
}

export default function ModalShell({
    title,
    subtitle,
    close,
    children,
}: Props) {
    return (
        <div
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
            role="dialog"
        >
            <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-xl sm:rounded-2xl">
                <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
                    </div>

                    <button
                        aria-label="Close dialog"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        onClick={close}
                        type="button"
                    >
                        <X size={19} aria-hidden="true" />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
