import { useState, type FormEvent } from "react";

import type { Item } from "../../../domain/lostfound";
import { useRepoLostAndFoundHook } from "../context/LostAndFoundProvider";

import {
    Button,
    Field,
    Header,
    Info,
    inputClass,
    SelectField,
} from "../components/shared";

interface ClaimPageProps {
    onBack: () => void;
    onCancel: () => void;
}

export function ClaimPage({
    onBack,
    onCancel,
}: ClaimPageProps) {
    const { selectedItem } = useRepoLostAndFoundHook();

    const [error, setError] = useState("");

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(
            "Claim submission is not connected to the repository yet.",
        );
    };

    if (!selectedItem) {
        return (
            <main className="min-h-screen bg-slate-50 p-6">
                <Button variant="ghost" onClick={onBack}>
                    Back to details
                </Button>

                <p className="mt-6 text-slate-600">
                    No item selected.
                </p>
            </main>
        );
    }

    const selected: Item = selectedItem;

    return (
        <main className="min-h-screen bg-slate-50">
            <Header onHome={onBack} />

            <form
                onSubmit={submit}
                className="mx-auto my-8 w-full max-w-2xl rounded-lg bg-white p-8 shadow-sm"
            >
                <h2 className="mb-4 text-lg font-semibold">
                    Item Information
                </h2>

                <div className="rounded-md border border-slate-100 p-4 shadow-md">
                    <Info
                        rows={[
                            [
                                "Lost & Found ID",
                                String(selected.id),
                            ],
                            ["Item Name", selected.name],
                            [
                                "Found Location",
                                selected.location,
                            ],
                            ["Found Date", selected.date],
                            [
                                "Storage Location",
                                "Shelf 23A",
                            ],
                        ]}
                    />
                </div>

                <div className="mt-10 grid gap-6">
                    <Field label="Claimed By">
                        <input
                            required
                            name="claimedBy"
                            placeholder="Enter"
                            className={inputClass}
                        />
                    </Field>

                    <Field label="Contact Number">
                        <input
                            required
                            name="contactNumber"
                            placeholder="Enter contact number"
                            className={inputClass}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-5">
                        <SelectField
                            label="Id Type"
                            name="idType"
                        >
                            <option value="">Select</option>
                            <option>Passport</option>
                            <option>Driving License</option>
                            <option>National ID</option>
                        </SelectField>

                        <Field label="Id Number">
                            <input
                                required
                                name="idNumber"
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </Field>
                    </div>

                    <Field label="Description/Remark/Proof">
                        <textarea
                            required
                            name="proof"
                            placeholder="ENTER"
                            className={`${inputClass} h-24 py-3`}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-5">
                        <SelectField
                            label="Verification By"
                            name="verifiedBy"
                        >
                            <option value="">Select Staff</option>
                            <option>Front Desk</option>
                            <option>Manager</option>
                        </SelectField>

                        <Field label="Verification Date">
                            <input
                                name="verificationDate"
                                defaultValue="2083/01/01"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="mt-5 text-sm text-amber-700"
                    >
                        {error}
                    </p>
                )}

                <div className="mt-10 grid grid-cols-2 gap-8">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="orange"
                        type="submit"
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </main>
    );
}