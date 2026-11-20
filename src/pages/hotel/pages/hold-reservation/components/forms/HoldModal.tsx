import { AlertTriangle } from "lucide-react";
import { useState } from "react";

type FormState = {
    guestName: string;
    contact: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    holdExpiry: string;
    holdReason: string;
    remark: string;
};

const emptyForm: FormState = {
    guestName: "",
    contact: "",
    roomType: "",
    checkInDate: "2083-01-02",
    checkOutDate: "2083-01-02",
    holdExpiry: "2083-01-02",
    holdReason: "",
    remark: "",
};

function Field({
    label,
    className = "",
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={`grid gap-1.5 ${className}`}>
            <span className="font-medium text-slate-700">{label}</span>
            {children}
        </label>
    );
}

export function HoldModal() {

    const [form, setForm] = useState(emptyForm);


    const update = (key: keyof FormState, value: string) =>
        setForm((current) => ({ ...current, [key]: value }));

    const submit = () => {
        console.log("Form Submitted")
    };

    const inputClass =
        "h-10 w-full rounded-md border border-slate-300 bg-white px-3 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

    return (
        <div className="w-full">

            <form onSubmit={submit} className="m-1 mt-0 bg-white px-5 py-5 sm:px-9 sm:py-7">
                <fieldset>
                    <legend className="mb-4 text-xl font-bold text-slate-900">Guest Information</legend>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-16">
                        <Field label="Guest Name">
                            <input
                                required
                                value={form.guestName}
                                onChange={(e) => update("guestName", e.target.value)}
                                placeholder="First Name"
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Contact No.">
                            <input
                                required
                                value={form.contact}
                                onChange={(e) => update("contact", e.target.value)}
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </fieldset>

                <fieldset className="mt-6">
                    <legend className="mb-4 text-xl font-bold text-slate-900">Reservation Detail</legend>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_.65fr_.65fr] sm:gap-x-10">
                        <Field label="Room Type">
                            <select
                                required
                                value={form.roomType}
                                onChange={(e) => update("roomType", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Select Room</option>
                                <option>Deluxe Room</option>
                                <option>Executive Room</option>
                                <option>Family Suite</option>
                            </select>
                        </Field>
                        <Field label="Check In Date">
                            <input
                                type="date"
                                required
                                value={form.checkInDate}
                                onChange={(e) => update("checkInDate", e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Check Out Date">
                            <input
                                type="date"
                                required
                                value={form.checkOutDate}
                                onChange={(e) => update("checkOutDate", e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </fieldset>

                <fieldset className="mt-6">
                    <legend className="mb-4 text-xl font-bold text-slate-900">Hold Setting</legend>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[.7fr_1.35fr_1fr] sm:gap-x-10">
                        <Field label="Hold Expiry Date">
                            <input
                                type="date"
                                required
                                value={form.holdExpiry}
                                onChange={(e) => update("holdExpiry", e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Hold Reason">
                            <input
                                required
                                value={form.holdReason}
                                onChange={(e) => update("holdReason", e.target.value)}
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>
                        <span className="hidden lg:block" />
                        <Field
                            label="Remark (Optional)"
                            className="sm:col-span-2 lg:col-span-1 lg:col-start-1"
                        >
                            <input
                                value={form.remark}
                                onChange={(e) => update("remark", e.target.value)}
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </fieldset>

                <div className="mt-7 flex items-start gap-2 rounded-md bg-[#efefff] px-3 py-2.5 text-indigo-500">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0 fill-slate-800 text-slate-800" />
                    <p>
                        This Room will be marked as on hold &amp; will be released automatically after the
                        hold date expiry date.
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        type="submit"
                        className="min-w-52 rounded-md bg-orange-500 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
                    >
                        Create Hold
                    </button>
                </div>
            </form>
        </div >
    );
}
