import { useCalendar } from "../hooks/useCalendar";

import BusinessInformation from "./BusinessInformation";
import CalendarGrid from "./Calendar/CalendarGrid";
import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarToolbar from "./Calendar/CalendarToolbar";
import EventModal from "./Event/EventModal";
import EventsSidebar from "./Event/EventsSideBar";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BUSINESS_INFO } from "../data/businessCalendar";

const CLOSE_DURATION = 200;

interface RenderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MainContent({
  isOpen,
  onClose,
}: RenderProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);


  const {
    month,
    year,
    events,
    modal,
    form,

    setMonth,
    setYear,

    openAddEvent,
    openAddHoliday,
    openEditEvent,

    updateForm,
    saveModal,
    deleteEvent,
    closeModal,
  } = useCalendar();

  /* Handle opening and closing.*/
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

      return;
    }

    if (shouldRender) {
      setIsClosing(true);

      const timeout = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, CLOSE_DURATION);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [isOpen, shouldRender]);




  if (!shouldRender) {
    return null;
  }

  const years = Array.from(
    { length: 10 },
    (_, index) => 2020 + index,
  );

  const eventsThisMonth = events.filter(
    (event) =>
      event.month === month &&
      event.year === year,
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
    >
      <div
        className={`
          w-full max-w-5xl overflow-hidden rounded-2xl
          border border-gray-100 bg-white shadow-2xl
          transition-all duration-200
          ${isClosing
            ? "animate-[settingsDialogOut_200ms_ease-in_forwards]"
            : "animate-[settingsDialogIn_300ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
          } 
        `}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Calendar Header */}
        <CalendarHeader
          closeButtonRef={closeButtonRef}
          onClose={onClose}
        />

        {/* Business Information */}
        <div className="px-6 pt-4">
          <BusinessInformation info={BUSINESS_INFO} />
        </div>

        {/* Calendar Toolbar */}
        <div className="px-6">
          <CalendarToolbar
            month={month}
            year={year}
            years={years}
            onMonthChange={setMonth}
            onYearChange={setYear}
            onAddHoliday={openAddHoliday}
          />
        </div>

        {/* Main Body */}
        <div className="flex flex-col lg:flex-row">

          {/* Calendar */}
          <div className="min-w-0 flex-1 px-6 pb-6">
            <CalendarGrid
              month={month}
              year={year}
              events={eventsThisMonth}
              onAddEvent={() =>
                openAddEvent(new Date().getDate())
              }
              onEditEvent={openEditEvent}
            />
          </div>

          {/* Sidebar */}
          <EventsSidebar
            events={eventsThisMonth}
            onAddEvent={() =>
              openAddEvent(new Date().getDate())
            }
            onEditEvent={openEditEvent}
          />
        </div>

        {/* Event Modal */}
        <EventModal
          modal={modal}
          form={form}
          month={month}
          year={year}
          onClose={closeModal}
          onFormChange={(field, value) =>
            updateForm(
              field as keyof typeof form,
              value,
            )
          }
          onSave={saveModal}
          onDelete={deleteEvent}
        />
      </div>
    </div>,
    document.body,
  );
}