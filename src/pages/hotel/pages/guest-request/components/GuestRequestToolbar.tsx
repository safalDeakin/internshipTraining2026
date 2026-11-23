import { Check, ListChecks, Send } from "lucide-react";
import type { GuestRequest } from "../../../../../domain/GuestRequest";

import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";

import { PostToFolioModal } from "./PostToFolioModal";
import AssignedTaskModal from "../../../dropdown/modal/AssignedTaskModal";
import { useGuestRequestTask } from "../provider/GuestRequestTaskProvider";

type Props = {
  request: GuestRequest;
  posted: boolean;
};

export default function GuestRequestToolbar({ request, posted }: Props) {
  const { showDialog } = useDialogBox();

  const { getTaskDetails, updateTaskDetails } = useGuestRequestTask();
  const task = getTaskDetails(request.id);

  const handlePostToFolio = async () => {
    const result = await showDialog<boolean>({
      title: "Post to Folio",
      showHeader: true,
      width: 600,
      content: <PostToFolioModal request={request} />,
    });

    if (result === true) {
      console.log("Posted to folio");
    }
  };

  const handleAssignedTask = async () => {
    const result = await showDialog<boolean>({
      title: "Assigned Task",
      showHeader: false,
      width: 550,
      content: (
        <AssignedTaskModal
          onAssign={(data) => {
            updateTaskDetails(request.id, {
              status: "Assigned",
              assignedTo: data.assignedTo,
              completionNote: data.completionNote,
            });
          }}
        />
      ),
    });

    if (result === true) {
      console.log("Task assigned successfully");
    }
  };

  return (
    <Toolbar
      left={
        <>
          <ListChecks size={14} className="text-slate-500" />

          <h2 className="min-w-0 truncate text-[clamp(10px,0.75vw,12px)] font-semibold">
            Prabin- {request.room} - {request.title}
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-lime-400" />
          </h2>

          {/* Task Status - moved beside title */}
          <button
            type="button"
            className={`flex h-7 shrink-0 items-center gap-1 rounded px-3 text-xs font-medium ${
              task.status === "Assigned"
                ? "bg-blue-100 text-blue-700"
                : task.status === "Completed"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {task.status !== "New" && <Check size={12} />}
            {task.status}
          </button>
        </>
      }
      right={
        <>
          <button
            type="button"
            onClick={handleAssignedTask}
            className="hidden text-slate-600 hover:text-blue-600 sm:inline"
          >
            Fullfill Reqwuest
          </button>

          <button
            type="button"
            onClick={handlePostToFolio}
            disabled={posted}
            className={`flex h-7 items-center gap-1 px-3 text-[10px] text-white ${
              posted ? "bg-emerald-600" : "bg-emerald-400 hover:bg-emerald-500"
            }`}
          >
            {posted ? <Check size={12} /> : <Send size={12} />}
            {posted ? "Posted" : "Post to Folio"}
          </button>
        </>
      }
    />
  );
}
