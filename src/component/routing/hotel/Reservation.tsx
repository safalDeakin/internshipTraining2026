import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { useRepo } from "../../../context/RepoContext";
import { useReservationState } from "../../../hooks/userReservationState";
// import {mockReservations} from "../../../repo/mockData";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the state holder from Context
  const { reservationState } = useRepo();

  // Get state + actions from the hook
  const {
    reservations,
    search,
    setSearch,
    selectReservation,
  } = useReservationState(reservationState);

  useEffect(() => {
    if (id) {
      localStorage.setItem("selected", id);

      // Keep state holder selection in sync with URL
      selectReservation(id);

      return;
    }

    const saved = localStorage.getItem("selected");

    if (saved) {
      navigate(
        `/accomodation/reservation/${saved}`,
        {
          replace: true,
        }
      );
    }
  }, [id, navigate, selectReservation]);

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      reservation.room
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-[1fr_3fr]">

      <aside className="w-50 p-5 border border-blue-100 shadow-sm flex flex-col gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search reservation..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-gray-200 rounded-md px-3 py-2 outline-none"
        />

        {/* Reservations */}
        {filteredReservations.map((reservation) => (
          <Link
            key={reservation.id}
            to={`/accomodation/reservation/${reservation.id}`}
            onClick={() =>
              selectReservation(reservation.id)
            }
            className={`
                            ${String(reservation.id) === id
                ? "bg-blue-100 text-blue-800 border-blue-500"
                : "hover:bg-gray-100"
              }
                        `}
          >
            <p className="border-b border-b-gray-100 hover:bg-blue-100 p-2">
              {reservation.name}

              <span className="text-xs text-gray-500">
                {" "}
                Room: {reservation.room}
              </span>
            </p>
          </Link>
        ))}

        {filteredReservations.length === 0 && (
          <p className="text-sm text-gray-500">
            No reservations found
          </p>
        )}

      </aside>

      <main>
        {id ? (
          <Outlet />
        ) : (
          <p>Not selected</p>
        )}
      </main>

    </div>
  );
};

export default Reservation;