
import { Pencil } from "lucide-react";
import { days } from "../data/data";
import type { RatePlanContextValue } from "../types/types";
import SectionHeading from "./SectionHeading";
import TimelineRow from "./TimelineRow";

interface Props {
    ratePlan: RatePlanContextValue;
}

export default function TimelineSection({ ratePlan }: Props) {
    return (
        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <SectionHeading
                title="Rate applicable days"
                action={
                    <button
                        className="primary-button"
                        onClick={ratePlan.openUpdateDialog}
                        type="button"
                    >
                        <Pencil size={15} aria-hidden="true" />
                        Update rate
                    </button>
                }
            />

            <div className="overflow-x-auto p-4 sm:p-5">
                <div className="min-w-230">
                    <div className="grid grid-cols-[180px_repeat(7,minmax(95px,1fr))] gap-2">
                        <div className="flex items-end px-2 pb-3 text-[0.65rem] font-bold tracking-widest text-slate-400 uppercase">
                            Room type
                        </div>

                        {days.map((day, index) => (
                            <div
                                className="border-b border-slate-200 bg-slate-50 px-2 py-2 text-center text-slate-500"
                                key={day}
                            >
                                <span className="block text-[0.65rem] font-bold tracking-wide uppercase">
                                    {day.slice(0, 3)}
                                </span>
                                <span className="mt-0.5 block text-[0.62rem] opacity-60">
                                    {index + 12} Aug
                                </span>
                            </div>
                        ))}

                        {ratePlan.rooms.map((room) => {
                            const week = ratePlan.timeline.find(
                                (entry) => entry.roomId === room.id
                            );

                            if (!week) return null;

                            return (
                                <TimelineRow
                                    key={room.id}
                                    room={room}
                                    rates={week.rates}
                                    showDetails={ratePlan.showRoomDetails}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
