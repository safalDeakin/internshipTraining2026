import { useParams } from "react-router-dom";
import { useRepo } from "../../../context/RepoContext";
import { useReservationState } from "../../../hooks/userReservationState";

const Hoteldetails = () => {
  const { id } = useParams();
  const { reservationState } = useRepo();
  const { reservations } = useReservationState(reservationState);

  const reservationDetails = reservations.find(
    (reservation) => reservation.id === id
  );
  if (!reservationDetails) {
    return <p>Reservation not found</p>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Details of Reservation</h1>
      <p>{reservationDetails.room}</p>
      <p>{reservationDetails.name}</p>
      <p>{reservationDetails.status}</p>
      <p>{reservationDetails.accommodationId}</p>
    </div>
  );
};

export default Hoteldetails;
