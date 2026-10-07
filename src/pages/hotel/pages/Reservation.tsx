//author:Shrajja
import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useRepo } from "../../../context/RepoContext";
import { useReservationState } from "../../../hooks/userReservationState";
import { useAuth } from "../../../utils/secureclient/useAuth";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { organization } = useAuth();
  const { reservationState } = useRepo();
  const { reservations, search, setSearch, selectReservation } =
    useReservationState(reservationState);

  useEffect(() => {
    if (id) {
      localStorage.setItem("selected", id);
      selectReservation(id);
      return;
    }
    const saved = localStorage.getItem("selected");

    if (saved && organization?.slug) {
      navigate(`/${organization.slug}/accomodation/reservation/${saved}`, {
        replace: true,
      });
    }
  }, [id, navigate, selectReservation, organization?.slug]);

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.guestName.toLowerCase().includes(search.toLowerCase()) ||
      String(reservation.roomNumber)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="grid grid-cols-[300px_1fr] min-h-screen">
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Reservation;
