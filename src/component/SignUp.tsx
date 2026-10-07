import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const handlesignin = () => {};
  return (
    <div className="mt-6 w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold text-center ">Welcome back !</h1>
        <p className="text-center text-sm  ">Let's get you in sign securely</p>
        <button className="w-80 border border-gray-400 px-10 py-3 rounded-lg text-center flex items-center gap-3">
          <span>
            <FcGoogle className="w-5 h-5" />
          </span>{" "}
          <span className="text-sm"> Continue with Google</span>
        </button>
        <button className="w-80 border border-gray-400 px-10 py-3 rounded-lg text-center flex items-center gap-3">
          <span>
            <FaFacebook className="w-5 h-5 text-blue-700" />
          </span>{" "}
          <span className="text-sm">Continue with Facebook</span>
        </button>
        <button className="w-80 border border-gray-400 px-10 py-3 rounded-lg text-center flex items-center gap-3">
          <span>
            <FaApple className="w-5 h-5" />
          </span>{" "}
          <span className="text-sm">Continue with Apple</span>
        </button>
      </div>
      <div className="w-full max-w-80 mx-auto flex items-center gap-4 my-5">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      <div className="w-full max-w-80">
        <form onSubmit={handlesignin} className="space-y-5">
          <div className="flex flex-col gap-2 w-auto">
            <label htmlFor="username" className="text-xs font-bold text-left">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-auto px-3 py-2 focus:outline-none border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-bold text-left">
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
            <button className="text-xs text-blue-500 text-right cursor-pointer">
              Forget Your Password?
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-blue-700 text-white w-full px-2 py-2 text-center text-sm rounded-lg flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Login With Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
