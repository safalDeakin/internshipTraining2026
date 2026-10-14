import { useReservationCalendarContext } from
    "./reservatoinCalendar/context/ReservationCalendarContext";

import CalendarHeader from "./reservatoinCalendar/components/Calendar/CalendarHeader";
import CalendarControls from "./reservatoinCalendar/components/Calendar/CalendarControls";
import CalendarGrid from "./reservatoinCalendar/components/Calendar/CalendarGrid";
import ResponsiveCalendarView from "./reservatoinCalendar/components/Calendar/ResponsiveCalendarView";
import LandscapeGuard from "./reservatoinCalendar/components/Responsive/LandScapeGuard";
import DragMessage from "./reservatoinCalendar/components/UI/DragMessag";

import { ReservationCalendarProvider } from
    "./reservatoinCalendar/context/ReservationCalendarProvider";

import "../css/reservationCalendar/reservationCalendar.css";

function ReservationCalendarContent() {
    const {
        calendar,
        filters,
        navigation,
        dragMessage,
        desktopDrag,
        pointerDrag,
    } = useReservationCalendarContext();

    return (
        <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1a2332] max-w-375 mx-auto">
            <CalendarHeader />

            <LandscapeGuard>
                <div className="px-6 py-5 space-y-4">
                    <ResponsiveCalendarView
                        timeline={
                            <>
                                <CalendarControls
                                    weekStart={calendar.weekStart}
                                    weekDates={calendar.weekDates}
                                    selectedDate={calendar.selectedDate}
                                    onDateChange={navigation.handleDateChange}
                                    floorFilter={filters.floorFilter}
                                    roomFilter={filters.roomFilter}
                                    search={filters.search}
                                    viewMode={calendar.viewMode}
                                    showBottomRuler={calendar.showBottomRuler}
                                    onPreviousWeek={navigation.previousWeek}
                                    onNextWeek={navigation.nextWeek}
                                    onFloorChange={filters.setFloorFilter}
                                    onRoomChange={filters.setRoomFilter}
                                    onSearchChange={filters.setSearch}
                                    onViewModeChange={calendar.setViewMode}
                                    onToggleBottomRuler={() =>
                                        calendar.setShowBottomRuler(
                                            current => !current
                                        )
                                    }
                                />

                                <CalendarGrid
                                    rooms={filters.filteredRooms}
                                    weekDates={calendar.weekDates}
                                    today={calendar.today}
                                    todaySlotPos={calendar.todaySlotPos}
                                    showBottomRuler={calendar.showBottomRuler}
                                    reservationsByRoom={calendar.calendarReservations}
                                    draggedReservation={calendar.draggedReservation}
                                    dropPreview={calendar.dropPreview}
                                    onReservationDragStart={desktopDrag.handleDragStart}
                                    onReservationDragEnd={desktopDrag.handleDragEnd}
                                    onReservationDragOver={desktopDrag.handleDragOver}
                                    onReservationDrop={desktopDrag.handleDrop}
                                    onPointerDown={pointerDrag.handlePointerDown}
                                    onPointerMove={pointerDrag.handlePointerMove}
                                    onPointerUp={pointerDrag.handlePointerUp}
                                />

                                <DragMessage message={dragMessage.dragMessage} />
                            </>
                        }
                    />
                </div>
            </LandscapeGuard>
        </div>
    );
}

export default function ReservationCalendar() {
    return (
        <ReservationCalendarProvider>
            <ReservationCalendarContent />
        </ReservationCalendarProvider>
    );
}