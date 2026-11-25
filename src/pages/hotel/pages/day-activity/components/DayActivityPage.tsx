


import { Plus } from "lucide-react";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import { useDayActivity } from "../provider/useDayActivity";
import { Dashboard } from "./Dashboard";
import type { Building } from "../../../../../domain/dayActivity";
import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";




export default function DayActivityPage() {
    const {
        data,
        searchQuery,
        setSearchQuery,
        title,
    } = useDayActivity();
    const { showDialog } = useDialogBox();


    const detailContentBuilder = (selectedId: string) => {
        const request = data.find(
            (item) => item.id === selectedId
        );

        if (!request) {
            return (
                <div className="p-4 text-sm text-slate-400">
                    Request not found
                </div>
            );
        }

        return <Dashboard building={request} />;
    };

    const listItemBuilder = (
        item: Building
    ) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">
                    {item.id}
                </span>

                <span className="truncate text-[12px] text-slate-600">
                    {item.name}
                </span>
            </div>
        );
    };
    const handleShowAddDayActivityRequest = async () => {

        const result = await showDialog<boolean>({
            title: "Day Activity",
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
            onClick={handleShowAddDayActivityRequest}
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
                items={data}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                detailContentBuilder={detailContentBuilder}
                listItemBuilder={listItemBuilder}
                getId={(item) => item.id}
                title={title}
                headerChildren={actionButton}
            />


        </>
    );
}