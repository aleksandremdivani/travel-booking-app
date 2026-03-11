import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";

export const FlightsPage = () => {
  const {
    isLoading,
    destinationCity,
    originCity,
    flights,
    handleFlightSearch,
    originSearchRef,
    destinationSearchRef,
  } = useContext(DestinationsContext);
  return (
    <main className="h-auto border">
      <div className="border h-50">
        <input
          type="search"
          ref={destinationSearchRef}
          placeholder="Choose destination"
          className="dest-search w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
        />
        <input
          type="search"
          ref={originSearchRef}
          placeholder="Choose destination"
          className="dest-search w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
        />
        <div className="w-40/100">
          <DateRangePicker />
        </div>

        <button
          onClick={handleFlightSearch}
          className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          Search
        </button>
      </div>
      <div>
        {/* {flights.map((item) => (
            <p>{}</p>
        ))} */}
      </div>
    </main>
  );
};
