import { FileText } from "lucide-react";

import VerifiedStatus from "./VerifiedStatus";

export default function Verifications() {
    return (
        <section className="mt-6.5">
            <h2 className="border-b border-[#e8e8e8] pb-2 text-[14px] font-medium text-[#111]">
                Verifications
            </h2>

            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-5 px-1.5 pt-3.5 text-[11px] text-[#333]">
                <span className="flex items-center gap-1">
                    Citizenship Certificate

                    <FileText
                        aria-hidden="true"
                        size={13}
                        strokeWidth={1.4}
                    />
                </span>

                <VerifiedStatus />

                <button
                    className="text-[#168cf4]"
                    type="button"
                >
                    Change Username ?
                </button>
            </div>
        </section>
    );
}