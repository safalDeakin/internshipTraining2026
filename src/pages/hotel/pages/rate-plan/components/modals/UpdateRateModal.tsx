
import type { FormEvent } from "react";
import { Edit3 } from "lucide-react";
import { days } from "../../data/data";
import type { DayKey, RoomRate } from "../../types/types";
import ModalShell from "./ModalShell";

interface Props {
    rooms: RoomRate[];
    close: () => void;
    submit: (roomId: string, day: DayKey, rate: number) => void;
}

export default function UpdateRateModal({
    rooms,
    close,
    submit,
}: Props) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        submit(
            String(form.get("roomId")),
            String(form.get("day")) as DayKey,
            Number(form.get("rate"))
        );
    };

    return (
        <ModalShell
            close={close}
            subtitle="Change the price for a specific day"
            title="Update timeline rate"
        >
            <form
                className="grid gap-4 p-5 sm:p-6"
                onSubmit={handleSubmit}
            >
                <label className="field-label">
                    Room type
                    <select className="form-input" name="roomId" required>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="field-label">
                    Applicable day
                    <select className="form-input" name="day" required>
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="field-label">
                    New rate (NPR)
                    <input
                        className="form-input"
                        min="1"
                        name="rate"
                        placeholder="4500"
                        required
                        type="number"
                    />
                </label>

                <div className="mt-2 flex justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        className="ghost-button"
                        onClick={close}
                        type="button"
                    >
                        Cancel
                    </button>

                    <button className="primary-button" type="submit">
                        <Edit3 size={15} aria-hidden="true" />
                        Save change
                    </button>
                </div>
            </form>
        </ModalShell>
    );
}
