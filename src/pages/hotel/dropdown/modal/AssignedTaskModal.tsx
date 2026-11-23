import { useState } from "react";
import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";

interface AssignedTaskModalProps {
  onAssign: (data: { assignedTo: string; completionNote: string }) => void;
}

export default function AssignedTaskModal({
  onAssign,
}: AssignedTaskModalProps) {
  const { closeDialog } = useDialogBox();

  const [assignedTo, setAssignedTo] = useState("");
  const [completionNote, setCompletionNote] = useState("");

  const handleAssign = () => {
    if (!assignedTo.trim()) return;

    onAssign({
      assignedTo: assignedTo.trim(),
      completionNote: completionNote.trim(),
    });

    closeDialog(true);
  };

  return (
    <div className="w-full bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">Assign Task</h3>

      <div className="space-y-4">
        {/* Staff Name */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Assigned To <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Enter staff name"
            className="w-full rounded border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
          />
        </div>

        {/* Completion Note */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Completion Note
          </label>

          <textarea
            value={completionNote}
            onChange={(e) => setCompletionNote(e.target.value)}
            placeholder="Enter completion note..."
            rows={4}
            className="w-full resize-none rounded border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleAssign}
          disabled={!assignedTo.trim()}
          className="rounded bg-blue-600 px-5 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Assign
        </button>
      </div>
    </div>
  );
}
