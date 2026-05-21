// import { useContext } from "react";
// import { DestinationsContext } from "../context/DestinationsContext";
// import DateRangePicker from "../components/DateRangePicker";
// import { Loader } from "lucide-react";
// import { Link } from "react-router-dom";
// import { HotelBtn } from "../components/HotelBtn";

// export const BookingPage = () => {
//   const {
//     destinationSearchRef,
//     handleHotelSearch,
//     hotelOffers,
//     weather,
//     destinationCity,
//     isLoading,
//     selectedHotels,
//     activities,
//     totalPrice,
//     booked,
//     handleBooking,
//     calculateTotalStayPrice,
//     getConvertRate,
//   } = useContext(DestinationsContext);

//   const truncateByWords = (text, maxLength = 150) => {
//     if (!text) return "";
//     const plainText = text.replace(/<[^>]+>/g, "");
//     if (plainText.length <= maxLength) return plainText;
//     const truncated = plainText.slice(0, maxLength);
//     const lastSpace = truncated.lastIndexOf(" ");
//     return truncated.slice(0, lastSpace) + "...";
//   };
//   return (
//     <main className="pb-5">
//       <div className="w-full flex justify-center bg-gray-200 py-5">
//         <div className="gap-3 rounded-xl w-full max-w-95/100 justify-center flex flex-col md:flex-row  items-center">
//           <input
//             type="search"
//             ref={destinationSearchRef}
//             placeholder="Choose destination"
//             className="dest-search w-6/10  lg:w-4/10 h-12 px-12 border border-gray-300 rounded-xl shadow-sm
//         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
//         hover:border-gray-400 transition text-gray-700 bg-white"
//           />
//           <div className="w-6/10  lg:w-4/10">
//             <DateRangePicker />
//           </div>

//           <button
//             onClick={handleHotelSearch}
//             className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       <section className="h-auto w-full flex items-center flex-col gap-6">
//         <div className="border-b w-full p-4">
//           {selectedHotels.length === 0 ? (
//             <p>Select Hotel :</p>
//           ) : (
//             <p>Selected hotels:</p>
//           )}
//         </div>

//         <div className="flex flex-col gap-6 w-95/100 items-center">
//           {!hotelOffers && (
//             <div>
//               <p>Search for hotels to see results</p>
//             </div>
//           )}

