import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import BookingBanner from "../components/BookingBanner";
import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

export const MainLayout = () => {
  const { selectedRooms } = useContext(DestinationsContext);
  const location = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {selectedRooms.length > 0 && location.pathname !== "/booking" && <BookingBanner />}
      <Footer />
    </>
  );
};
