
import HeaderCard from "./components/HeaderCard";
import BaseRateSection from "./components/BaseRateSection";
import TimelineSection from "./components/TimelineSection";

import AddRateModal from "./components/modals/AddRateModal";
import UpdateRateModal from "./components/modals/UpdateRateModal";
import RoomDetailsModal from "./components/modals/RoomDetailsModal";

import "./styles/styles.css";
import { useRatePlan } from "./hooks/useRatePlan";


export function RatePlanPage() {
    const ratePlan = useRatePlan();

    return (
        <main className="min-h-screen bg-[#f6f6f6] px-2 py-3 text-slate-900 sm:px-5 sm:py-6 lg:px-8">
            <div className="mx-auto flex max-w-310 flex-col gap-4 sm:gap-5">
                <HeaderCard />

                <BaseRateSection ratePlan={ratePlan} />

                <TimelineSection ratePlan={ratePlan} />
            </div>

            {ratePlan.dialog === "add" && (
                <AddRateModal
                    close={ratePlan.closeDialog}
                    submit={ratePlan.addRoomRate}
                />
            )}

            {ratePlan.dialog === "update" && (
                <UpdateRateModal
                    close={ratePlan.closeDialog}
                    rooms={ratePlan.rooms}
                    submit={ratePlan.updateTimelineRate}
                />
            )}

            {ratePlan.selectedRoom && (
                <RoomDetailsModal
                    close={ratePlan.closeRoomDetails}
                    room={ratePlan.selectedRoom}
                />
            )}
        </main>
    );
}
