import { ChevronDown } from "lucide-react";
import type { POSSession } from "../../../shell/types/posSessionTypes";
import { useState } from "react";
import { SessionNavList } from "../../../shell/SessionNavlist";

export type SessionNavGroupProps = {
    organizationId: number;
    selectedDate: string,
    selectedStaffName: string;
    handleDateSelect: (date: string) => void;
    handleStaffSelect: (session: POSSession) => void;
}
export function SessionNavGroup({ organizationId, selectedDate, selectedStaffName,
    handleDateSelect,
    handleStaffSelect
}: SessionNavGroupProps) {
    const [posSessionsOpen, setPosSessionsOpen] = useState(true);
    return (
        <div>
            <button
                type="button"
                onClick={() => setPosSessionsOpen((open) => !open)}
                className="flex w-full items-center gap-1 rounded-lg px-2 pb-2 text-left text-gray-800 hover:bg-blue-50"
            >
                <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${posSessionsOpen ? "rotate-180 text-blue-500" : ""
                        }`}
                />

                <span className="font-medium">POS Sessions</span>
            </button>
            {posSessionsOpen && (
                <SessionNavList
                    organizationId={organizationId}
                    selectedDate={selectedDate}
                    selectedStaffName={selectedStaffName}
                    onDateSelect={handleDateSelect}
                    onSessionSelect={handleStaffSelect}
                />
            )}
        </div>
    )
}