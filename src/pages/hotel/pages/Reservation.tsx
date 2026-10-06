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
      {/* LEFT - RESERVATION LIST */}
      <aside className="border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Reservations</h2>

        <input
          type="text"
          placeholder="Search reservation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-md px-3 py-2 mb-4 outline-none"
        />

        <div className="flex flex-col">
          {filteredReservations.map((reservation) => (
            <Link
              key={reservation.reservationId}
              to={`./${reservation.reservationId}`}
              onClick={() => selectReservation(reservation.reservationId)}
              className={`p-3 border-b border-gray-100 ${String(reservation.reservationId) === id
                ? "bg-blue-100 text-blue-800"
                : "hover:bg-gray-100"
                }`}
            >
              <p className="font-medium">{reservation.guestName}</p>

              <p className="text-xs text-gray-500">
                Room: {reservation.roomNumber}
              </p>
            </Link>
          ))}

          {filteredReservations.length === 0 && (
            <p className="text-sm text-gray-500">No reservations found</p>
          )}
        </div>
      </aside>

      {/* RIGHT - RESERVATION DETAILS */}
      <main className="p-5">
        {id ? (
          <Outlet />
        ) : (
          <div className="text-gray-500">Select a reservation</div>
        )}
      </main>
    </div>
  );
};

export default Reservation;
