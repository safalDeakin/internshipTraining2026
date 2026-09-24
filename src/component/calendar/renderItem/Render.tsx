import { useCalendar } from "../../../hooks/useCalendar";
import CalendarGrid from "../calendarComponents/CalendarGrid";
import CalendarToolbar from "../calendarComponents/CalendarToolbar";
import EventModal from "../calendarComponents/EventModal";
import EventsSidebar from "../calendarComponents/EventsSideBar";

const Render = () => {
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

  const years = Array.from({ length: 10 }, (_, index) => 2020 + index);

  const eventsThisMonth = events.filter(
    (event) => event.month === month && event.year === year,
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-[Inter,sans-serif]">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ">
        {/*Header of Toolbar*/}
        <div className="px-6 pt-4 ">
          <CalendarToolbar
            month={month}
            year={year}
            years={years}
            onMonthChange={setMonth}
            onYearChange={setYear}
            onAddHoliday={openAddHoliday}
          />
        </div>

        {/* MainBody (calendar + sidebar) */}
        <div className="flex flex-col lg:flex-row">
          {/* Calendar */}
          <div className="flex-1 px-6 pb-6">
            <CalendarGrid
              month={month}
              year={year}
              events={eventsThisMonth}
              onAddEvent={() => openAddEvent(new Date().getDate())}
              onEditEvent={openEditEvent}
            />
          </div>

          {/* Sidebar */}
          <EventsSidebar
            events={eventsThisMonth}
            onAddEvent={() => openAddEvent(new Date().getDate())}
            onEditEvent={openEditEvent}
          />
        </div>

        {/* Modal */}
        <EventModal
          modal={modal}
          form={form}
          month={month}
          year={year}
          onClose={closeModal}
          onFormChange={(field, value) =>
            updateForm(field as keyof typeof form, value)
          }
          onSave={saveModal}
          onDelete={deleteEvent}
        />
      </div>
    </div>
  );
};

export default Render;
