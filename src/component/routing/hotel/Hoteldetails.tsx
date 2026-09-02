import { useParams } from "react-router-dom";
import { MockReserve } from "../../constant/MockReverse";

const Hoteldetails = () => {
  const { id } = useParams();
  const reservationDetails = MockReserve.find((res) => res.id === Number(id));
  if (!reservationDetails) {
    return <p>Reservation not found</p>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Details of Reservation</h1>
      <p>{reservationDetails.room}</p>
      <p>{reservationDetails.name}</p>
      <p>{reservationDetails.email}</p>
      <p>{reservationDetails.status}</p>
    </div>
  );
};

export default Hoteldetails;
