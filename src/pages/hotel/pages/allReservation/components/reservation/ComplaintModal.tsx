import { useEffect, useId, useState, type FormEvent } from 'react';
import { CalendarDays, MessageSquareWarning, X } from 'lucide-react';

import type { ComplaintStatus } from '../../types';
import { useAllReservationContext } from '../../context/AllReservationContext';
import { useReservationState } from '../../../../hooks/allReservation/useReservationState';
import { useUIState } from '../../../../hooks/allReservation/useUIState';

const inputClass =
    'mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100';
const updateInputClass =
    'mt-1.5 w-full rounded border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100';
const labelClass = 'text-xs font-medium text-gray-700';

const categoryTypes: Record<string, string[]> = {
    'Food & Beverage': ['Food Quality', 'Food Service', 'Incorrect Order'],
    Maintenance: ['Air Conditioning', 'Plumbing', 'Electrical'],
    Housekeeping: ['Room Cleanliness', 'Linen', 'Amenities'],
    'Front Office': ['Check In', 'Check Out', 'Staff Service'],
    Billing: ['Incorrect Charge', 'Payment', 'Refund'],
};

function localDateTimeValue() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

function createDefaultAddForm() {
    return {
        complaintDateTime: localDateTimeValue(),
        receivedBy: 'Front Desk',
        category: 'Food & Beverage',
        type: 'Food Quality',
        description: '',
        assignedDepartment: 'Food & Beverage',
        assignedTo: 'Front Desk',
        assignmentDescription: '',
    };
}

