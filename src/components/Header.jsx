import { Link } from "react-router-dom";
import "../App.css";
import { Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <a href="https://geolab.edu.ge/" target="_blank">
          <img
            src="/assets/geolab-logo-blue.png"
            className="w-10 h-auto hover:scale-112 transition-transform ease-in 0.3s"
            alt="logo"
          />
        </a>
        <h2 className="font-mono font-bold">Traveloop Bookings</h2>
      </div>
      <div className="flex items-center gap-6">
        <nav>
          <ul className="flex items-center gap-8">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/destinations">Destinations</Link>
            </li>
            <li className="nav-item">
              <Link to="/hotels">Hotels</Link>
            </li>
            <li className="nav-item">
              <Link to="/bookings">My Bookings</Link>
            </li>
            <li className="nav-item flex gap-1 items-center">
              <Sun size={18} className="text-yellow-500" />
              <Link to="/weather">Weather</Link>
            </li>
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
