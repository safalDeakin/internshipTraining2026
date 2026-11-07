import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export const photo =
    "https://images.unsplash.com/photo-1711917300722-8e73a4b8fc54?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=600";

export function Button({
    children,
    onClick,
    variant = "primary",
    type = "button",
}: {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "ghost" | "danger" | "orange";
    type?: "button" | "submit";
}) {
    const colors = {
        primary: "bg-[#4e78aa] text-white",
        ghost: "border border-slate-300 bg-white text-slate-700",
        danger: "bg-[#ec6b5f] text-white",
        orange: "bg-[#ff5a0a] text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium shadow-sm transition hover:opacity-90 ${colors[variant]}`}
        >
            {children}
        </button>
    );
}

export function Header({
    actions,
    onHome,
}: {
    actions?: ReactNode;
    onHome?: () => void;
}) {
    return (
        <header className="flex h-16 items-center justify-between px-6">
            <button
                type="button"
                onClick={onHome}
                className="text-lg font-semibold text-slate-900"
            >
                Lost &amp; Found
            </button>

            {actions}
        </header>
    );
}

export function Field({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <label className="grid gap-1.5 text-sm font-medium text-slate-800">
            {label}
            {children}
        </label>
    );
}

export const inputClass =
    "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

export const selectClass = `${inputClass} appearance-none`;

export function SelectField({
    label,
    name,
    children,
}: {
    label: string;
    name?: string;
    children: ReactNode;
}) {
    return (
        <Field label={label}>
            <span className="relative">
                <select
                    name={name}
                    className={selectClass}
                    defaultValue=""
                >
                    {children}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-500" />
            </span>
        </Field>
    );
}

export function FormSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="grid gap-4">
            <h2 className="border-b border-slate-100 pb-2 text-base font-semibold">
                {title}
            </h2>

            {children}
        </section>
    );
}

export function IconInput({
    label,
    icon,
    name,
    placeholder,
}: {
    label: string;
    icon: ReactNode;
    name?: string;
    placeholder: string;
}) {
    return (
        <Field label={label}>
            <span className="relative">
                <input
                    name={name}
                    placeholder={placeholder}
                    className={inputClass}
                />

                <span className="absolute right-3 top-2.5 [&>svg]:h-4 [&>svg]:w-4">
                    {icon}
                </span>
            </span>
        </Field>
    );
}

export function Info({
    rows,
}: {
    rows: string[][];
}) {
    return (
        <dl className="mt-3 grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
            {rows.map(([key, value]) => (
                <div key={key} className="contents">
                    <dt className="text-slate-500">{key}</dt>

                    <dd className="font-medium text-slate-800">
                        {value || "—"}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

export function Panel({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-semibold">{title}</h3>
            {children}
        </section>
    );
}