import { Plus } from "lucide-react";
import { useGuestRequestHook } from "./provider/useGuestRequest";
import { RequestDetails } from "./components/RequestDetails";
import type { GuestRequest } from "../../../../domain/GuestRequest";
import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView";
import { RepoGuestRequestProvider } from "./provider/GuestRequestProvider";

import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";
import GuestRequestToolbar from "./components/GuestRequestToolbar";

function GuestRequestMasterDetailView() {
    const guestRequestContext = useGuestRequestHook();
    const { showDialog } = useDialogBox();


    const detailContentBuilder = (selectedId: string) => {
        const request = guestRequestContext.data.find(
            (item) => item.id === selectedId
        );

        if (!request) {
            return (
                <div className="p-4 text-sm text-slate-400">
                    Request not found
                </div>
            );
        }

        return (
            <>
                <div className="flex flex-col w-full">
                    <GuestRequestToolbar
                        request={request}
                        posted={false}
                    />
                    <div className="p-1"></div>
                    <RequestDetails
                        request={request}
                    />
                </div>
            </>
        );
    };

    const listItemBuilder = (
        item: GuestRequest
    ) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">
                    {item.reservation}
                </span>

                <span className="truncate text-[12px] text-slate-600">
                    {item.title}
                </span>
            </div>
        );
    };
    const handleShowAddGuestRequest = async () => {

        const result = await showDialog<boolean>({
            title: "Make Reservation",
            showHeader: true,
            width: 600,

            content: (
                <h2>Yet to implement</h2>

            ),
        });

        if (result === true) {
            // successfully posted
            console.log("Posted Room Service");
        }
    };

    const actionButton = (
        <button
            type="button"
            className="
                flex h-8 w-8
                cursor-pointer
                items-center justify-center
                rounded-lg
                border border-gray-300
                bg-white
                hover:bg-[#f3f7fb]
            "
            aria-label="Add guest request"
            onClick={handleShowAddGuestRequest}
        >
            <Plus
                size={16}
                strokeWidth={2}
                className="text-[#0066B3]"
            />
        </button>
    );

    return (
        <>

            <MasterDetailView
                items={guestRequestContext.data}
                searchQuery={guestRequestContext.searchQuery}
                onSearchChange={guestRequestContext.setSearchQuery}
                detailContentBuilder={detailContentBuilder}
                listItemBuilder={listItemBuilder}
                getId={guestRequestContext.getId}
                title={guestRequestContext.title}
                headerChildren={actionButton}
            />


        </>
    );
}

export default function GuestRequestPageRenderer() {
    return (
        <RepoGuestRequestProvider>
            <GuestRequestMasterDetailView />
        </RepoGuestRequestProvider>
    );
}