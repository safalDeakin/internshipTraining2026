
import { Download } from "lucide-react";

interface PackageStat {
    label: string;
    value: string | number;
}

interface PackageStatsProps {
    stats: PackageStat[];
}

export default function PackageStats({
    stats,
}: PackageStatsProps) {
    return (
        <section className="border-b border-[#dededb] px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {stats.map((stat) => (
                    <div
                        className="flex min-h-14 items-center gap-2.5 rounded-sm border border-[#d9d9d5] px-3 py-2"
                        key={stat.label}
                    >
                        <Download
                            aria-hidden="true"
                            className="size-3.5 shrink-0 text-[#73736f]"
                            strokeWidth={1.4}
                        />
                        <div className="min-w-0">
                            <p className="truncate text-[14px] text-[#777773]">
                                {stat.label}
                            </p>
                            <p className="mt-0.5 truncate text-[14px] font-medium">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
