import { useEffect, useState } from "react";
import { X } from "lucide-react";

import SidebarHeader from "../../../../../../component/ListView/ListViewHeader";
import ReservationList from "./ReservationList";
import HotelReservation from "../../../hotelReservation/HotelReservation";

export default function ReservationSidebar() {
  const [showReservation, setShowReservation] = useState(false);

  const handleAddReservation = () => {
    setShowReservation(true);
  };

  const handleCloseReservation = () => {
    setShowReservation(false);
  };

  useEffect(() => {
    if (!showReservation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseReservation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showReservation]);

  return (
    <>
      {/* Reservation Sidebar */}
      <div className="m-2 min-h-screen w-80 bg-white px-3.75 pb-3.75 pt-5">
        <SidebarHeader
          title="All Reservations"
          onAdd={handleAddReservation}
        />

        <div className="h-6" />

        <ReservationList />
      </div>

      {/* Center Modal */}
      {showReservation && (
        <div
          className="reservation-overlay fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px] sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseReservation();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Create new reservation"
            className="reservation-modal relative my-auto flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  New Reservation
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Enter the details to create a reservation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseReservation}
                aria-label="Close reservation form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Reservation Form */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <HotelReservation />
            </div>
          </div>
        </div>
      )}
    </>
  );
}