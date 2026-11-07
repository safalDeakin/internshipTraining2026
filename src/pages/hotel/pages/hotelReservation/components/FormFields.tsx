import type { ReactNode } from 'react'

export function Field({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
}: {
    label: string
    placeholder?: string
    type?: string
    value: string
    onChange: (value: string) => void
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
            <input
                className="form-control"
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
            />
        </label>
    )
}

export function FormShell({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
            <div className="mb-7">
                <p className="text-xl font-bold sm:text-2xl">{title}</p>
            </div>
            {children}
        </section>
    )
}

export function FormActions({ onBack, onNext, nextLabel }: { onBack: () => void; onNext: () => void; nextLabel: string }) {
    return (
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button className="secondary-button" onClick={onBack}>Back</button>
            <button className="primary-button" onClick={onNext}>{nextLabel}</button>
        </div>
    )
}
