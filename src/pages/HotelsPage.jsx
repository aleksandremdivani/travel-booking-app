import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { Heart, Loader, Loader2 } from "lucide-react";
import { HotelBtn } from "../components/HotelBtn";

export const HotelsPage = () => {
  const {
    destinationSearchRef,
    handleHotelSearch,
    hotelOffers,
    weather,
    isLoading,
    destinationCity,
    handleHotelSelect,
    selectedHotels,
  } = useContext(DestinationsContext);
  return (
    <main className="flex flex-col h-auto gap-3">
      <div className="w-full flex justify-center bg-gray-200 py-5">
        <div className="gap-3 rounded-xl w-full max-w-95/100 justify-center flex flex-col md:flex-row  items-center">
          <input
            type="search"
            ref={destinationSearchRef}
            placeholder="Choose destination"
            className="dest-search w-6/10  lg:w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
          />
          <div className="w-6/10  lg:w-4/10">
            <DateRangePicker />
          </div>

          <button
            onClick={handleHotelSearch}
            className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Search
          </button>
        </div>
      </div>
      <div className="h-auto w-full flex items-center flex-col gap-6 ">
        {hotelOffers && !isLoading && destinationCity && (
          <div className="border-b w-full p-4">
            <p>
              Showing {hotelOffers.length} available hotels in {destinationCity}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-6 w-95/100 ">
          {!hotelOffers && (
            <div className="h-200">
              <p>Search for hotels to see results</p>
            </div>
          )}

          {hotelOffers && hotelOffers.length === 0 && !isLoading && (
            <p>No hotels found</p>
          )}
          {isLoading && <Loader size={40} />}
          {hotelOffers &&
            destinationCity &&
            !isLoading &&
            hotelOffers.map((item) => {
              const isSelected = selectedHotels.find(
                (i) => i.hotel.hotelId === item.hotel.hotelId,
              );

              return (
                <div
                  key={item.hotel.hotelId}
                  className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 h-[400px] flex sm:h-[200px] border border-gray-300"
                >
                  <div
                    className="sm:h-full h-5/10 w-full sm:w-33/100 rounded-s-xl"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/${item.hotel.hotelId}/600/400)`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="pt-3 ps-5 w-full sm:max-w-67/100 flex flex-col justify-between">
                    <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
                    <div>
                      <p>
                        📍 {destinationCity.toUpperCase()},{" "}
                        {weather.sys.country}
                      </p>
                      <p>
                        {item.offers[0].checkInDate}-
                        {item.offers[0].checkOutDate}
                      </p>
                    </div>
                    <div className="flex justify-between w-full items-center pe-4 pb-5">
                      <p>
                        From
                        <span className="text-[18px] font-bold ms-2">
                          {item.offers[0].price.base
                            ? item.offers[0].price.base
                            : Math.round(item.offers[0].price.total)}

                          {item.offers[0].price.currency}
                        </span>
                        /Night
                      </p>
                     <HotelBtn isSelected={isSelected} item={item}/>
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
