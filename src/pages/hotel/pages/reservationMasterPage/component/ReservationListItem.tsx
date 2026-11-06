import type { ReservationListModel } from "../model/ReservationModel";

type ReservationListItemProps = {
    data: ReservationListModel
};

export function ReservationListItem({
    data
}: ReservationListItemProps) {

    return (
        <>
            {/* Top row */}
            <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12px] font-medium text-[#29445f]">
                    {data.guestName}
                </span>

                {data.checkInTime && (
                    <span className="shrink-0 text-[11px] text-[#9ba7b5]">
                        {data.checkInTime}
                    </span>
                )}
            </div>

            {/* Reservation details */}
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8a98a8]">
                <span>
                    {data.reservationCode.replace('RV-', 'R')}
                </span>

                <span>•</span>

                <span>
                    Room {data.roomNumber}
                </span>
            </div>
        </>
    );
}

