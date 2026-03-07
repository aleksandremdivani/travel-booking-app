import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { NavItem } from "./NavItem";

const Header = () => {
  const location = useLocation();

  const isTransparent = location.pathname === "/weather";
  return (
    <header
      className={`px-4 h-20 flex items-center justify-between w-full
  ${isTransparent ? "absolute" : "bg-white"}`}
    >
      <div className="flex items-center gap-x-2">
        <a href="https://geolab.edu.ge/" target="_blank">
          <img
            src="/assets/geolab-logo-blue.png"
            className="w-10 h-auto hover:scale-112 transition-transform ease-in 0.3s"
            alt="logo"
          />
        </a>
        <h2
          className={`font-mono font-bold
          ${isTransparent ? "text-white" : "text-black"}`}
        >
          Traveloop Bookings
        </h2>
      </div>
      <div className="flex items-center gap-6">
        <nav>
          <ul className="flex items-center gap-8">
            <NavItem link={"/"} label={"Home"} isTransparent={isTransparent} />
            <NavItem
              link={"/hotels"}
              label={"Hotels"}
              isTransparent={isTransparent}
            />
            <NavItem
              link={"/bookings"}
              label={"My Bookings"}
              isTransparent={isTransparent}
            />
            <NavItem
              link={"/weather"}
              label={"Weather"}
              isTransparent={isTransparent}
            />
          </ul>
        </nav>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
          Book Now
        </button>
      </div>
    </header>
  );
};

export default Header;
