import { Plus } from "lucide-react";
import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import { RepoHoldReservationProvider } from "../provider/HoldReservationProvider";
import { useHoldReservationHook } from "../provider/useHoldReservationHook";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import { ReservationDetails } from "./ReservatoinDetails";
import type { ReservationRecord } from "../../../../../domain/holdReservation";
import { HoldModal } from "./forms/HoldModal";



function ReservationWorkspace() {
    const guestRequestContext = useHoldReservationHook();
    const { showDialog } = useDialogBox();


    const detailContentBuilder = (selectedId: string) => {
        const request = guestRequestContext.data.find(
            (item) => item.hold.id === selectedId
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
                <ReservationDetails
                    reservation={request.reservation}
                />
            </>
        );
    };

    const listItemBuilder = (
        item: ReservationRecord
    ) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">
                    {item.hold.guestName}
                </span>

                <span className="truncate text-[12px] text-slate-600">
                    {item.reservation.room.number}
                </span>
            </div>
        );
    };
    const handleShowAddGuestRequest = async () => {

        const result = await showDialog<boolean>({
            title: "Add Pending",
            showHeader: true,
            width: 600,

            content: (
                <HoldModal />

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
                getId={(item) => guestRequestContext.getId(item.hold)}
                title={guestRequestContext.title}
                headerChildren={actionButton}
            />


        </>
    );
}

export default function HoldReservationRenderer() {
    return (
        <RepoHoldReservationProvider>
            <ReservationWorkspace />
        </RepoHoldReservationProvider>
    );
}
