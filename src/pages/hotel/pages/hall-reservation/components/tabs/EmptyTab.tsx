import type { FileText } from "lucide-react";

export default function EmptyTab({
    icon: Icon,
    title,
    description,
}: {
    icon: typeof FileText;
    title: string;
    description: string;
}) {
    return (
        <div className="flex min-h-48 flex-col items-center justify-center px-5 py-2 text-center">
            <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                <Icon size={22} />
            </div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="mt-1 max-w-md text-slate-500">{description}</p>
        </div>
    );
}