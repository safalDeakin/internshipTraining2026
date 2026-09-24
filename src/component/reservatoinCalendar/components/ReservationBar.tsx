
import type { Reservation } from "../types/reservation";

interface ReservationBarProps {
    reservation: Reservation;
    totalSlots: number;

    statusColors: (status: Reservation["status"]) => {
        bg: string;
        border: string;
        text: string;
    };

    onDragStart?: (
        event: React.DragEvent<HTMLDivElement>,
        reservation: Reservation
    ) => void;

    onDragEnd?: (
        event: React.DragEvent<HTMLDivElement>
    ) => void;

    isDragging?: boolean;


    onPointerDown?: (
        event: React.PointerEvent<HTMLDivElement>,
        reservation: Reservation
    ) => void;

    onPointerMove?: (
        event: React.PointerEvent<HTMLDivElement>
    ) => void;

    onPointerUp?: (
        event: React.PointerEvent<HTMLDivElement>
    ) => void;
}

export default function ReservationBar({
    reservation,
    totalSlots,
    statusColors,
    onDragStart,
    onDragEnd,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isDragging,
}: ReservationBarProps) {
    const colors = statusColors(reservation.status);


    return (
        <div
            draggable={true}

            /* Touch / pointer drag */
            onPointerDown={(event) => {
                onPointerDown?.(
                    event,
                    reservation
                );
            }}

            onPointerMove={(event) => {
                onPointerMove?.(event);
            }}

            onPointerUp={(event) => {
                onPointerUp?.(event);
            }}

            /* Desktop HTML5 drag */
            onDragStart={(event) => {

                event.dataTransfer.effectAllowed =
                    "move";

                event.dataTransfer.setData(
                    "text/plain",
                    reservation.id
                );

                onDragStart?.(
                    event,
                    reservation
                );
            }}

            onDragEnd={onDragEnd}

            className={`group absolute z-10 flex items-center rounded-md px-2 cursor-grab active:cursor-grabbing select-none touch-none transition-[opacity,transform,filter,box-shadow] duration-200 ease-out hover:brightness-95 top-2.25 bottom-2.25
                ${isDragging
                    ? "opacity-30 scale-[0.98] shadow-lg"
                    : "opacity-100 scale-100"
                }
            `}
            style={{
                left: `calc(${(reservation.startSlot / totalSlots) * 100}% + 2px)`,
                width: `calc(${(reservation.span / totalSlots) * 100}% - 4px)`,
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
            }}

            title={
                reservation.guestName ||
                reservation.status
            }
        >
            {/* Drag Handle */}
            < div className="shrink-0 flex items-center justify-center mr-1 opacity-40 group-hover:opacity-80 transition-opacity"
            >
                {/* Reservation Information */}
                < div className="truncate min-w-0" >
                    <div className="text-[11px] font-semibold truncate leading-tight">
                        {reservation.status}
                    </div>

                    {
                        reservation.guestName && (
                            <div className="text-[10px] opacity-70 truncate leading-tight">
                                {reservation.guestName}
                            </div>
                        )
                    }

                </div >
            </div>
        </div>
    );
}