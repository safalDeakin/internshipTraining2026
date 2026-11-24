import { useEffect, useState } from "react";
import { useHallReservationHook } from "../provider/useHallReservation";
import { CustomerDetails } from "./tabs/CustomerDetails";
import { EventFolio } from "./tabs/EventFolio";
import { ReservationSummary } from "./ReservationSummary";
import HallReservationTabs from "./HallReservationTabs";
import EmptyTab from "./tabs/EmptyTab";
import { FileText } from "lucide-react";


const tabs = [
    "Customer Details",
    "Event Folio",
    "Documents",
    "Additional Notes",
];

type HallReservationDetailProps = {
    hallReservationId: string | null;
};

export function HallReservationDetail({
    hallReservationId,
}: HallReservationDetailProps) {
    const { data } = useHallReservationHook();

    const selectedHall = data.find(
        (hallReservation) => hallReservation.id === hallReservationId
    );

    const [activeTab, setActiveTab] = useState("Customer Details");

    useEffect(() => {
        setActiveTab("Customer Details");
    }, [hallReservationId]);

    if (!selectedHall) {
        return (
            <article className="flex min-h-64 items-center justify-center bg-white p-6">
                <p className="text-sm text-gray-500">
                    No data selected or data not found.
                </p>
            </article>
        );
    }

    return (
        <article className="mt-4 min-w-0 bg-white overflow-y-auto">

            <ReservationSummary hallData={selectedHall} />

            <HallReservationTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="p-4 sm:p-6">
                {activeTab === "Customer Details" && (
                    <CustomerDetails hallData={selectedHall} />
                )}

                {activeTab === "Event Folio" && (
                    <EventFolio hallData={selectedHall} />
                )}

                {activeTab === "Documents" && (
                    <EmptyTab
                        icon={FileText}
                        title="No documents added"
                        description="Documents attached to this reservation will appear here."
                    />
                )}

                {activeTab === "Additional Notes" && (
                    <EmptyTab
                        icon={FileText}
                        title="No Notes added"
                        description="Notes attached to this reservation will appear here."
                    />
                )}
            </div>
        </article>
    );
}