import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";

export const Footer = () => {
  return (
    <footer className="py-7 flex justify-center border">
      <div className="flex w-80/100 justify-between gap-6 flex-col lg:flex-row md:items-stretch">
        <div className="lg:max-w-4/10">
          <div className="flex items-center gap-x-2">
            <a href="https://geolab.edu.ge/" target="_blank">
              <img
                src="/assets/geolab-logo-blue.png"
                className="w-10 h-12 hover:scale-112 transition-transform ease-in 0.3s"
                alt="logo"
              />
            </a>

            <h2 className="font-mono font-bold text-lg">Traveloop Bookings</h2>
          </div>
          <p>
            Traveloop Bookings aan sait spesbls, fastel booking aper mont. We
            caccatet you sprenning trip and witbmver reire nome tagblounts.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-lg">Quick links</h4>
          <nav>
            <ul className="flex flex-col list-disc">
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="hotels" className="hover:text-blue-500">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="tours&activities" className="hover:text-blue-500">
                  Tours & activities
                </Link>
              </li>
              <li>
                <Link to="bookings" className="hover:text-blue-500">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-blue-500">
                  Weather
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex gap-3 flex-col">
          <h4 className="font-bold text-lg">Customer Servicew</h4>
          <nav>
            <ul className="flex flex-col list-disc">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Support Center</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="font-bold text-lg">Follow Us</h4>
          <ul className="flex gap-2">
            <li>
              <img
                src="/assets/facebook-img.svg"
                className="w-9 rounded-md hover:scale-112"
                alt="facebook"
              />
            </li>
            <li>
              <img
                src="/assets/twitter-img.svg"
                className="w-9 hover:scale-112"
                alt="twitter"
              />
            </li>
            <li>
              <img
                src="/assets/instagram-img.svg"
                className="w-9 hover:scale-112"
                alt="instagram"
              />
            </li>
          </ul>
          <p>All rights reserved 2026 &copy;</p>
        </div>
      </div>
    </footer>
  );
};
