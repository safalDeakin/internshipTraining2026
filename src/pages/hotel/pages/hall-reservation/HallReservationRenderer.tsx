import { Plus } from "lucide-react";

import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView";
import useDialogBox from "../../../../lib/component/DialogueBox/useDialogueBox";
import { RepoHallReservationProvider } from "./provider/HallReservationProvider";
import type { HallReservation } from "../../../../domain/hallReservation";
import { useHallReservationHook } from "./provider/useHallReservation";
import { HallReservationDetail } from "./components/HallReservationDetail";


function HallReservationMasterDetailView() {
    const HallReservationContext = useHallReservationHook();
    const { showDialog } = useDialogBox();


    const detailContentBuilder = (selectedId: string) => {
        const request = HallReservationContext.data.find(
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
                <HallReservationDetail hallReservationId={request.id} />
            </>
        );
    };

    const listItemBuilder = (
        item: HallReservation
    ) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">
                    {item.title}
                </span>

                <span className="truncate text-[12px] text-slate-600">
                    {item.id}
                </span>
            </div>
        );
    };
    const handleShowAddGuestRequest = async () => {

        const result = await showDialog<boolean>({
            title: "Hall Reservation",
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
            aria-label="Add Hall Reservation"
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
                items={HallReservationContext.data}
                searchQuery={HallReservationContext.searchQuery}
                onSearchChange={HallReservationContext.setSearchQuery}
                detailContentBuilder={detailContentBuilder}
                listItemBuilder={listItemBuilder}
                getId={HallReservationContext.getId}
                title={HallReservationContext.title}
                headerChildren={actionButton}
            />


        </>
    );
}

export default function HallReservationRenderer() {
    return (
        <RepoHallReservationProvider>
            <HallReservationMasterDetailView />
        </RepoHallReservationProvider>
    );
}
