import { CalendarDays, ChevronDown } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'

export const fieldClass =
    'h-[32px] w-full rounded-[7px] border border-[#aeb3b7] bg-white px-3 text-[10px] text-[#303437] outline-none placeholder:text-[#707579] focus:border-[#7188db]'

export function FormSection({
    title,
    children,
    divided = false,
}: {
    title: string
    children: ReactNode
    divided?: boolean
}) {
    return (
        <section className={divided ? 'border-t border-[#d5d5d5] pt-3' : ''}>
            <h3 className="mb-3 text-[12px] font-semibold text-[#16191b]">{title}</h3>
            {children}
        </section>
    )
}

export function FormGrid({ children }: { children: ReactNode }) {
    return <div className="grid gap-x-9 gap-y-3 sm:grid-cols-2">{children}</div>
}

export function FormField({
    label,
    required = false,
    children,
}: {
    label: string
    required?: boolean
    children: ReactNode
}) {
    return (
        <label className="block min-w-0">
            <span className="mb-1.5 block text-[10px] text-[#292d30]">
                {label} {required && <span className="ml-1 text-[#ef5a63]">*</span>}
            </span>
            {children}
        </label>
    )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={`${fieldClass} ${props.className ?? ''}`} />
}

export function SelectInput({
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <span className="relative block">
            <select
                {...props}
                className={`${fieldClass} appearance-none pr-8 ${props.className ?? ''}`}
            >
                {children}
            </select>
            <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#30363a]"
                size={13}
                strokeWidth={1.4}
            />
        </span>
    )
}

export function DateInput({
    placeholder = 'Select Date',
}: {
    placeholder?: string
}) {
    return (
        <span className="relative block">
            <TextInput placeholder={placeholder} className="pr-9" />
            <CalendarDays
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#22282b]"
                size={12}
            />
        </span>
    )
}

export function RadioGroup({ options }: { options: string[] }) {
    return (
        <div className="flex min-h-6.25 flex-wrap items-center gap-4">
            {options.map((option, index) => (
                <label key={option} className="flex items-center gap-1.5 text-[10px]">
                    <input
                        type="radio"
                        name={options.join('-')}
                        defaultChecked={index === 0}
                        className="h-2.5 w-2.5 accent-[#5774ed]"
                    />
                    {option}
                </label>
            ))}
        </div>
    )
}
