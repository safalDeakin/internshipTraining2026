
import { Plus } from "lucide-react";
import { useRepoPackageHook } from "../context/RepoPackageProvider";

import { PackageDetail } from "./PackageDetail";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import type { HotelPackage } from "../../../../../domain/hotel-package";
import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import AddPackageForm from "./forms/AddPackageForm";
import { useState } from "react";



export default function PackagePage() {
    const hotelPackageContext = useRepoPackageHook()
    const { showDialog } = useDialogBox();



    const detailContentBuilder = (selectedId: string) => {
        const request = hotelPackageContext.data.find(
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
                <PackageDetail packageId={request.id} />
            </>
        );
    };

    const listItemBuilder = (
        item: HotelPackage
    ) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-slate-600">
                    {item.name}
                </span>
            </div>
        );
    };

    const handleShowAddHotelPackage = async () => {
        const result = await showDialog<boolean>({
            title: "Add Hotel-Packages",
            showHeader: true,
            width: 800,

            content: (
                <AddPackageForm />
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
            onClick={handleShowAddHotelPackage}
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
                items={hotelPackageContext.data}
                searchQuery={hotelPackageContext.searchQuery}
                onSearchChange={hotelPackageContext.setSearchQuery}
                detailContentBuilder={detailContentBuilder}
                listItemBuilder={listItemBuilder}
                getId={hotelPackageContext.getId}
                title={hotelPackageContext.title}
                headerChildren={actionButton}
            />

        </>
    );
}