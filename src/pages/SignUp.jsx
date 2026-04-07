import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(name, value);
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

      {/* Right - Form */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center px-12 py-16"
        style={{ backgroundColor: "#0f1923" }}
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
        <form className="flex flex-col gap-4">
          {/* Name row */}
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: "#1a2535",
                border: "1px solid #1e2d3d",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
            />
            <input
              type="text"
              onChange={handleChange}
              name="lastName"
              value={form.lastName}
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
              style={{
                backgroundColor: "#1a2535",
                border: "1px solid #1e2d3d",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
              onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
            />
          </div>

          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email address"
            className="px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
            style={{
              backgroundColor: "#1a2535",
              border: "1px solid #1e2d3d",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
            onBlur={(e) => (e.target.style.border = "1px solid #1e2d3d")}
          />
          <div className="relative">
            <input
              type={passwordIsShown ? "password" : "text"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
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
              {passwordIsShown ? <Eye /> : <EyeOff />}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500 rounded"
            />
            <label className="text-gray-500 text-sm">
              I agree to the{" "}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                Terms & Conditions
              </span>
            </label>
          </div>

          <button
            className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            }}
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

export default SignUp;
