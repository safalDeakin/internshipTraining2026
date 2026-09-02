import React, { useEffect } from "react";
import { MockReserve } from "../../constant/MockReverse";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      localStorage.setItem("selected", id);
      return;
    }
    const saved = localStorage.getItem("selected");
    if (saved) {
      navigate(`/accomodation/reservation/${saved}`, {
        replace: true,
      });
    }
  }, [id, navigate]);
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <aside className="w-50 p-5 border border-blue-100 shadow-sm flex flex-col gap-4 ">
        {MockReserve.map((re) => {
          return (
            <Link
              key={re.id}
              to={`/accomodation/reservation/${re.id}`}
              className={` ${
                String(re.id) === id
                  ? "bg-blue-100 text-blue-800 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="border-b border-b-gray-100 hover:bg-blue-100">
                {re.name}{" "}
                <span className="text-xs text-gray-500">Room:{re.room}</span>
              </p>
            </Link>
          );
        })}
      </aside>
      <main>{id ? <Outlet /> : <p>Not selected</p>}</main>
    </div>
  );
};

export default Reservation;
