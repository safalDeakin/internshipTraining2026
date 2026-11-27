import { Check, ListChecks, Send } from "lucide-react";

import type { GuestRequest } from "../../../../../domain/GuestRequest";

import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";

import { PostToFolioModal } from "./PostToFolioModal";
import CompleteTaskModal from "../../../dropdown/modal/CompletionTaskModal";

type Props = {
  request: GuestRequest;
  posted: boolean;
};

export default function GuestRequestToolbar({ request, posted }: Props) {
  const { showDialog } = useDialogBox();

  const completed = request.status === "Completed";

  const handlePostToFolio = async () => {
    await showDialog({
      title: "Post to Folio",
      showHeader: true,
      width: 600,
      content: <PostToFolioModal request={request} />,
    });
  };

  const openCompleteTaskModal = () => {
    showDialog({
      title: "Complete Assigned Task",
      showHeader: true,
      width: 600,
      content: <CompleteTaskModal onSubmit={(data) => console.log(data)} />,
    });
  };

  return (
    <Toolbar
      left={
        <>
          <ListChecks size={14} className="text-slate-500" />

          <h2 className="min-w-0 truncate text-[clamp(10px,0.75vw,12px)] font-semibold">
            Prabin-{request.room} - {request.title}
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-lime-400" />
          </h2>

          <p
            className={`shrink-0 text-[10px] font-semibold ${
              completed ? "text-emerald-600" : "text-blue-600"
            }`}
          >
            {completed ? "Completed" : "New"}
          </p>
        </>
      }
      right={
        <>
          <button
            type="button"
            onClick={openCompleteTaskModal}
            className="shrink-0 text-[10px] text-slate-600 hover:text-emerald-600"
          >
            Assigned Task
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
