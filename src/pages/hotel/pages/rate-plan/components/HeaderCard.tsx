
export default function HeaderCard() {
    const details = [
        ["Room types", "Deluxe, Standard, Executive & Suite"],
        ["Plan code", "RP#121121"],
        ["Rate plan type", "Public"],
        ["Recognition", "Best available rate"],
        ["Currency", "NPR"],
        ["Status", "Active"],
    ];

    return (
        <header className="border-b border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-5 sm:py-6">
            <h1 className="text-[clamp(1.1rem,3vw,1.4rem)] font-medium text-slate-900">
                Room Rate Plan
            </h1>

            <dl className="mt-5 grid max-w-xl grid-cols-[minmax(90px,130px)_1fr] gap-x-5 gap-y-1 text-[clamp(0.62rem,1.25vw,0.72rem)]">
                {details.map(([label, value]) => (
                    <div className="contents" key={label}>
                        <dt className="text-slate-400">{label}</dt>
                        <dd className="font-medium text-slate-700">{value}</dd>
                    </div>
                ))}
            </dl>
        </header>
    );
}
