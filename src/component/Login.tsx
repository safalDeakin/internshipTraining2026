import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { type User, users } from "../data/users";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  EyeClosedIcon,
  LoaderCircle,
} from "lucide-react";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const handletogoDashboard = () => {
    switch (loggedUser?.role) {
      case "ADMIN":
        navigate("/");
        break;
      case "RECEPTIONIST":
        navigate("/");
        break;
      case "WAITER":
        navigate("/");
        break;
      default:
        alert("Rolenot recognized");
    }
  };
  const handlelogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const foundUser = users.find(
        (user) => user.email === email && user.password === password,
      );
      if (!foundUser) {
        setIsLoading(false);
        alert("INvalid ");
        return;
      }

      login(foundUser);
      setLoggedUser(foundUser);
      setIsLoading(false);
      setIsLoginSuccess(true);
    }, 2000);
  };
  return (
    <section className="w-full h-screen grid grid-cols-[2fr_4fr] bg-slate-100 overflow-hidden">
      {/* left */}
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-600 flex flex-col justify-center items-center gap-5 overflow-hidden p-8">
        <div className="flex flex-col justify-center items-center gap-3 text-left">
          <h1 className="text-4xl font-bold text-white">
            Welcome to POS Management
          </h1>

          <p className="text-white font-serif font-medium">
            Manage your restaurant efficiently with our POS system
            <button onClick={() => navigate("/signin")}>
              <ArrowLeft />
            </button>
          </p>
          {/* <span>Sign in</span> */}
        </div>

        <img
          src="/sign.png"
          alt="POS Management"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
      {/* Right */}
      <div className="bg-white flex flex-col justify-center items-center">
        <div className="w-full max-w-sm flex flex-col gap-3">
          {isLoginSuccess ? (
            <div className="w-full flex flex-col gap-5 ">
              <h1 className="w-full text-center text-2xl font-bold">
                Welcome to POS Management
              </h1>
              <p className="w-full text-sm text-center font-bold font-serif">
                Login Successfully{" "}
                <button
                  onClick={handletogoDashboard}
                  className="text-blue-700 underline font-light"
                >
                  (Click for {loggedUser?.role} View)
                </button>
              </p>
            </div>
          ) : (
            <>
              {" "}
              <h1 className="text-4xl font-bold text-center">
                Login to Your Account
              </h1>
              <p className="text-xs text-center pb-6 font-bold">
                Please enter your credentials to continue
              </p>
              <form onSubmit={handlelogin} className="space-y-5">
                <div className="flex flex-col gap-2 w-auto">
                  <label
                    htmlFor="username"
                    className="text-xs font-bold text-left"
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 focus:outline-none border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-bold text-left"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showpassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 focus:outline-none border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      onClick={() => setShowpassword(!showpassword)}
                    >
                      {showpassword ? (
                        <EyeClosed className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer bg-blue-950 text-white w-full px-2 py-2 text-center text-sm rounded-lg flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    "login"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
