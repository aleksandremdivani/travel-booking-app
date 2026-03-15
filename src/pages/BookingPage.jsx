import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { HotelBtn } from "../components/HotelBtn";

export const BookingPage = () => {
  const {
    destinationSearchRef,
    handleHotelSearch,
    hotelOffers,
    weather,
    destinationCity,
    isLoading,
    selectedHotels,
    activities,
    totalPrice,
    booked,
    handleBooking,
    calculateTotalStayPrice,
    getConvertRate,
  } = useContext(DestinationsContext);

  const truncateByWords = (text, maxLength = 150) => {
    if (!text) return "";
    const plainText = text.replace(/<[^>]+>/g, "");
    if (plainText.length <= maxLength) return plainText;
    const truncated = plainText.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return truncated.slice(0, lastSpace) + "...";
  };
  return (
    <main className="pb-5">
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
      <section className="h-auto w-full flex items-center flex-col gap-6">
        <div className="border-b w-full p-4">
          {selectedHotels.length === 0 ? (
            <p>Select Hotel :</p>
          ) : (
            <p>Selected hotels:</p>
          )}
        </div>

        <div className="flex flex-col gap-6 w-95/100 items-center">
          {!hotelOffers && (
            <div>
              <p>Search for hotels to see results</p>
            </div>
          )}

          {hotelOffers && hotelOffers.length === 0 && !isLoading && (
            <p>No hotels found</p>
          )}
          {isLoading && <Loader size={40} />}
          {hotelOffers &&
            destinationCity &&
            selectedHotels.length === 0 &&
            !isLoading &&
            hotelOffers.slice(0, 3).map((item) => {
              const isSelected = selectedHotels.find(
                (i) => i.hotel.hotelId === item.hotel.hotelId,
              );
              const nightlyUSD = Math.round(
                (item.offers[0].price.base || item.offers[0].price.total) *
                  getConvertRate(item),
              );
              return (
                <div
                  key={item.hotel.hotelId}
                  className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 w-full h-[400px] flex sm:h-[200px] border border-gray-300"
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
                      <div>
                        <p>
                          From
                          <span className="text-[18px] font-bold ms-2">
                            {nightlyUSD} USD
                          </span>
                          /Night
                        </p>
                        <p className="text-blue-600 font-bold">
                          Total:{" "}
                          {calculateTotalStayPrice(
                            item.offers[0].checkInDate,
                            item.offers[0].checkOutDate,
                            nightlyUSD,
                          )}{" "}
                          USD
                        </p>
                      </div>
                      <HotelBtn isSelected={isSelected} item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          {selectedHotels.length > 0 &&
            destinationCity &&
            weather &&
            selectedHotels.map((item) => {
              const isSelected = selectedHotels.find(
                (i) =>
                  i.hotel.hotelId === item.hotel.hotelId &&
                  i.offers[0].checkInDate === item.offers[0].checkInDate,
              );
              const nightlyUSD = Math.round(
                (item.offers[0].price.base || item.offers[0].price.total) *
                  getConvertRate(item),
              );
              return (
                <div
                  key={item.hotel.hotelId}
                  className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 w-full h-[400px] flex sm:h-[200px] border border-gray-300"
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
                        📍 {destinationCity.toUpperCase()},{weather.sys.country}
                      </p>
                      <p>
                        {item.offers[0].checkInDate}-
                        {item.offers[0].checkOutDate}
                      </p>
                    </div>
                    <div className="flex justify-between w-full items-center pe-4 pb-5">
                      <div>
                        <p>
                          From
                          <span className="text-[18px] font-bold ms-2">
                            {nightlyUSD} USD
                          </span>
                          /Night
                        </p>
                        <p className="text-blue-600 font-bold">
                          Total:{" "}
                          {calculateTotalStayPrice(
                            item.offers[0].checkInDate,
                            item.offers[0].checkOutDate,
                            nightlyUSD,
                          )}{" "}
                          USD
                        </p>
                      </div>
                      <HotelBtn isSelected={isSelected} item={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          {hotelOffers && !isLoading && (
            <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
              <Link to="/hotels">See hotels</Link>
            </button>
          )}
        </div>
      </section>
      <section className="flex flex-col items-center p-4 gap-4">
        {destinationCity && <h3>Tours and activities in {destinationCity}</h3>}
        <div className="w-8/10 flex gap-5 flex-wrap justify-center">
          {activities &&
            activities.slice(0, 3).map((item) => (
              <>
                <div
                  key={item.id}
                  className="md:w-48/100 border border-gray-300 hover:scale-101 transition all duration-300 ease-in-out shadow-lg min-h-[440px]  rounded-xl w-full xl:w-30/100"
                >
                  <div
                    className="min-h-50 rounded-t-xl shadow-lg"
                    style={{
                      backgroundImage: `url(${item.pictures[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="p-2 flex flex-col justify-between min-h-60">
                    <div className="flex flex-col gap-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.shortDescription ? (
                        <p>{truncateByWords(item.shortDescription)}</p>
                      ) : (
                        <p>{truncateByWords(item.description)}</p>
                      )}
                    </div>
                    <div className="w-full flex justify-end">
                      <button className="shadow-lg active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                        <Link to={`/tours&activities/activity/${item.id}`}>
                          View Details
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
        {activities.length > 0 && (
          <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
            <Link to="/tours&activities">See All</Link>
          </button>
        )}
      </section>
      <section className="px-5 pb-5 flex flex-col items-center gap-4">
        {weather && (
          <>
            <div
              className="w-full h-[400px] rounded-2xl shadow-xl relative"
              style={{
                backgroundImage: `url(/assets/main-image.avif)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="lg:w-4/10 w-full sm:bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 h-full flex flex-col gap-3">
                <h2 className="text-[40px] font-bold text-white">
                  {weather.name}, {weather.sys.country}
                </h2>
                <div>
                  <p className="text-[60px] font-semibold">
                    {Math.round(weather.main.temp)}℃
                  </p>
                  <p className="text-[30px] font-semibold">
                    {weather.weather[0].description}
                  </p>
                </div>

                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  className="w-30 mx-auto"
                  alt={`${weather.name}`}
                />
              </div>
            </div>
            <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
              <Link to="/weather">See full weather</Link>
            </button>
          </>
        )}
      </section>
      <section className="w-full flex-col items-center lg:flex-row border-t p-4 flex justify-between">
        <div className="flex items-center justify-center gap-3">
          <h3 className="text-2xl font-semibold">Final Price : </h3>
          <p className="text-2xl">{totalPrice} USD</p>
        </div>
        <button
          onClick={handleBooking}
          className="w-full lg:px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70"
        >
          Book Now
        </button>
        {booked && (
          <p className="text-green-500">
            succesfully booked ✅ go to{" "}
            <Link className="text-blue-500" to="/bookings">
              My Bookings
            </Link>
          </p>
        )}
      </section>
    </main>
  );
};
