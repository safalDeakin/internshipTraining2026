export function DetailItem({
    label,
    value,
    strong,
}: {
    label: string;
    value: string;
    strong?: boolean;
}) {
    return (
        <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 py-0.5 sm:grid-cols-[120px_minmax(0,1fr)]">
            <dt className="text-[clamp(10px,0.7vw,12px)] text-slate-600">{label}</dt>
            <dd className={`text-[clamp(10px,0.72vw,12px)] text-slate-800 ${strong ? "font-bold" : ""}`}>
                {value}
            </dd>
        </div>
    );
}
