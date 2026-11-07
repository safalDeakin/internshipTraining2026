import { useState, type FormEvent } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import type { Item } from "../../../domain/lostfound";
import { useRepoLostAndFoundHook } from "../context/LostAndFoundProvider";

import {
    Button,
    Field,
    FormSection,
    Header,
    IconInput,
    inputClass,
    SelectField,
} from "../components/shared";

interface RegisterPageProps {
    onCancel: () => void;
    onSave: () => void;
}

export function RegisterPage({
    onCancel,
    onSave,
}: RegisterPageProps) {
    const { data, create } = useRepoLostAndFoundHook();

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setSaving(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const numericIds = data
            .map((item) => Number(item.id))
            .filter((id) => Number.isFinite(id));

        const nextId = String(
            numericIds.length > 0
                ? Math.max(...numericIds) + 1
                : 1,
        );

        const item: Item = {
            id: nextId,
            name: String(formData.get("name") || "New item"),
            category: String(formData.get("category") || "Other"),
            location: String(formData.get("location") || "Lobby"),
            date: String(formData.get("date") || "2083/01/01"),
            reportedBy: String(formData.get("foundBy") || "Front Desk"),
            retention: String(formData.get("retention") || "2083/01/08"),
            description: String(formData.get("description") || ""),
            status: "In Storage",
        };

        try {
            const success = await create(item);

            if (success) {
                onSave();
            } else {
                setError(
                    "The item could not be saved. Please check the item ID and try again.",
                );
            }
        } catch (err) {
            console.error("Failed to save item:", err);

            setError("Unable to save the item. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Header onHome={onCancel} />

            <form
                onSubmit={submit}
                className="mx-auto my-8 w-full max-w-xl space-y-7 rounded-lg bg-white p-7 shadow-sm"
            >
                <FormSection title="Item Information">
                    <Field label="Item Name">
                        <input
                            name="name"
                            required
                            placeholder="Full Name"
                            className={inputClass}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Category">
                            <input
                                name="category"
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Brand">
                            <input
                                name="brand"
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <Field label="Color">
                        <input
                            name="color"
                            placeholder="Full Name"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Description">
                        <textarea
                            name="description"
                            placeholder="Enter"
                            className={`${inputClass} h-24 py-3`}
                        />
                    </Field>
                </FormSection>

                <FormSection title="Status & Storage">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Storage location">
                            <input
                                name="storageLocation"
                                placeholder="Full Name"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Retention Period">
                            <input
                                name="retention"
                                placeholder="Days"
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <Field label="Note">
                        <textarea
                            name="note"
                            placeholder="Additional Note"
                            className={`${inputClass} h-24 py-3`}
                        />
                    </Field>
                </FormSection>

                <FormSection title="Found Detail">
                    <SelectField label="Location" name="location">
                        <option value="">Select Location</option>
                        <option value="Lobby - Reception">
                            Lobby - Reception
                        </option>
                        <option value="Restaurant - Table 5">
                            Restaurant - Table 5
                        </option>
                    </SelectField>

                    <div className="grid grid-cols-2 gap-4">
                        <IconInput
                            label="Date Found"
                            name="date"
                            icon={<CalendarDays />}
                            placeholder="2083/01/01"
                        />

                        <IconInput
                            label="Time"
                            name="time"
                            icon={<Clock3 />}
                            placeholder="Time"
                        />

                        <Field label="Found By">
                            <input
                                name="foundBy"
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Department">
                            <input
                                name="department"
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </FormSection>

                <FormSection title="Internal Information">
                    <SelectField label="Reported To" name="reportedTo">
                        <option value="">Select Staff</option>
                        <option value="Front Desk">Front Desk</option>
                    </SelectField>

                    <div className="grid grid-cols-2 gap-4">
                        <IconInput
                            label="Reported Time"
                            name="reportedDate"
                            icon={<CalendarDays />}
                            placeholder="2083/01/01"
                        />

                        <IconInput
                            label="Time"
                            name="reportedTime"
                            icon={<Clock3 />}
                            placeholder="Time"
                        />
                    </div>

                    <Field label="Reference No">
                        <input
                            name="referenceNo"
                            placeholder="Enter"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Remark">
                        <input
                            name="remark"
                            placeholder="Enter"
                            className={inputClass}
                        />
                    </Field>
                </FormSection>

                {error && (
                    <p
                        role="alert"
                        className="text-sm text-red-600"
                    >
                        {error}
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button type="submit">
                        {saving ? "Saving..." : "Save Item"}
                    </Button>
                </div>
            </form>
        </main>
    );
}