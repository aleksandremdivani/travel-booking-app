import { Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const NavItem = ({ label, isTransparent, link }) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li className="nav-item flex">
      {label === "Weather" && <Sun className="mr-1 text-yellow-500" /> }
      <Link
        to={link}
        className={`flex ${
          isActive
            ? isTransparent
              ? "text-black"
              : "text-blue-500"
            : isTransparent
              ? "text-white"
              : "text-black"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};
