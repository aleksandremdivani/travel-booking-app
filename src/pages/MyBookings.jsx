import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

export const MyBookings = () => {
  const {
    bookings,
    setBookings,
    hotelOffers,
    getConvertRate,
    calculateTotalStayPrice,
  } = useContext(DestinationsContext);
  const cancelBooking = (hotel) => {
    setBookings((prev) => prev.filter((item) => item.id !== hotel.id));
  };
  return (
    <main className="bg-gray-300 flex items-center flex-col">
      <h1 className="font-bold text-2xl">My Bookings</h1>
      <section className="w-full p-4 lg:w-6/10 flex flex-col gap-5">
        {bookings &&
          bookings.map((item) => {
            const nightlyUSD = Math.round(
              (item.hotelData.offers[0].price.base ||
                item.hotelData.offers[0].price.total) *
                getConvertRate(item.hotelData),
            );
            return (
              <div
                key={item.id}
                className="rounded-xl shadow-xl bg-white flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 h-[400px] flex sm:h-[200px] border border-gray-300"
              >
                <div className="sm:h-full h-5/10 w-full rounded-t-xl sm:w-33/100 sm:rounded-s-xl">
                  <img
                    src={`https://picsum.photos/seed/${item.hotel.hotelId}/400/300.webp`}
                    width="300"
                    height="200"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-l-xl"
                  />
                </div>
                <div className="pt-3 ps-5 w-full h-5/10 sm:h-full sm:max-w-67/100 flex flex-col justify-between">
                  <h2 className="font-bold text-[18px]">
                    {item.hotelData.hotel.name}
                  </h2>
                  <div>
                    <p>
                      📍 {item.city.toUpperCase()}, {item.country}
                    </p>
                    <p>
                      {item.hotelData.offers[0].checkInDate}-
                      {item.hotelData.offers[0].checkOutDate}
                    </p>
                  </div>
                  <div className="flex justify-between w-full items-center pe-4 pb-5">
                    <p className="text-blue-600 font-bold">
                      Total:{" "}
                      {calculateTotalStayPrice(
                        item.hotelData.offers[0].checkInDate,
                        item.hotelData.offers[0].checkOutDate,
                        nightlyUSD,
                      )}{" "}
                      USD
                    </p>
                    <button
                      className="bg-red-500 px-10 h-10 text-white rounded-xl"
                      onClick={() => cancelBooking(item)}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {bookings.length === 0 && (
          <div className="w-full flex justify-center">
            <p>No bookings yet</p>
          </div>
        )}
      </section>
    </main>
  );
};
