import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { Loader, Loader2 } from "lucide-react";

export const HotelsPage = () => {
  const {
    inputRef,
    handleBookingSearch,
    hotelOffers,
    weather,
    isLoading,
    currentCity,
  } = useContext(DestinationsContext);
  return (
    <main className="flex flex-col h-180 gap-3">
      <div className="w-full flex justify-center">
        <div className="gap-3 rounded-xl w-full max-w-95/100 h-20 justify-center flex flex items-center">
          <input
            type="search"
            ref={inputRef}
            placeholder="Choose destination"
            className="dest-search w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
          />
          <div className="w-40/100">
            <DateRangePicker />
          </div>

          <button
            onClick={handleBookingSearch}
            className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Search
          </button>
        </div>
      </div>
      <div className="h-auto border-green-500 border w-full flex justify-center gap-3">
        <div className=" flex flex-col gap-3 w-95/100">
          {hotelOffers && !isLoading && currentCity && (
            <div>
              <p>
                Showing {hotelOffers.length} available hotels in {currentCity}
              </p>
            </div>
          )}
          {isLoading && <Loader />}
          {hotelOffers &&
            !isLoading &&
            hotelOffers.map((item) => (
              <div key={item.hotel.hotelId} className="border flex h-[200px]">
                <div
                  className="h-full w-33/100"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${item.hotel.hotelId}/600/400)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="pt-3 ps-5">
                  <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
                  <p>
                    📍 {currentCity.toUpperCase()}, {weather.sys.country}
                  </p>
                  <p>
                    {item.offers[0].checkInDate}-{item.offers[0].checkOutDate}
                  </p>
                  <p>
                    From
                    <span className="text-[18px] font-bold ms-2">{item.offers[0].price.base} {item.offers[0].price.currency} </span>
                    /Night
                  </p>
                  <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};
