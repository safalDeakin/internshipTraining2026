import { useCalendarState } from "../hooks/reservationCalendar/useCalendarState";
import { useCalendarNavigation } from "../hooks/reservationCalendar/useCalendarNavigation";
import { useCalendarFilters } from "../hooks/reservationCalendar/useCalendarFilters";
import { useDragMessage } from "../hooks/reservationCalendar/useDragMessage";
import { useReservationDrag } from "../hooks/reservationCalendar/useReservationDrag";
import { usePointerReservationDrag } from "../hooks/reservationCalendar/usePointerReservationDrag";

import CalendarHeader from "./reservatoinCalendar/components/Calendar/CalendarHeader";
import CalendarControls from "./reservatoinCalendar/components/Calendar/CalendarControls";
import CalendarGrid from "./reservatoinCalendar/components/Calendar/CalendarGrid";
import ResponsiveCalendarView from "./reservatoinCalendar/components/Calendar/ResponsiveCalendarView";
import LandscapeGuard from "./reservatoinCalendar/components/Responsive/LandScapeGuard";

import "../css/reservationCalendar/reservationCalendar.css"

import DragMessage from "./reservatoinCalendar/components/UI/DragMessag";

export default function ReservationCalendar() {

    // Calendar state
    const calendar = useCalendarState();

    // Filters
    const filters = useCalendarFilters();

    // Navigation
    const navigation = useCalendarNavigation({
        weekStart: calendar.weekStart,
        setWeekStart: calendar.setWeekStart,
        setSelectedDate: calendar.setSelectedDate,
    });

    // Drag message
    const dragMessage = useDragMessage();

    // Desktop drag
    const desktopDrag = useReservationDrag({
        calendarReservations: calendar.calendarReservations,
        setCalendarReservations: calendar.setCalendarReservations,
        draggedReservation: calendar.draggedReservation,
        setDraggedReservation: calendar.setDraggedReservation,
        dropPreview: calendar.dropPreview,
        setDropPreview: calendar.setDropPreview,
        showDragMessage: dragMessage.showDragMessage,
    });

    // Mobile / tablet drag
    const pointerDrag = usePointerReservationDrag({
        calendarReservations: calendar.calendarReservations,
        setCalendarReservations: calendar.setCalendarReservations,
        setDraggedReservation: calendar.setDraggedReservation,
        dropPreview: calendar.dropPreview,
        setDropPreview: calendar.setDropPreview,
        showDragMessage: dragMessage.showDragMessage,
    });

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

                                <DragMessage
                                    message={dragMessage.dragMessage}
                                />

                            </>
                        }
                    />

                </div>

            </LandscapeGuard>
        </div>
    );
}