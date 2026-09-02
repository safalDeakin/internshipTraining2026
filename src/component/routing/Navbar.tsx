import { useState } from "react";
import { Menu } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setISOpen] = useState(false);
  const chnage = () => {
    setISOpen(!isOpen);
  };
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-white shadow-sm ">
      <ul className="flex justify-between ">
        <NavLink to="/" className="font-bold ">
          LIQUID LOUNGE
        </NavLink>
        <input
          type="text"
          placeholder="search..."
          className="border border-gray-400 text-sm text-gray-500 p-1 rounded-lg focus:outline-none "
        />
        <div onClick={chnage}>
          <Menu />
          {isOpen && (
            <>
              <div className="absolute top-25 right-0 flex flex-col gap-2 w-40 p-4 shadow-sm bg-white text-left">
                <p className="text-xs text-gray-400">Menu</p>
                <NavLink
                  to="/restaurant"
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-800" : "text-black"
                    } hover:bg-blue-50 px-2 border border-gray-100`
                  }
                >
                  Restaurant
                </NavLink>
                <NavLink
                  to="/accomodation"
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-800" : "text-black"
                    } hover:bg-blue-50 px-2 border border-gray-100`
                  }
                >
                  Accomodations
                </NavLink>
                <NavLink
                  to="/catering"
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-800" : "text-black"
                    } hover:bg-blue-50 px-2 border border-gray-100`
                  }
                >
                  Catering
                </NavLink>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-400 rounded-2xl p-1"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
