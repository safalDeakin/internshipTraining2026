import { AppProvider } from "./allReservation/context/AppContext";
import ReservationApp from "./allReservation/ReservationApp";

export default function FinalAllReservationPage() {
  return (
    <AppProvider>
      <ReservationApp />
    </AppProvider>
  );
}