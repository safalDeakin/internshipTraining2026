import type { FormEvent } from "react";
import { Plus } from "lucide-react";
import type { NewRoomRate, RoomStatus } from "../../types/types";
import ModalShell from "./ModalShell";

interface Props {
    close: () => void;
    submit: (room: NewRoomRate) => void;
}

export default function AddRateModal({ close, submit }: Props) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        submit({
            name: String(form.get("name")),
            code: String(form.get("code")),
            roomNo: String(form.get("roomNo")),
            floor: Number(form.get("floor")),
            status: String(form.get("status")) as RoomStatus,
            baseRate: Number(form.get("baseRate")),
            additionalRate: Number(form.get("additionalRate")),
            capacity: Number(form.get("capacity")),
            beds: String(form.get("beds")),
            description: String(form.get("description")),
        });
    };

    return (
        <ModalShell
            close={close}
            subtitle="Create a new room type and weekly price"
            title="Add room rate"
        >
            <form
                className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6"
                onSubmit={handleSubmit}
            >
                <label className="field-label sm:col-span-2">
                    Room name
                    <input
                        className="form-input"
                        name="name"
                        placeholder="e.g. Family Room"
                        required
                    />
                </label>

                <label className="field-label">
                    Room code
                    <input
                        className="form-input"
                        name="code"
                        placeholder="e.g. FAM-401"
                        required
                    />
                </label>

                <label className="field-label">
                    Room number
                    <input
                        className="form-input"
                        name="roomNo"
                        placeholder="e.g. 401"
                        required
                    />
                </label>

                <label className="field-label">
                    Floor
                    <input
                        className="form-input"
                        defaultValue="1"
                        min="0"
                        name="floor"
                        required
                        type="number"
                    />
                </label>

                <label className="field-label">
                    Room status
                    <select
                        className="form-input"
                        defaultValue="Available"
                        name="status"
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Out of Service">
                            Out of Service
                        </option>
                    </select>
                </label>

                <label className="field-label">
                    Maximum guests
                    <input
                        className="form-input"
                        defaultValue="2"
                        min="1"
                        name="capacity"
                        required
                        type="number"
                    />
                </label>

                <label className="field-label">
                    Base rate (NPR)
                    <input
                        className="form-input"
                        min="1"
                        name="baseRate"
                        placeholder="4500"
                        required
                        type="number"
                    />
                </label>

                <label className="field-label">
                    Additional guest (NPR)
                    <input
                        className="form-input"
                        defaultValue="500"
                        min="0"
                        name="additionalRate"
                        required
                        type="number"
                    />
                </label>

                <label className="field-label sm:col-span-2">
                    Bed configuration
                    <input
                        className="form-input"
                        name="beds"
                        placeholder="1 king bed + sofa bed"
                        required
                    />
                </label>

                <label className="field-label sm:col-span-2">
                    Description
                    <textarea
                        className="form-input min-h-20 resize-none"
                        name="description"
                        placeholder="Add a short description of the room"
                        required
                    />
                </label>

                <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-4 sm:col-span-2">
                    <button
                        className="ghost-button"
                        onClick={close}
                        type="button"
                    >
                        Cancel
                    </button>

                    <button className="primary-button" type="submit">
                        <Plus size={16} aria-hidden="true" />
                        Add to rate plan
                    </button>
                </div>
            </form>
        </ModalShell>
    );
}
