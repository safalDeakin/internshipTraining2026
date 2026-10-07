import { Check } from "lucide-react";

export default function VerifiedStatus() {
    return (
        <span className="inline-flex items-center gap-1 text-[10px] italic text-[#555]">
            Verified

            <Check
                aria-hidden="true"
                className="text-[#20b777]"
                size={12}
                strokeWidth={2}
            />
        </span>
    );
}