//           {hotelOffers && hotelOffers.length === 0 && !isLoading && (
//             <p>No hotels found</p>
//           )}
//           {isLoading && <Loader size={40} />}
//           {hotelOffers &&
//             destinationCity &&
//             selectedHotels.length === 0 &&
//             !isLoading &&
//             hotelOffers.slice(0, 3).map((item) => {
//               const isSelected = selectedHotels.find(
//                 (i) => i.hotel.hotelId === item.hotel.hotelId,
//               );
//               const nightlyUSD = Math.round(
//                 (item.offers[0].price.base || item.offers[0].price.total) *
//                   getConvertRate(item),
//               );
//               return (
//                 <div
//                   key={item.hotel.hotelId}
//                   className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 w-full h-[400px] flex sm:h-[200px] border border-gray-300"
//                 >
//                   <div
//                     className="sm:h-full h-5/10 w-full sm:w-33/100 rounded-s-xl"
//                     style={{
//                       backgroundImage: `url(https://picsum.photos/seed/${item.hotel.hotelId}/600/400)`,
//                       backgroundPosition: "center",
//                       backgroundRepeat: "no-repeat",
//                       backgroundSize: "cover",
//                     }}
//                   ></div>
//                   <div className="pt-3 ps-5 w-full sm:max-w-67/100 flex flex-col justify-between">
//                     <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
//                     <div>
//                       <p>
//                         📍 {destinationCity.toUpperCase()},{" "}
//                         {weather.sys.country}
//                       </p>
//                       <p>
//                         {item.offers[0].checkInDate}-
//                         {item.offers[0].checkOutDate}
//                       </p>
//                     </div>
//                     <div className="flex justify-between w-full items-center pe-4 pb-5">
//                       <div>
//                         <p>
//                           From
//                           <span className="text-[18px] font-bold ms-2">
//                             {nightlyUSD} USD
//                           </span>
//                           /Night
//                         </p>
//                         <p className="text-blue-600 font-bold">
//                           Total:{" "}
//                           {calculateTotalStayPrice(
//                             item.offers[0].checkInDate,
//                             item.offers[0].checkOutDate,
//                             nightlyUSD,
//                           )}{" "}
//                           USD
//                         </p>
//                       </div>
//                       <HotelBtn isSelected={isSelected} item={item} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           {selectedHotels.length > 0 &&
//             destinationCity &&
//             weather &&
//             selectedHotels.map((item) => {
//               const isSelected = selectedHotels.find(
//                 (i) =>
//                   i.hotel.hotelId === item.hotel.hotelId &&
//                   i.offers[0].checkInDate === item.offers[0].checkInDate,
//               );
//               const nightlyUSD = Math.round(
//                 (item.offers[0].price.base || item.offers[0].price.total) *
//                   getConvertRate(item),
//               );
//               return (
//                 <div
//                   key={item.hotel.hotelId}
//                   className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-105 hover:shadow-2xl ease transition:all duration-500 w-full h-[400px] flex sm:h-[200px] border border-gray-300"
//                 >
//                   <div className="sm:h-full h-5/10 w-full sm:w-33/100 rounded-s-xl">
//                     <img
//                       src={`https://picsum.photos/seed/${item.hotel.hotelId}/300/200.webp`}
//                       width="300"
//                       height="200"
//                       loading="lazy"
//                       className="w-full h-full object-cover rounded-l-xl"
//                     />
//                   </div>
//                   <div className="pt-3 ps-5 w-full sm:max-w-67/100 flex flex-col justify-between">
//                     <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
//                     <div>
//                       <p>
//                         📍 {destinationCity.toUpperCase()},{weather.sys.country}
//                       </p>
//                       <p>
//                         {item.offers[0].checkInDate}-
//                         {item.offers[0].checkOutDate}
//                       </p>
//                     </div>
//                     <div className="flex justify-between w-full items-center pe-4 pb-5">
//                       <div>
//                         <p>
//                           From
//                           <span className="text-[18px] font-bold ms-2">
//                             {nightlyUSD} USD
//                           </span>
//                           /Night
//                         </p>
//                         <p className="text-blue-600 font-bold">
//                           Total:{" "}
//                           {calculateTotalStayPrice(
//                             item.offers[0].checkInDate,
//                             item.offers[0].checkOutDate,
//                             nightlyUSD,
//                           )}{" "}
//                           USD
//                         </p>
//                       </div>
//                       <HotelBtn isSelected={isSelected} item={item} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           {hotelOffers && !isLoading && (
//             <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
//               <Link to="/hotels">See hotels</Link>
//             </button>
//           )}
//         </div>
//       </section>
//       <section className="flex flex-col items-center p-4 gap-4">
//         {destinationCity && <h3>Tours and activities in {destinationCity}</h3>}
//         <div className="w-8/10 flex gap-5 flex-wrap justify-center">
//           {activities &&
//             activities.slice(0, 3).map((item) => (
//               <>
//                 <div
//                   key={item.id}
//                   className="md:w-48/100 border border-gray-300 hover:scale-101 transition all duration-300 ease-in-out shadow-lg min-h-[440px]  rounded-xl w-full xl:w-30/100"
//                 >
//                   <div
//                     className="min-h-50 rounded-t-xl shadow-lg"
//                     style={{
//                       backgroundImage: `url(${item.pictures[0]})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                     }}
//                   ></div>
//                   <div className="p-2 flex flex-col justify-between min-h-60">
//                     <div className="flex flex-col gap-4">
//                       <h3 className="font-semibold">{item.name}</h3>
//                       {item.shortDescription ? (
//                         <p>{truncateByWords(item.shortDescription)}</p>
//                       ) : (
//                         <p>{truncateByWords(item.description)}</p>
//                       )}
//                     </div>
//                     <div className="w-full flex justify-end">
//                       <button className="shadow-lg active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
//                         <Link to={`/tours&activities/activity/${item.id}`}>
//                           View Details
//                         </Link>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ))}
//         </div>
//         {activities.length > 0 && (
//           <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
//             <Link to="/tours&activities">See All</Link>
//           </button>
//         )}
//       </section>
//       <section className="px-5 pb-5 flex flex-col items-center gap-4">
//         {weather && (
//           <>
//             <div
//               className="w-full h-[400px] rounded-2xl shadow-xl relative"
//               style={{
//                 backgroundImage: `url(/assets/main-image.avif)`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="lg:w-4/10 w-full sm:bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 h-full flex flex-col gap-3">
//                 <h2 className="text-[40px] font-bold text-white">
//                   {weather.name}, {weather.sys.country}
//                 </h2>
//                 <div>
//                   <p className="text-[60px] font-semibold">
//                     {Math.round(weather.main.temp)}℃
//                   </p>
//                   <p className="text-[30px] font-semibold">
//                     {weather.weather[0].description}
//                   </p>
//                 </div>

//                 <img
//                   src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
//                   className="w-30 mx-auto"
//                   alt={`${weather.name}`}
//                 />
//               </div>
//             </div>
//             <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70">
//               <Link to="/weather">See full weather</Link>
//             </button>
//           </>
//         )}
//       </section>
//       <section className="w-full flex-col items-center lg:flex-row border-t p-4 flex justify-between">
//         <div className="flex items-center justify-center gap-3">
//           <h3 className="text-2xl font-semibold">Final Price : </h3>
//           <p className="text-2xl">{totalPrice} USD</p>
//         </div>
//         <button
//           onClick={handleBooking}
//           className="w-full lg:w-30 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 active:opacity-70"
//         >
//           Book Now
//         </button>
//         {booked && (
//           <p className="text-green-500">
//             succesfully booked ✅ go to{" "}
//             <Link className="text-blue-500" to="/bookings">
//               My Bookings
//             </Link>
//           </p>
//         )}
//       </section>
//     </main>
//   );
// };

