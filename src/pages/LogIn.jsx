import { LogInIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../validations/LogInValidations";

const LogIn = () => {
  const { signIn, googleAuth } = useContext(AuthContext);
  const [logInError, setLogInError] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const { error, data: authData } = await signIn(data.email, data.password);
    setLogInError(error);
    if (error) return;
    reset({
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <div className="min-h-screen flex">
      {/* Left - Image with overlay */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="/assets/main-image.avif"
          alt="travel"
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.75)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10">
          <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-3 font-light">
            Traveloop Bookings
          </p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontSize: "2.8rem", fontFamily: "Georgia, serif" }}
          >
            Your next adventure
            <br />
            starts here.
          </h2>
        </div>
      </div>
      <div
        className="w-full md:w-1/2 flex flex-col justify-center px-12 py-16"
        style={{ backgroundColor: "#1e2d3d" }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="text-gray-500 hover:text-white text-sm mb-12 flex items-center gap-2 transition-colors w-fit"
        >
          ← Back to website
        </Link>

        {/* Heading */}
        <h1
          className="text-white font-bold mb-1"
          style={{ fontSize: "2.4rem", fontFamily: "Georgia, serif" }}
        >
          Log In
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          New here? {""}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign Up
          </Link>
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name row */}
          <div className="relative">
            <input
              type="email"
              {...register("email", { onChange: () => setLogInError(null) })}
              placeholder="Email address"
              className="px-4 w-full py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: "#1a2535",
                border: "1px solid #1e2d3d",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
            />
            {errors.email && (
              <span className="absolute px-3 bg-[#1e2d3d] rounded-xl text-red-400 text-[12px] -top-2 right-3">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="password"
              {...register("password", { onChange: () => setLogInError(null) })}
              placeholder="Password"
              className="px-4 py-3 w-full rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: "#1a2535",
                border: "1px solid #1e2d3d",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
            />
            {errors.password && (
              <span className="absolute px-3 bg-[#1e2d3d] rounded-xl text-red-400 text-[12px] -top-2 right-3">
                {errors.password.message}
              </span>
            )}
          </div>
          {logInError && (
            <div className="mx-auto text-red-500">
              <p>{logInError.message}</p>
            </div>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Link className="text-blue-400 hover:text-blue-500 ">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className="w-full py-3 disabled:opacity-30 disabled:pointer-events-none rounded-xl text-white font-semibold text-sm mt-1 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            }}
          >
            Log In
          </button>

          <div className="flex items-center gap-3 my-1">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#1e2d3d" }}
            />
            <span className="text-gray-600 text-xs uppercase tracking-widest">
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#1e2d3d" }}
            />
          </div>

          <button
            onClick={googleAuth}
            className="w-full py-3 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-3 transition-all hover:opacity-80"
            style={{
              backgroundColor: "#1a2535",
              border: "1px solid #1e2d3d",
            }}
          >
            <img
              src="https://www.google.com/favicon.ico"
              className="w-4 h-4"
              alt="google"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
