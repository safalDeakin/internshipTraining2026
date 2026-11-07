import { ChevronDown } from "lucide-react"

type SelectFieldProps = {
    label: string
    value: string
    options: string[]
    onChange: (value: string) => void
}

export function SelectField({
    label,
    value,
    options,
    onChange,
}: SelectFieldProps) {
    return (
        <label className="block min-w-0">
            <span className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </span>
            <span className="relative block">
                <select
                    className="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                />
            </span>
        </label>
    )
}
