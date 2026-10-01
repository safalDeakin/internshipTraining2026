import ReservationHeader from './components/reservation/ReservationHeader';
import ReservationInfo from './components/reservation/ReservationInfo';
import ReservationTabs from './components/reservation/ReservationTabs';
import ReservationSidebar from './components/layout/ReservationSidebar';

export default function ReservationApp() {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans text-gray-900">
      <div className="flex flex-1 min-h-0">

        <ReservationSidebar />
        <div className="flex flex-col flex-1 min-w-0 bg-white">
          <ReservationHeader />
          <ReservationInfo />
          <ReservationTabs />
        </div>
      </div>
    </div>
  );
}