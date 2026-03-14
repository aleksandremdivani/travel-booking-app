import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { NavItem } from "./NavItem";
import { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isTransparent = location.pathname === "/weather" || "/tours&activities";
  return (
    <>
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
          <nav className="header-nav">
            <ul className="flex items-center gap-8">
              <NavItem
                link={"/"}
                label={"Home"}
                isTransparent={isTransparent}
              />
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
              link={"/tours&activities"}
              label={"Tours And Activities"}
              isTransparent={isTransparent}
              />

              <NavItem
                link={"/weather"}
                label={"Weather"}
                isTransparent={isTransparent}
              />
            </ul>
          </nav>
          <button className="hidden sm:block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
            Book Now
          </button>
        </div>
        <div
          className={`menu ${isOpen && "invisible"}`}
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </div>
      </header>
      {/* {isOpen && (
        <div className="fixed inset-0 flex">
          <aside
            className={`w-64 h-full bg-black text-white p-4
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            menu
          </aside>

          <div
            className="flex-1 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )} */}
      <div className={`fixed inset-0 flex z-2 ${!isOpen && "pointer-events-none"}`}>
        <aside
          className={`w-64 h-full p-4 bg-white
    transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button onClick={() => setIsOpen(false)}>x</button>
          <div className="flex items-center gap-6 flex-col">
            <nav>
              <ul className="flex flex-col items-center gap-8">
                <NavItem
                  link={"/"}
                  label={"Home"}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavItem
                  link={"/hotels"}
                  label={"Hotels"}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavItem
                  link={"/bookings"}
                  label={"My Bookings"}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <NavItem
                  link={"/weather"}
                  label={"Weather"}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </ul>
            </nav>
            <button className="sm:hidden block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
              Book Now
            </button>
          </div>
        </aside>
        <div
          className={`flex-1 bg-black/20 transition-opacity duration-300
    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
          onMouseDown={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};

export default Header;
