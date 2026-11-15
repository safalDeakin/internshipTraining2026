import { useEffect } from "react";
import { BillingTable } from "./BillingTable";
import { DetailItem } from "./DetailItem";
import type { GuestRequest } from "../../../../../domain/GuestRequest";

export function PostToFolioModal({
    request,
    onClose,
    onPost,
}: {
    request: GuestRequest;
    onClose: () => void;
    onPost: () => void;
}) {
    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3"
            role="dialog"
            aria-modal="true"
            aria-labelledby="folio-title"
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <section className="w-full max-w-155 border">
                <div className="bg-white p-3 sm:p-4">
                    <dl className="mb-2">
                        <DetailItem label="Room No" value={request.room} strong />
                        <DetailItem label="Reservation No" value={request.reservation} />
                    </dl>
                    <h3 className="mb-1 text-[11px] font-bold">Billing</h3>
                    <BillingTable items={request.billItems} compact />
                    <div className="mt-5 flex justify-center gap-3">
                        <button
                            onClick={onClose}
                            className="border border-slate-400 bg-slate-100 px-3 py-1 text-[10px] shadow-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onPost}
                            className="bg-indigo-500 px-5 py-1 text-[10px] text-white shadow-sm hover:bg-indigo-600"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
