import { Check, ChevronDown, ListChecks, Send } from "lucide-react";
import type { GuestRequest } from "../../../../../domain/GuestRequest";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import { PostToFolioModal } from "./PostToFolioModal";

type Props = {
    request: GuestRequest;
    posted: boolean;
};

export function RequestHeader({
    request,
    posted,
}: Props) {
    const { showDialog } = useDialogBox();

    const handlePostToFolio = async () => {
        const result = await showDialog<boolean>({
            title: "Post to Folio",
            showHeader: true,
            width: 600,

            content: (
                <PostToFolioModal
                    request={request}
                />
            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted to folio");
        }
    };

    return (
        <>
            <header className="flex h-12 items-center gap-2 border-b border-slate-200 bg-white px-3 sm:px-4">
                <ListChecks
                    size={14}
                    className="text-slate-500"
                />

                <h2 className="min-w-0 flex-1 truncate text-[clamp(10px,0.75vw,12px)] font-semibold">
                    Prabin-{request.room} - {request.title}

                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-lime-400" />
                </h2>

                <span className="hidden text-[10px] text-slate-600 sm:inline">
                    {request.status}
                </span>

                <button
                    onClick={handlePostToFolio}
                    disabled={posted}
                    className={`flex h-7 items-center gap-1 px-3 text-[10px] text-white ${posted
                        ? "bg-emerald-600"
                        : "bg-emerald-400 hover:bg-emerald-500"
                        }`}
                >
                    {posted ? (
                        <Check size={12} />
                    ) : (
                        <Send size={12} />
                    )}

                    {posted ? "Posted" : "Post to Folio"}
                </button>

                <button
                    type="button"
                    className="hidden items-center gap-1 text-[10px] text-slate-600 lg:flex"
                >
                    Completed
                    <ChevronDown size={12} />
                </button>
            </header>
        </>
    );
}