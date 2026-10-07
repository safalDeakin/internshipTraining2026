import SidebarHeader from "../../../sidebar/SidebarHeader";
// import ReservationSidebarHeader from "./ReservationHeader";
import ReservationList from "./ReservationList";

export default function ReservationSidebar() {

  const handleAddReservation = () => {
    // Handle the logic for adding a new reservation here
    console.log("Add Reservation button clicked");
  };
  return (
    <>
      <div>
        <div className="w-80 min-h-screen bg-[#ffffff] pt-5 px-3.75 pb-3.75 m-2">
          <SidebarHeader
            title="All Reservations"
            onAdd={handleAddReservation}
          />
          <div className="h-6" />
          <ReservationList />
        </div>
      </div>
    </>
  );
};

