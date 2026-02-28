import { Link } from "react-router-dom";
import '../App.css';

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <a href="https://geolab.edu.ge/" target="_blank">
          <img
            src="/assets/geolab-logo-blue.png"
            className="w-11 h-14"
            alt="logo"
          />
        </a>
        <h2 className="font-mono font-bold">Traveloop Bookings</h2>
      </div>
      <nav>
        <ul className="flex items-center gap-x-6">
          <li className="nav-item">
            <a href="#">
            Destinations
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
            My Bookings
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
            Weather
            </a>
          </li>
        </ul>
      </nav>
      <button className="cursor-pointer border w-30 h-10 rounded-lg text-white bg-blue-600">Book Now</button>
    </header>
  );
};

export default Header;
