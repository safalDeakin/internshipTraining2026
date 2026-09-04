import { X } from "lucide-react";
import type { EventForm, ModalState, EventType } from "../../types/calendar";
import { getDaysInMonth } from "../../utils/calendarUtils";

interface EventModalProps {
    modal: ModalState;
    form: EventForm;
    month: number;
    year: number;
    onClose: () => void;
    onFormChange: (
        field: keyof EventForm,
        value: string | number
    ) => void;

    onSave: () => void;

    onDelete: (id: number) => void;
}

const EventModal = ({
    modal,
    form,
    month,
    year,
    onClose,
    onFormChange,
    onSave,
    onDelete,
}: EventModalProps) => {
    if (!modal.mode) {
        return null;
    }

    const isEditing =
        modal.editId != null;

    const isHoliday =
        modal.mode === "holiday";

    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-gray-800">
                        {isHoliday
                            ? isEditing
                                ? "Edit Holiday"
                                : "Add Holiday"
                            : isEditing
                                ? "Edit Event"
                                : "Add Event"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="space-y-3">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            onFormChange(
                                "title",
                                e.target.value
                            )
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />

                    {/* Event-specific fields */}
                    {!isHoliday && (
                        <>
                            <input
                                type="text"
                                placeholder="Subtitle (optional)"
                                value={form.subtitle}
                                onChange={(e) =>
                                    onFormChange(
                                        "subtitle",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />

                            <input
                                type="text"
                                placeholder="Time e.g. 3:00 - 5:00"
                                value={form.time}
                                onChange={(e) =>
                                    onFormChange(
                                        "time",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                        </>
                    )}

                    {/* Date */}
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                            Date
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={getDaysInMonth(month, year)}
                            value={form.date}
                            onChange={(e) =>
                                onFormChange(
                                    "date",
                                    Number(e.target.value)
                                )
                            }
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>

                    {/* Type */}
                    {!isHoliday && (
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">
                                Type
                            </label>

                            <select
                                value={form.type}
                                onChange={(e) =>
                                    onFormChange(
                                        "type",
                                        e.target.value as EventType
                                    )
                                }
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            >
                                <option value="special">
                                    Special
                                </option>

                                <option value="birthday">
                                    Birthday
                                </option>

                                <option value="marketing">
                                    Marketing
                                </option>

                                <option value="internal">
                                    Internal
                                </option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-5">
                    {isEditing && (
                        <button
                            onClick={() =>
                                onDelete(modal.editId!)
                            }
                            className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    )}

                    <button
                        onClick={onSave}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                    >
                        {isEditing ? "Save" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;