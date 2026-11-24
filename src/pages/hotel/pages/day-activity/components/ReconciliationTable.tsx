import type { ReconciliationRow } from "../../../../../domain/dayActivity";

interface ReconciliationTableProps {
    title: string;
    rows: ReconciliationRow[];
    showDifference?: boolean;
}

export function ReconciliationTable({
    title,
    rows,
    showDifference = false,
}: ReconciliationTableProps) {
    return (
        <section>
            <h2 className="mb-1.5 px-1 text-[10px] font-semibold text-[#222b30]">{title}</h2>
            <div className="overflow-x-auto bg-white">
                <table className="w-full min-w-127.5 table-fixed border-collapse text-[9px]">
                    <thead>
                        <tr className="h-7 text-[#92999d]">
                            <th className="w-[34%] px-2 text-left font-normal">Particular</th>
                            <th className="w-[29%] px-2 text-center font-normal">Expected (NPR)</th>
                            <th className="w-[25%] px-2 text-center font-normal">Verified (NPR)</th>
                            {showDifference && (
                                <th className="w-[12%] px-2 text-center font-normal">Difference</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={row.id} className="h-8 border-y border-[#edf0f1]">
                                <td className="px-2 text-[#4c8ab7]">
                                    <span className="mr-1 text-[#6e7d85]">{index + 1}.</span>
                                    {row.name}
                                </td>
                                <td className="px-2 text-center text-[#424c51]">{row.expected}</td>
                                <td className="px-2 text-center">
                                    <input
                                        aria-label={`Verified amount for ${row.name}`}
                                        placeholder="Enter"
                                        inputMode="decimal"
                                        className="h-4.25 w-14.5 border border-[#dfe3e5] px-1 text-center text-[9px] text-[#4a555b] outline-none placeholder:text-[#b4b9bc] focus:border-[#6c9bc4]"
                                    />
                                </td>
                                {showDifference && (
                                    <td className="px-2 text-center text-[#777f84]">{row.difference}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
