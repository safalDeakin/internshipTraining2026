import {
    Clock3,
    FileImage,
    MessageSquareWarning,
    Paperclip,
    Pencil,
    UserRound,
} from 'lucide-react';
import type { ComplaintStatus } from '../../../types';
import { useReservationState } from '../../../../../hooks/allReservation/useReservationState';
import { useUIState } from '../../../../../hooks/allReservation/useUIState';

const statusStyles: Record<ComplaintStatus, string> = {
    Open: 'border-amber-200 bg-amber-50 text-amber-700',
    'In Progress': 'border-blue-200 bg-blue-50 text-blue-700',
    Resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Closed: 'border-gray-200 bg-gray-100 text-gray-600',
};

function Detail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">{label}</p>
            <p className="mt-1 text-xs font-semibold text-gray-800">{value || '—'}</p>
        </div>
    );
}

export default function ComplaintTab() {
    const { selectedReservation: reservation } = useReservationState();
    const { openAddComplaint, openUpdateComplaint } = useUIState();
    const complaint = reservation.complaints.at(-1);

    if (!complaint) {
        return (
            <div className="flex min-h-64 items-center justify-center py-12">
                <div className="max-w-sm text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <MessageSquareWarning size={22} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-gray-800">No complaints recorded</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        Add a complaint to track the issue, assignment, and resolution status for this
                        reservation.
                    </p>
                    <button
                        onClick={openAddComplaint}
                        className="mt-4 rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Add Complaint
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 p-3">
            <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <MessageSquareWarning size={16} className="text-blue-600" />
                        <p className="text-sm font-semibold text-gray-800">Complaint Detail</p>
                    </div>
                    <button
                        onClick={() => openUpdateComplaint(complaint.id)}
                        className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        <Pencil size={13} />
                        Update Status
                    </button>
                </div>
                <div className=" flex flex-col gap-4 px-4 py-1 ">
                    <div className='flex items-center '>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Referene to :</p>
                        <p className=" text-xs font-semibold text-gray-800 ml-2">  {complaint.assignedTo}</p>
                    </div>
                    <div className='flex items-center '>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Guest Reference :</p>
                        <p className=" text-xs font-semibold text-gray-800 ml-2">  {complaint.guestReference}</p>
                    </div>
                    <div className='flex items-center '>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Expected Resolved :</p>
                        <p className=" text-xs font-semibold text-gray-800 ml-2">  {complaint.expectedResolved}</p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-4">
                <div className="space-y-4 border-b border-gray-100 p-4 lg:border-b-0 lg:border-r">
                    <div className="flex items-start justify-between gap-2">
                        <Detail label="Complaint No" value={complaint.complaintNumber} />
                        <span
                            className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${statusStyles[complaint.status]}`}
                        >
                            {complaint.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock3 size={13} className="text-gray-400" />
                        {complaint.reportedAt}
                    </div>
                    <Detail label="Reported At" value={complaint.reportedBy} />
                    <Detail label="Received By" value={complaint.receivedBy} />
                </div>

                <div className="space-y-5 border-b border-gray-100 p-4 lg:border-b-0 lg:border-r">
                    <Detail label="Complaint Category" value={complaint.category} />
                    <Detail label="Complaint Type" value={complaint.type} />
                </div>

                <div className="space-y-5 border-b border-gray-100 p-4 lg:border-b-0 lg:border-r">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">Status</p>
                        <span
                            className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[10px] font-medium ${statusStyles[complaint.status]}`}
                        >
                            {complaint.status}
                        </span>
                    </div>
                    <div className="flex items-start gap-2">
                        <UserRound size={14} className="mt-0.5 text-gray-400" />
                        <Detail label="Assigned To" value={complaint.assignedTo} />
                    </div>
                </div>

                <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <Paperclip size={14} className="text-gray-400" />
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            Attachments
                        </p>
                    </div>
                    {complaint.attachments.length ? (
                        <div className="grid grid-cols-2 gap-2">
                            {complaint.attachments.map((attachment) => (
                                <div
                                    key={attachment}
                                    className="flex min-h-20 flex-col items-center justify-center rounded border border-gray-200 bg-gray-50 p-2 text-center"
                                >
                                    <FileImage size={22} className="text-blue-500" />
                                    <span className="mt-2 max-w-full truncate text-[10px] text-gray-500">
                                        {attachment}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400">No attachments</p>
                    )}
                </div>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-800">Complaint Description</p>
                <p className="mt-2 max-w-3xl text-xs leading-5 text-gray-600">
                    {complaint.description}
                </p>
                {/* {complaint.statusDescription && (
                    <div className="mt-4 rounded border border-blue-100 bg-blue-50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide">
                            Latest Status Description
                        </p>
                        <p className="mt-1 text-xs ">
                            {complaint.statusDescription}
                        </p>
                    </div>
                )} */}
            </section>
        </div>
    );
}
