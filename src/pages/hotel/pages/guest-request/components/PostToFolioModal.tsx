import { BillingTable } from "./BillingTable";
import { DetailItem } from "./DetailItem";
import type { GuestRequest } from "../../../../../domain/GuestRequest";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

type Props = {
    request: GuestRequest;
};

export function PostToFolioModal({ request }: Props) {
    const { closeDialog } = useDialogBox();

    const handlePost = () => {
        //Post 
        closeDialog(true);
    };

    return (
        <div className="bg-white p-3 sm:p-4">
            <dl className="mb-2">
                <DetailItem
                    label="Room No"
                    value={request.room}
                    strong
                />

                <DetailItem
                    label="Reservation No"
                    value={request.reservation}
                />
            </dl>

            <h3 className="mb-1 text-[11px] font-bold">
                Billing
            </h3>

            <BillingTable
                items={request.billItems}
                compact
            />

            <div className="mt-5 flex justify-center gap-3">
                <button
                    type="button"
                    onClick={() => closeDialog(false)}
                    className="border border-slate-400 bg-slate-100 px-3 py-1 text-[10px] shadow-sm"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handlePost}
                    className="bg-indigo-500 px-5 py-1 text-[10px] text-white shadow-sm hover:bg-indigo-600"
                >
                    Post
                </button>
            </div>
        </div>
    );
}