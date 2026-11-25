import type { ReactNode } from "react";

export function DataTable({
    headings,
    children,
    minWidth = "min-w-[620px]",
}: {
    headings: string[];
    children: ReactNode;
    minWidth?: string;
}) {
    return (
        <div className="overflow-x-auto rounded-sm border border-slate-300">
            <table className={`w-full border-collapse text-left ${minWidth}`}>
                <thead className="bg-slate-50 text-slate-500">
                    <tr>
                        {headings.map((heading) => (
                            <th className="px-3 py-2 font-medium" key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">{children}</tbody>
            </table>
        </div>
    );
}
