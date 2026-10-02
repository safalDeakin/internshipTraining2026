import ReservationSidebarHeader from "./ReservationHeader";
import ReservationList from "./ReservationList";

export default function ReservationSidebar(){
  return (
    <>
      <div>
        <div className="w-80 min-h-screen bg-[#ffffff] pt-5 px-3.75 pb-3.75 m-2">
          <ReservationSidebarHeader />
          <div className="h-6" />
          <ReservationList />
        </div>
      </div>
    </>
  );
};

