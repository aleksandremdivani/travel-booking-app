import React, { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingBanner = () => {
  const { selectedRooms } = useContext(DestinationsContext);
  const navigate = useNavigate()
  const roomCount = selectedRooms.reduce((sum, item) => {
    return item.selectedRooms.length + sum;
  }, 0);
  return (
    <div className="fixed px-5 bg-[#111111] py-5 rounded-xl bottom-[20px] left-[50%] -translate-x-[50%] flex items-center justify-between w-8/10">
      <div className="flex gap-3">
        <p className="bg-white rounded-[50%] px-2 font-semibold text-[#111111]">{roomCount}</p>
        <p className="text-white">Rooms selected</p>
      </div>
      <div className="text-white">
        <button onClick={() => navigate("/booking")} className="flex border p-4 rounded-xl hover:bg-white/10 active:scale-[0.95] hover:backdrop-blur-sm gap-x-2 items-center">
          Review booking <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default BookingBanner;