import React, { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import { ArrowRight, Bed } from "lucide-react";
import { differenceInDays } from "date-fns";

const BookingPage = () => {
  const { selectedRooms, handleRoomSelection } = useContext(DestinationsContext);

  const getStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  const hotelFullPrice = selectedRooms.map((hotel) => {
    const eachHotelPrice = hotel.selectedRooms.reduce((sum, item) => {
      const nights = differenceInDays(new Date(item.check_out), new Date(item.check_in));
      const price = Math.round(item.rates?.[0]?.retailRate?.total?.[0]?.amount);
      return Math.round(price * nights) + sum;
    }, 0);
    return { ...hotel, eachHotelPrice };
  });

  const totalPrice = hotelFullPrice.reduce((sum, item) => item.eachHotelPrice + sum, 0);

  return (
    <main className="bg-[#FCFCFC] text-[#111111] border-t">
      <div className="max-w-[1280px] px-10 pt-10 pb-20 flex gap-8 items-start">

        {/* left */}
        <section className="flex-1 border border-black/20 rounded-lg">
          {selectedRooms?.map((hotel) => (
            <div key={hotel.id} className="rounded-2xl border border-[#E7E7E7] bg-[#FAFAFA] p-6 w-full flex flex-col">
              <div className="w-full flex py-2 gap-x-3">
                <img className="w-36 min-w-36 h-22 rounded-md object-cover" src={hotel.main_photo} alt="No photo" />
                <div className="flex flex-1">
                  <div className="max-w-100">
                    <h2 className="text-[20px] font-semibold">{hotel.name}</h2>
                    <p className="capitalize">{hotel.city}, {hotel.country}</p>
                  </div>
                  <div className="justify-end items-start flex h-full flex-1">
                    <p>{getStars(hotel.starRating)}</p>
                  </div>
                </div>
              </div>
              <div>
                <p>SELECTED ROOMS</p>
                {hotel?.selectedRooms?.map((item) => {
                  const name = item.roomDetail?.roomName || item.rates?.[0]?.name || "Room";
                  const board = item.rates?.[0]?.boardName;
                  const nights = differenceInDays(new Date(item.check_out), new Date(item.check_in));
                  const price = Math.round(item.rates?.[0]?.retailRate?.total?.[0]?.amount);
                  const checkIn = new Date(item.check_in).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  const checkOut = new Date(item.check_out).toLocaleDateString("en-US", { month: "short", day: "numeric" });

                  return (
                    <div key={item.roomTypeId} className="hover:bg-gray-50 flex items-stretch justify-between rounded-[14px] border border-[#E8E8E8] bg-white px-5 py-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ECECEC] bg-[#FAFAFA]">
                          <Bed className="h-5 w-5 text-[#6B7280]" />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-[17px] font-medium text-[#111111]">{name}</h3>
                            <p className="mt-1 text-[14px] text-[#6B7280]">{board}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg border border-[#E7E7E7] bg-[#FAFAFA] px-3 py-2 text-[13px] text-[#4B5563]">{checkIn}</div>
                            <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                            <div className="rounded-lg border border-[#E7E7E7] bg-[#FAFAFA] px-3 py-2 text-[13px] text-[#4B5563]">{checkOut}</div>
                            <span className="ml-2 text-[13px] text-[#6B7280]">{nights} Nights</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex h-full min-h-[120px] flex-col items-end justify-between pl-8">
                        <span className="text-[18px] font-medium text-[#111111] whitespace-nowrap">{price * nights} $</span>
                        <button onClick={() => handleRoomSelection(item, hotel)} className="h-11 px-5 rounded-xl border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#4B5563] transition-colors hover:bg-[#F8F8F8] hover:text-[#111111]">
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* right - summary */}
        <aside className="w-80 sticky top-8 rounded-2xl border border-[#E7E7E7] bg-[#FAFAFA] p-6">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">Price summary</span>
          <h2 className="mt-3 text-[24px] leading-tight font-medium text-[#111111]">Booking total</h2>

          <div className="mt-8 space-y-4">
            {hotelFullPrice.map((hotel) => (
              <div key={hotel.id} className="flex items-start justify-between gap-6">
                <p className="text-[15px] text-[#111111]">{hotel.name}</p>
                <span className="text-[15px] text-[#111111] whitespace-nowrap">${hotel.eachHotelPrice}</span>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-[#E5E7EB]" />

          <div className="flex items-center justify-between">
            <span className="text-[15px] text-[#6B7280]">Total</span>
            <span className="text-[28px] font-medium tracking-[-0.03em] text-[#111111]">${totalPrice}</span>
          </div>

          <button className="mt-8 h-14 w-full rounded-xl bg-[#111111] text-[15px] font-medium text-white transition-colors hover:bg-black">
            Confirm booking
          </button>
        </aside>

      </div>
    </main>
  );
};

export default BookingPage;
