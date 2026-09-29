interface LayoutPreviewProps {
    dark?: boolean;
    orientation?:
    | "top-nav"
    | "side-nav"
    | "left"
    | "right"
    | "default";
}

export default function LayoutPreview({
    dark = false,
    orientation = "default",
}: LayoutPreviewProps) {
    const outerBg = dark ? "bg-[#808080]" : "bg-white";
    const navBg = dark
        ? "bg-[#808080]"
        : "bg-[#eeeeee]";

    const sectionBg = dark
        ? "bg-[#808080]"
        : "bg-[#f0f1f2]";

    const borderColor = dark
        ? "border-[#666666]"
        : "border-[#d9d9d9]";

    const borderSeperator = dark
        ? "bg-[#666666]"
        : "bg-[#d9d9d9]";

    if (orientation === "top-nav") {
        return (
            <div
                className={`flex h-32.5 w-full flex-col overflow-hidden border ${borderColor} bg-white`}
            >
                {/* Nav */}
                <div
                    className={`flex h-5 shrink-0 items-center justify-center text-[9px] font-medium ${navBg}`}
                >
                    Nav
                </div>

                {/* separator */}
                <div className="h-0.75 shrink-0 bg-white" />

                <div
                    className={`flex h-28 w-full overflow-hidden`}
                >
                    <div
                        className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        1
                    </div>

                    {/* separator */}
                    <div className="w-0.75 shrink-0 bg-white" />

                    <div
                        className={`flex w-[30%] items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        2
                    </div>
                </div>
            </div>
        );
    }

    if (orientation === "side-nav") {
        return (
            <div
                className={`flex h-32.5 w-full overflow-hidden border ${borderColor} bg-white`}
            >
                {/* Nav */}
                <div
                    className={`flex w-7.5 shrink-0 items-center justify-center text-[8px] font-medium ${navBg}`}
                >
                    Nav
                </div>

                {/* separator */}
                <div className="w-0.75 shrink-0 bg-white" />

                {/* Sections */}
                <div className={`flex flex-1 ${outerBg}`}>
                    <div
                        className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        1
                    </div>

                    {/* separator */}
                    <div className="w-0.75 shrink-0 bg-white" />

                    <div
                        className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        2
                    </div>
                </div>
            </div>
        );
    }

    if (orientation === "left") {
        return (

            <div
                className={`flex h-32.5 w-full flex-col overflow-hidden border ${borderColor} bg-white`}
            >
                {/* Nav */}
                <div
                    className={`flex h-5 shrink-0 items-center justify-center text-[9px] font-medium ${navBg}`}
                >
                    Nav
                </div>

                {/* separator */}
                <div className="h-0.75 shrink-0 bg-white" />

                <div
                    className={`flex h-28 w-full overflow-hidden `}
                >
                    <div
                        className={`flex w-[30%] items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        1
                    </div>

                    {/* separator */}
                    <div className="w-0.75 shrink-0 bg-white" />

                    <div
                        className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        2
                    </div>
                </div>
            </div>
        );
    }

    if (orientation === "right") {
        return (

            <div
                className={`flex h-32.5 w-full flex-col overflow-hidden border ${borderColor} bg-white`}
            >
                {/* Nav */}
                <div
                    className={`flex h-5 shrink-0 items-center justify-center text-[9px] font-medium ${navBg}`}
                >
                    Nav
                </div>

                {/* separator */}
                <div className="h-0.75 shrink-0 bg-white" />

                <div
                    className={`flex h-28 w-full overflow-hidden`}
                >
                    <div
                        className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        1
                    </div>

                    {/* separator */}
                    <div className="w-0.75 shrink-0 bg-white" />

                    <div
                        className={`flex w-[30%] items-center justify-center text-[10px] ${sectionBg}`}
                    >
                        2
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex h-28 w-full flex-col overflow-hidden border ${borderColor} bg-white`}
        >
            {/* Nav */}
            <div
                className={`flex h-5 shrink-0 items-center justify-center text-[9px] font-medium ${navBg}`}
            >
                Nav
            </div>

            {/* separator */}
            <div className={`h-0.75 shrink-0 ${borderSeperator}`} />

            {/* Sections */}
            <div className={`flex flex-1 ${outerBg}`}>
                <div
                    className={`flex w-[30%] items-center justify-center text-[10px] ${sectionBg}`}
                >
                    1
                </div>

                {/* separator */}
                <div className={`w-0.75 shrink-0 ${borderSeperator}`} />

                <div
                    className={`flex flex-1 items-center justify-center text-[10px] ${sectionBg}`}
                >
                    2
                </div>
            </div>
        </div>
    );
}