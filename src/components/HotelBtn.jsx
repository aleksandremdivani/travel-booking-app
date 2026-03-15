import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

export const HotelBtn = ({ isSelected, item }) => {
  const { handleHotelSelect } = useContext(DestinationsContext);

  return (
    <button
      onClick={() => handleHotelSelect(item)}
      className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300
        ${isSelected ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}
        active:opacity-70`}
    >
      {isSelected ? "Cancel" : "Select"}
    </button>
  );
};
