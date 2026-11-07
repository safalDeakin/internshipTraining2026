import { AllReservationProvider } from "./XXXallReservation/context/AllReservationContext";
import ReservationApp from "./XXXallReservation/ReservationApp";

export default function FinalAllReservationPage() {
  return (
    <AllReservationProvider>
      <ReservationApp />
    </AllReservationProvider>
  );
}