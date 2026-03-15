import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { ArrowBigRightIcon, Loader } from "lucide-react";
import { HotelBtn } from "../components/HotelBtn";
import { Link } from "react-router-dom";

// 1. Simple Skeleton Component to stop Layout Shift
const HotelSkeleton = () => (
  <div className="rounded-xl bg-gray-100 animate-pulse w-full h-[400px] sm:h-[200px] flex flex-col sm:flex-row border border-gray-200">
    <div className="sm:h-full h-1/2 w-full sm:w-1/3 bg-gray-200" />
    <div className="p-5 flex-1 flex flex-col justify-between">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
    </div>
  </div>
);

export const HotelsPage = () => {
  const {
    destinationSearchRef,
    handleHotelSearch,
    hotelOffers,
    calculateTotalStayPrice,
    weather,
    isLoading,
    destinationCity,
    selectedHotels,
    getConvertRate,
  } = useContext(DestinationsContext);

  return (
    <main className="flex flex-col h-auto gap-3 mb-5">
      <div className="w-full flex justify-center bg-gray-200 py-5">
        <div className="gap-3 rounded-xl w-full max-w-95/100 justify-center flex flex-col md:flex-row items-center">
          <input
            type="search"
            ref={destinationSearchRef}
            placeholder="Choose destination"
            className="dest-search w-6/10 lg:w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white"
          />
          <div className="w-6/10 lg:w-4/10">
            <DateRangePicker />
          </div>
          <button
            onClick={handleHotelSearch}
            className="px-7 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      <div className="h-auto w-full flex items-center flex-col gap-6">
        <div className="border-b w-full p-4 flex justify-between min-h-[60px]">
          {hotelOffers && !isLoading && destinationCity && (
            <p>Showing {hotelOffers.length} hotels in {destinationCity}</p>
          )}
          {selectedHotels.length !== 0 && (
            <Link to="/booking" className="text-blue-500 flex items-center gap-2 font-semibold">
              Go to Booking <ArrowBigRightIcon />
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-6 w-95/100">
          {isLoading && (
            <>
              <HotelSkeleton />
              <HotelSkeleton />
              <HotelSkeleton />
            </>
          )}

          {!hotelOffers && !isLoading && (
            <div className="text-center py-20 text-gray-400">
              <p>Search for hotels to see results</p>
            </div>
          )}

          {hotelOffers && hotelOffers.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No hotels found</p>
          )}

          {hotelOffers && !isLoading &&
            hotelOffers.map((item) => {
              const isSelected = selectedHotels.find((i) => i.hotel.hotelId === item.hotel.hotelId);
              const nightlyUSD = Math.round((item.offers[0].price.base || item.offers[0].price.total) * getConvertRate(item));

              return (
                <div
                  key={item.hotel.hotelId}
                  className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 h-auto sm:h-[200px] flex border border-gray-300 overflow-hidden bg-white"
                >
                  <div className="sm:h-full h-[200px] w-full sm:w-33/100">
                    <img
                      src={`https://picsum.photos/seed/${item.hotel.hotelId}/400/300.webp`}
                      width="400"
                      height="300"
                      alt={item.hotel.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-3 ps-5 w-full sm:max-w-67/100 flex flex-col justify-between p-4">
                    <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
                    <div>
                      <p className="text-gray-600">📍 {destinationCity.toUpperCase()}, {weather?.sys?.country || ""}</p>
                      <p className="text-sm text-gray-400">{item.offers[0].checkInDate} to {item.offers[0].checkOutDate}</p>
                    </div>
                    <div className="flex justify-between w-full items-center pe-4 pb-2">
                      <div>
                        <p className="text-sm text-gray-500">From <span className="text-lg font-bold text-black">${nightlyUSD}</span>/night</p>
                        <p className="text-blue-600 font-bold">Total: ${calculateTotalStayPrice(item.offers[0].checkInDate, item.offers[0].checkOutDate, nightlyUSD)} USD</p>
                      </div>
                      <HotelBtn isSelected={isSelected} item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
};