export default function ComplaintModal() {
    const titleId = useId();
    const { repo } = useAllReservationContext();
    const { selectedReservation: reservation } = useReservationState();
    const { complaintModal, closeComplaintModal, setActiveTab } = useUIState();
    const [addForm, setAddForm] = useState(createDefaultAddForm);
    const [status, setStatus] = useState<ComplaintStatus>('In Progress');
    const [statusDescription, setStatusDescription] = useState('');

    const complaint =
        complaintModal?.mode === 'update'
            ? reservation.complaints.find((item) => item.id === complaintModal.complaintId)
            : undefined;

    useEffect(() => {
        if (!complaintModal) return;

        if (complaintModal.mode === 'add') {
            setAddForm(createDefaultAddForm());
            return;
        }

        if (complaint) {
            setStatus(complaint.status);
            setStatusDescription(complaint.statusDescription);
        }
    }, [complaint, complaintModal]);

    useEffect(() => {
        if (!complaintModal) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeComplaintModal();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeComplaintModal, complaintModal]);

    if (!complaintModal) return null;

    const isAdd = complaintModal.mode === 'add';
    const [checkIn = '—', checkOut = '—'] = reservation.bookingDate.split(' - ');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isAdd) {
            repo.addComplaint(reservation.id, {
                referenceTo: 'Room',
                guestReference: addForm.description,
                expectedResolved: 'Not set',
                reportedAt: new Date(addForm.complaintDateTime).toLocaleString(),
                reportedBy: reservation.guest.name,
                receivedBy: addForm.receivedBy,
                category: addForm.category,
                type: addForm.type,
                status: 'Open',
                assignedDepartment: addForm.assignedDepartment,
                assignedTo: addForm.assignedTo,
                assignmentDescription: addForm.assignmentDescription,
                description: addForm.description,
                statusDescription: 'Complaint recorded and awaiting assignment.',
                attachments: [],
            });
            setActiveTab('complaint');
        } else if (complaint) {
            repo.updateComplaintStatus(
                reservation.id,
                complaint.id,
                status,
                statusDescription.trim()
            );
        }

        closeComplaintModal();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-3"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeComplaintModal();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`relative max-h-[94vh] w-full overflow-hidden bg-white shadow-2xl ${isAdd ? 'max-w-md rounded-sm' : 'max-w-2xl rounded-xl'
                    }`}
            >
                {isAdd ? (
                    <button
                        type="button"
                        aria-label="Close complaint form"
                        onClick={closeComplaintModal}
                        className="absolute right-3 top-3 z-10 rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={16} />
                    </button>
                ) : (
                    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                <MessageSquareWarning size={16} />
                            </div>
                            <div>
                                <p id={titleId} className="text-sm font-semibold text-gray-900">
                                    Update Complaint Status
                                </p>
                                <p className="mt-0.5 text-[11px] text-gray-500">
                                    {reservation.guest.name} · {reservation.reservationNumber}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            aria-label="Close complaint form"
                            onClick={closeComplaintModal}
                            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                            <X size={17} />
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {isAdd ? (
                        <div className="max-h-[94vh] overflow-y-auto bg-gray-50 px-7 py-7 sm:px-10">
                            <p id={titleId} className="sr-only">
                                Add Complaint
                            </p>

                            <p className="mb-2 text-xs font-bold text-gray-900">
                                Guest &amp; Stay Information
                            </p>
                            <section className="rounded-sm bg-white p-2 shadow-md">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    <label className={labelClass}>
                                        Guest Name
                                        <input
                                            readOnly
                                            value={reservation.guest.name}
                                            className={`${inputClass} bg-gray-50`}
                                        />
                                    </label>
                                    <label className={labelClass}>
                                        Reservation No
                                        <input
                                            readOnly
                                            value={reservation.reservationNumber}
                                            className={`${inputClass} bg-gray-50`}
                                        />
                                    </label>
                                    <label className={labelClass}>
                                        Room No
                                        <input
                                            readOnly
                                            value={reservation.room.number}
                                            className={`${inputClass} bg-gray-50`}
                                        />
                                    </label>
                                </div>
                            </section>

                            <section className="mt-5 rounded-sm bg-white p-2 shadow-md">
                                <div className="grid grid-cols-2 gap-8">
                                    <label className={`${labelClass} text-gray-400`}>
                                        Check In
                                        <span className="relative block">
                                            <input
                                                readOnly
                                                value={checkIn}
                                                className={`${inputClass} pr-9 text-gray-700`}
                                            />
                                            <CalendarDays
                                                size={14}
                                                className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-gray-800"
                                            />
                                        </span>
                                    </label>
                                    <label className={`${labelClass} text-gray-400`}>
                                        Check Out
                                        <span className="relative block">
                                            <input
                                                readOnly
                                                value={checkOut}
                                                className={`${inputClass} pr-9 text-gray-700`}
                                            />
                                            <CalendarDays
                                                size={14}
                                                className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-gray-800"
                                            />
                                        </span>
                                    </label>
                                </div>
                            </section>

                            <p className="mb-2 mt-7 text-xs font-bold text-gray-900">
                                Complaint Information
                            </p>
                            <section className="rounded-sm bg-white p-2 shadow-md">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    <label className={labelClass}>
                                        Complaint Date &amp; Time
                                        <input
                                            required
                                            type="datetime-local"
                                            value={addForm.complaintDateTime}
                                            onChange={(event) =>
                                                setAddForm({
                                                    ...addForm,
                                                    complaintDateTime: event.target.value,
                                                })
                                            }
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className={labelClass}>
                                        Received By
                                        <input
                                            required
                                            value={addForm.receivedBy}
                                            onChange={(event) =>
                                                setAddForm({ ...addForm, receivedBy: event.target.value })
                                            }
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className={labelClass}>
                                        Complaint Category
                                        <select
                                            value={addForm.category}
                                            onChange={(event) => {
                                                const category = event.target.value;
                                                setAddForm({
                                                    ...addForm,
                                                    category,
                                                    type: categoryTypes[category][0],
                                                });
                                            }}
                                            className={inputClass}
                                        >
                                            {Object.keys(categoryTypes).map((category) => (
                                                <option key={category}>{category}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className={labelClass}>
                                        Complaint Type
                                        <select
                                            value={addForm.type}
                                            onChange={(event) =>
                                                setAddForm({ ...addForm, type: event.target.value })
                                            }
                                            className={inputClass}
                                        >
                                            {categoryTypes[addForm.category].map((type) => (
                                                <option key={type}>{type}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </section>

                            <label className={`${labelClass} mt-4 block font-bold text-gray-900`}>
                                Complaint Description
                                <textarea
                                    required
                                    rows={4}
                                    value={addForm.description}
                                    onChange={(event) =>
                                        setAddForm({ ...addForm, description: event.target.value })
                                    }
                                    className={`${inputClass} resize-none`}
                                />
                            </label>

                            <p className="mb-2 mt-4 text-xs font-bold text-gray-900">Assignment</p>
                            <section className="rounded-sm bg-white p-2 shadow-md">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    <label className={labelClass}>
                                        Assign Department
                                        <select
                                            value={addForm.assignedDepartment}
                                            onChange={(event) =>
                                                setAddForm({
                                                    ...addForm,
                                                    assignedDepartment: event.target.value,
                                                })
                                            }
                                            className={inputClass}
                                        >
                                            {Object.keys(categoryTypes).map((department) => (
                                                <option key={department}>{department}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className={labelClass}>
                                        Assign Staff
                                        <input
                                            required
                                            value={addForm.assignedTo}
                                            onChange={(event) =>
                                                setAddForm({ ...addForm, assignedTo: event.target.value })
                                            }
                                            className={inputClass}
                                        />
                                    </label>
                                    <label className={`${labelClass} col-span-2`}>
                                        Description
                                        <input
                                            required
                                            value={addForm.assignmentDescription}
                                            onChange={(event) =>
                                                setAddForm({
                                                    ...addForm,
                                                    assignmentDescription: event.target.value,
                                                })
                                            }
                                            className={inputClass}
                                        />
                                    </label>
                                </div>
                            </section>

                            <div className="mt-7 flex justify-center">
                                <button
                                    type="submit"
                                    className="min-w-32 rounded-md bg-orange-500 px-8 py-2.5 text-xs font-medium text-white shadow-md transition-colors hover:bg-orange-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="max-h-[calc(90vh-9rem)] overflow-y-auto p-5">
                                <div className="space-y-4">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                            Complaint
                                        </p>
                                        <p className="mt-1 text-xs font-semibold text-gray-800">
                                            {complaint?.complaintNumber} · {complaint?.type}
                                        </p>
                                    </div>
                                    <label className={labelClass}>
                                        Status
                                        <select
                                            value={status}
                                            onChange={(event) =>
                                                setStatus(event.target.value as ComplaintStatus)
                                            }
                                            className={updateInputClass}
                                        >
                                            <option>Open</option>
                                            <option>In Progress</option>
                                            <option>Resolved</option>
                                            <option>Closed</option>
                                        </select>
                                    </label>
                                    <label className={labelClass}>
                                        Status Description
                                        <textarea
                                            required
                                            rows={5}
                                            value={statusDescription}
                                            onChange={(event) => setStatusDescription(event.target.value)}
                                            placeholder="Describe the work completed, current progress, or next step."
                                            className={updateInputClass}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3">
                                <button
                                    type="button"
                                    onClick={closeComplaintModal}
                                    className="rounded border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Update Status
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
