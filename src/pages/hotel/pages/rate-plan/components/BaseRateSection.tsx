
import { BedDouble, Pencil, User } from "lucide-react";
import type { RatePlanContextValue } from "../types/types";
import SectionHeading from "./SectionHeading";
import currency from "../utils/currency";

interface Props {
    ratePlan: RatePlanContextValue;
}

export default function BaseRateSection({ ratePlan }: Props) {
    return (
        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <SectionHeading
                title="Rate base price"
                action={
                    <button
                        className="primary-button"
                        onClick={ratePlan.openAddDialog}
                        type="button"
                    >
                        <Pencil size={16} aria-hidden="true" />
                        Add rate
                    </button>
                }
            />

            <div className="overflow-x-auto">
                <table className="w-full min-w-165 border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 text-[0.68rem] tracking-[0.08em] text-slate-400 uppercase">
                            <th className="px-5 py-2.5 font-medium">Room type</th>
                            <th className="px-5 py-2.5 font-medium">Room List</th>
                            <th className="px-5 py-3 font-bold">Base rate</th>
                            <th className="px-5 py-3 font-bold">
                                Per additional guest
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {ratePlan.rooms.map((room) => (
                            <tr
                                className="group border-t border-slate-200 transition hover:bg-slate-50"
                                key={room.id}
                            >
                                <td className="px-5 py-2.5 flex gap-1">
                                    <span className="flex h-5 w-5 items-center justify-center bg-slate-200 text-slate-500">
                                        <BedDouble size={12} aria-hidden="true" />
                                    </span>
                                    <span className="block text-[clamp(0.68rem,1.4vw,0.78rem)] font-medium text-[#557b9c]">
                                        {room.name}
                                    </span>
                                </td>
                                <td className="px-5 py-2.5">
                                    <button
                                        className="flex cursor-pointer items-center gap-1.5 text-left"
                                        onClick={() => ratePlan.showRoomDetails(room)}
                                        type="button"
                                    >
                                        <span className="text-[clamp(0.68rem,1.4vw,0.78rem)] font-medium text-[#557b9c] group-hover:underline">
                                            {room.roomNumbers
                                                .slice(0, 3)
                                                .map((item) => item.number)
                                                .join(", ")}
                                        </span>

                                        {room.roomNumbers.length > 3 && (
                                            <span className="shrink-0 text-xs font-medium text-slate-400">
                                                and {room.roomNumbers.length - 3} more...
                                            </span>
                                        )}
                                    </button>
                                </td>

                                <td className="px-5 py-2.5 text-[clamp(0.68rem,1.4vw,0.78rem)] font-medium text-slate-700">
                                    {currency.format(room.baseRate)}
                                </td>

                                <td className="px-5 py-2.5">
                                    <span className="flex items-center gap-1 text-[clamp(0.68rem,1.4vw,0.78rem)] font-medium text-[#557b9c]">
                                        1 x <User size={14} aria-hidden="true" /> ={" "}
                                        {currency.format(room.additionalRate)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
