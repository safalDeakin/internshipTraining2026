
import { ArrowLeft, CircleUserRound } from "lucide-react";

interface PackageHeaderProps {
    packageName: string;
}

export default function PackageHeader({
    packageName,
}: PackageHeaderProps) {
    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-[#d7d7d4] px-4 sm:px-6">
                <div>
                    <p className="text-[16px] font-medium tracking-[0.12em] text-[#898985] uppercase">
                        Hotel management
                    </p>
                    <h2 className="mt-0.5 text-lg font-semibold tracking-[-0.02em]">
                        Vintage Yard Hotel
                    </h2>
                </div>

                <div className="flex items-center gap-2.5">
                    <CircleUserRound
                        aria-hidden="true"
                        className="size-8 text-[#8d8d88]"
                        strokeWidth={1.25}
                    />
                    <div className="hidden text-right sm:block">
                        <p className="text-[14px] font-medium">
                            Utsha Shrestha
                        </p>
                        <button
                            className="text-[14px] text-[#777773] underline-offset-2 hover:underline"
                            type="button"
                        >
                            View detail
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex h-11 items-center gap-2 border-b border-[#dededb] px-4 sm:px-6">
                <ArrowLeft
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.5}
                />
                <p className="truncate text-xs font-medium">
                    {packageName}
                </p>
            </div>
        </>
    );
}
