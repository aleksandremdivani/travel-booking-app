import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { NavItem } from "./NavItem";
import { useContext, useState } from "react";
import { Menu, User2, UserCheck } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const isTransparent =
    location.pathname === "/weather" ||
    location.pathname === "/tours&activities";
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

        <div className="flex items-center gap-16">
          <nav className="header-nav hidden lg:block">
            <ul className="flex items-center gap-4">
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

          <div className="hidden sm:flex items-center gap-3 hidden">
            {!user && (
              <>
                <Link to="/login">
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-300
                ${isTransparent ? "border-white text-white hover:bg-white hover:text-black" : "border-blue-600 text-blue-600 hover:bg-blue-50"}`}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            {/* {user && <button onClick={() => setUser(null)}>click me</button>} */}

            {user && (
              <div className="flex items-center gap-3">
                <p className="capitalize">
                  {user.user_metadata.firstName || user.user_metadata.name}
                </p>
                <img
                  className="w-10 rounded-full border-2 border-gray-300"
                  src={
                    user.user_metadata.avatar_url || "/assets/user-icon2.svg"
                  }
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={`lg:hidden menu ${isOpen && "invisible"}`}
          onClick={() => setIsOpen(true)}
        >
          <Menu className={`${isTransparent ? "text-white" : "text-black"}`} />
        </div>
      </header>

      <div
        className={`fixed inset-0 flex z-2 ${!isOpen && "pointer-events-none"}`}
      >
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
                  link={"/tours&activities"}
                  label={"Tours And Activities"}
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
            <div className="flex flex-col gap-3 w-full px-4 sm:hidden">
              <Link to="/login">
                <button className="w-full px-4 py-2 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                  Sign Up
                </button>
              </Link>
            </div>
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
