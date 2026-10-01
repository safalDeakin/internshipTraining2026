import { AppProvider } from "./context/AppContext";
import ReservationApp from "./ReservationApp";

export default function FinalApp() {
  return (
    <AppProvider>
      <ReservationApp />
    </AppProvider>
  );
}