import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase";
import { useState } from "react";
import { Link } from "react-router-dom";
import schema from "../validations/SignUpValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  // const [form, setForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const [passwordIsShown, setPasswordIsShown] = useState(false);

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
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    });
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    console.log("submitted");
  };
  const googleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });
  };
  return (
    <div className="min-h-screen flex">
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
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Log in
          </Link>
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name row */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                {...register("firstName")}
                placeholder="First Name *"
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
                style={{
                  backgroundColor: "#1a2535",
                  border: "1px solid #1e2d3d",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
                onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
              />
              {errors.firstName && (
                <span className="text-red-400 text-[12px]">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name *"
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
                style={{
                  backgroundColor: "#1a2535",
                  border: "1px solid #1e2d3d",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
                onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
              />
              {errors.lastName && (
                <span className="text-red-400 text-[12px] -top-2 right-3">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              placeholder="Email address *"
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

          {/* Password */}
          <div className="relative">
            <input
              type={!passwordIsShown ? "password" : "text"}
              {...register("password")}
              placeholder="Create a password *"
              className="px-4 w-full py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: "#1a2535",
                border: "1px solid #1e2d3d",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
            />
            <div
              onClick={() => setPasswordIsShown((prev) => !prev)}
              className="absolute top-[50%] right-[20px] text-white -translate-y-[50%]"
            >
              {!passwordIsShown ? <Eye /> : <EyeOff />}
            </div>
            {errors.password && (
              <span className="absolute px-3 bg-[#1e2d3d] text-red-400 text-[12px] -top-2 right-3">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Terms */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-500 rounded"
                {...register("terms")}
              />
              <p className="text-gray-500 text-sm">
                I agree to the{" "}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
              </p>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-[12px]">{errors.terms.message}</p>
            )}
          </div>

          <button
            className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1 transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          >
            Create account
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
            style={{ backgroundColor: "#1a2535", border: "1px solid #1e2d3d" }}
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

export default SignUp;
