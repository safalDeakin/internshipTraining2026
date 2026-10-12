import { AllReservationProvider } from "./allReservation/context/AllReservationContext";
import ReservationApp from "./allReservation/ReservationApp";

export default function FinalAllReservationPage() {
  return (
    <AllReservationProvider>
      <ReservationApp />
    </AllReservationProvider>
  );
}