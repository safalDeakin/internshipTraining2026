import {
    Building2,
    Download,
    Pencil,
    Printer,
    Trash2,
} from "lucide-react";

import type { Building } from "../../../../../domain/dayActivity";

type HeaderProps = {
    building: Building;
};

function ActionButton({
    children,
    variant = "default",
    onClick,
}: {
    children: React.ReactNode;
    variant?: "default" | "primary" | "danger";
    onClick?: () => void;
}) {
    const variantClass = {
        default: "border-[#e3e6e8] bg-white text-[#4f5961] hover:bg-[#f7f8f9]",
        primary: "border-[#3f75a8] bg-[#527fae] text-white hover:bg-[#456f9a]",
        danger: "border-[#c85b62] bg-[#d9686f] text-white hover:bg-[#c85b62]",
    }[variant];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex h-7 items-center gap-1.5 whitespace-nowrap border px-2.5 text-[10px] shadow-[0_1px_1px_rgba(0,0,0,.03)] transition-colors sm:text-[11px] ${variantClass}`}
        >
            {children}
        </button>
    );
}

export function Header({ building }: HeaderProps) {
    return (
        <header className="border-b border-[#e7e9eb] bg-white px-3 py-2.5 sm:px-4">
            <div className="flex justify-between">
                <div className="order-3 flex w-full min-w-0 items-center gap-2 text-[12px] text-[#33434d] sm:order-0 sm:w-auto">
                    <Building2
                        size={14}
                        className="shrink-0 text-[#506774]"
                    />

                    <span className="truncate">
                        {building.name}
                    </span>
                </div>

                <div className="ml-auto flex max-w-full gap-1.5 overflow-x-auto sm:ml-auto">
                    <ActionButton>
                        <Download size={12} /> Export CSV
                    </ActionButton>

                    <ActionButton onClick={() => window.print()}>
                        <Printer size={12} /> Print as PDF
                    </ActionButton>

                    <ActionButton variant="primary">
                        <Pencil size={11} /> Edit
                    </ActionButton>

                    <ActionButton variant="danger">
                        <Trash2 size={11} /> Delete
                    </ActionButton>
                </div>
            </div>
        </header>
    );
}