import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";

export const HotelsPage = () => {
  const { inputRef, handleSearch, hotelsList } =
    useContext(DestinationsContext);
  return (
    <main className="flex flex-col h-180 gap-3 px-4">
      <div className="px-3 gap-3 rounded-xl border w-full max-w-90/100 h-20 flex bg-orange-400 flex items-center">
        <input
          type="search"
          ref={inputRef}
          placeholder="Choose destination"
          className="w-4/10 h-12 px-4 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
        />
        <div className="w-40/100">
          <DateRangePicker />
        </div>
        <button
          onClick={handleSearch}
          className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          Search
        </button>
      </div>
      <div className="h-88/100 border-green-500 border w-full">
        {hotelsList.map((item) => (
          <div key={item.hotelId}>
            <h2>{item.name}</h2>
            <p>{item.hotelId}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
