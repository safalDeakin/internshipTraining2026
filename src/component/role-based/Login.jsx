import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSave = (role) => {
    localStorage.setItem("role", role);
    navigate("/");
  };
  return (
    <div className=" h-screen ">
      <h1>LOGIN</h1>
      <div className="p-5 bg-blue-100 flex flex-col gap-10 items-start">
        <button
          onClick={() => handleSave("ADMIN")}
          className="p-2 rounded-2xl border border-gray-500"
        >
          Login as Admin
        </button>
        <button
          onClick={() => handleSave("HOTEL_MANAGER")}
          className="p-2 rounded-2xl border border-gray-500"
        >
          Login as Hotel Manager
        </button>
        <button
          onClick={() => handleSave("RESTAURANT_MANAGER")}
          className="p-2 rounded-2xl border border-gray-500"
        >
          Login as Restro Manager
        </button>
      </div>
    </div>
  );
};

export default Login;
