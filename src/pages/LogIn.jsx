import { LogInIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LogIn = () => {
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
        <div className="flex flex-col gap-4">
          {/* Name row */}
          <input
            type="email"
            placeholder="Email address or Username"
            className="px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
            style={{
              backgroundColor: "#1a2535",
              border: "1px solid #1e2d3d",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #3b82f6")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #1e2d3d")
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl text-white text-sm placeholder-gray-600 outline-none transition-all"
            style={{
              backgroundColor: "#1a2535",
              border: "1px solid #1e2d3d",
            }}
            onFocus={(e) =>
              (e.target.style.border = "1px solid #3b82f6")
            }
            onBlur={(e) =>
              (e.target.style.border = "1px solid #1e2d3d")
            }
          />

          <div className="flex items-center gap-2 mt-1">
            <Link className="text-blue-400 hover:text-blue-500 ">Forgot Password?</Link>
          </div>

          <button
            className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-1 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            }}
          >
            Log In
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px" style={{ backgroundColor: "#1e2d3d" }} />
            <span className="text-gray-600 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#1e2d3d" }} />
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
        </div>
      </div>
    </div>
  );
};

export default LogIn;