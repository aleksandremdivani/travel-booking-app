// import { useContext, useRef, useState } from "react";
// import { DestinationsContext } from "../context/DestinationsContext";
// import DateRangePicker from "../components/DateRangePicker";
// import { ArrowBigRightIcon } from "lucide-react";
// import { HotelBtn } from "../components/HotelBtn";
// import { Link } from "react-router-dom";

// const HotelSkeleton = () => (
//   <div className="rounded-xl bg-gray-100 animate-pulse w-full h-[400px] sm:h-[200px] flex flex-col sm:flex-row border border-gray-200">
//     <div className="sm:h-full h-1/2 w-full sm:w-1/3 bg-gray-200" />
//     <div className="p-5 flex-1 flex flex-col justify-between">
//       <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
//       <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
//       <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
//     </div>
//   </div>
// );

// export const HotelsPage = () => {
//   const {
//     destinationSearchRef,
//     handleHotelSearch,
//     hotelOffers,
//     calculateTotalStayPrice,
//     weather,
//     isLoading,
//     destinationCity,
//     selectedHotels,
//     getConvertRate,
//     selectedPlace,
//     setSelectedPlace,
//     query,
//     setQuery,
//     places,
//     dates,
//     setDates,
//     setDateRange,
//     dateRange,
//     hotelsList,
//     hotelRates,
//     mergedHotels,
//   } = useContext(DestinationsContext);

//   const [isOpen, setIsOpen] = useState(false);
//   const selectedPlaceRef = useRef();

//   const handleSearch = () => {
//     if (!selectedPlaceRef.current || !dates[0] || !dates[1]) return;
//     setDateRange(dates);
//     setSelectedPlace(selectedPlaceRef.current);
//     selectedPlaceRef.current = null;
//     setDates([null, null]);
//     setQuery("");
//   };
//   // console.log("here", dateRange);
//   return (
//     <main className="flex flex-col h-auto gap-3 mb-5">
//       <div className="w-full flex justify-center bg-gray-200 py-5">
//         <div className="gap-3 rounded-xl w-full max-w-95/100 justify-center flex flex-col md:flex-row items-center">
//           <div className="relative w-6/10 lg:w-4/10">
//             <input
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setIsOpen(true);
//               }}
//               type="search"
//               placeholder="Choose destination"
//               className="dest-search w-full h-12 px-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-700 bg-white"
//             />
//             {isOpen && places.length > 0 && (
//               <div className="absolute z-10 bg-white border border-gray-200 rounded-xl shadow-lg w-full mt-1 max-h-60 overflow-y-auto">
//                 {places.map((place) => (
//                   <div
//                     key={place.placeId}
//                     onClick={() => {
//                       selectedPlaceRef.current = place;
//                       setQuery(place.displayName);
//                       setIsOpen(false);
//                     }}
//                     className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700"
//                   >
//                     <p className="font-medium">{place.displayName}</p>
//                     <p className="text-sm text-gray-400">
//                       {place.formattedAddress}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="w-6/10 lg:w-4/10">
//             <DateRangePicker />
//           </div>
//           <button
//             onClick={handleSearch}
//             className="px-7 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="h-auto w-full flex items-center flex-col gap-6">
//         <div className="border-b w-full p-4 flex justify-between min-h-[60px]">
//           {hotelOffers && !isLoading && destinationCity && (
//             <p>
//               Showing {hotelOffers.length} hotels in {destinationCity}
//             </p>
//           )}
//           {selectedHotels.length !== 0 && (
//             <Link
//               to="/booking"
//               className="text-blue-500 flex items-center gap-2 font-semibold"
//             >
//               Go to Booking <ArrowBigRightIcon />
//             </Link>
//           )}
//         </div>

//         <div className="flex flex-col gap-6 w-95/100">
//           {isLoading && (
//             <>
//               <HotelSkeleton />
//               <HotelSkeleton />
//               <HotelSkeleton />
//             </>
//           )}

//           {!hotelOffers && !isLoading && (
//             <div className="text-center py-20 text-gray-400">
//               <p>Search for hotels to see results</p>
//             </div>
//           )}

//           {hotelOffers && hotelOffers.length === 0 && !isLoading && (
//             <p className="text-center text-gray-500">No hotels found</p>
//           )}

//           {hotelOffers &&
//             !isLoading &&
//             hotelOffers.map((item) => {
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
//                   className="rounded-xl shadow-xl flex-col sm:flex-row hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 h-auto sm:h-[200px] flex border border-gray-300 overflow-hidden bg-white"
//                 >
//                   <div className="sm:h-full h-[200px] w-full sm:w-33/100">
//                     <img
//                       src={`https://picsum.photos/seed/${item.hotel.hotelId}/400/300.webp`}
//                       width="400"
//                       height="300"
//                       alt={item.hotel.name}
//                       loading="lazy"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="pt-3 ps-5 w-full sm:max-w-67/100 flex flex-col justify-between p-4">
//                     <h2 className="font-bold text-[18px]">{item.hotel.name}</h2>
//                     <div>
//                       <p className="text-gray-600">
//                         📍 {destinationCity.toUpperCase()},{" "}
//                         {weather?.sys?.country || ""}
//                       </p>
//                       <p className="text-sm text-gray-400">
//                         {item.offers[0].checkInDate} to{" "}
//                         {item.offers[0].checkOutDate}
//                       </p>
//                     </div>
//                     <div className="flex justify-between w-full items-center pe-4 pb-2">
//                       <div>
//                         <p className="text-sm text-gray-500">
//                           From{" "}
//                           <span className="text-lg font-bold text-black">
//                             ${nightlyUSD}
//                           </span>
//                           /night
//                         </p>
//                         <p className="text-blue-600 font-bold">
//                           Total: $
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
//         </div>
//       </div>
//     </main>
//   );
// };
import { useContext, useRef, useState } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { Link } from "react-router-dom";

const HotelSkeleton = () => (
  <div className="flex bg-white border-b border-gray-100 animate-pulse">
    <div className="w-36 min-w-36 h-28 bg-gray-200" />
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
      <div className="flex justify-between items-end">
        <div className="h-5 bg-gray-200 rounded w-20" />
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>
    </div>
  </div>
);

export const HotelsPage = () => {
  const {
    setSelectedPlace,
    query,
    setQuery,
    places,
    dates,
    setDates,
    setDateRange,
    isLoading,
    setIsLoading,
    hotelRates,
    mergedHotels,
    hotelsList,
    selectedPlace,
    isOpen,
    setIsOpen,
  } = useContext(DestinationsContext);

  const selectedPlaceRef = useRef();

  const handleSearch = () => {
    if (!selectedPlaceRef.current) return;
    setDateRange(dates);
    setSelectedPlace(selectedPlaceRef.current);
    selectedPlaceRef.current = null;
    setDates([null, null]);
    setQuery("");
    setIsLoading(true);
  };

  const getCheapestPrice = (roomTypes) => {
    if (!roomTypes?.length) return null;
    return Math.min(
      ...roomTypes.map((r) => r.offerRetailRate?.amount).filter(Boolean),
    );
  };
  const getStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Search bar */}
      <div className="w-full bg-white border-b border-gray-200 py-4 px-4 flex justify-center">
        <div className="flex gap-3 w-full max-w-4xl flex-col md:flex-row items-center">
          <div className="relative w-full md:flex-2">
            <img
              src="/assets/location-pin.svg"
              className="absolute top-1/2 -translate-y-1/2 w-9 left-[3px]"
            />
            {/* 🔍</span> */}
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              type="search"
              placeholder="Choose destination"
              className="w-full h-11 pl-9 pr-4 border border-gray-300 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            {isOpen && places.length > 0 && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-xl shadow-lg w-full mt-1 max-h-60 overflow-y-auto">
                {places.map((place) => (
                  <div
                    key={place.placeId}
                    onClick={() => {
                      selectedPlaceRef.current = place;
                      setQuery(place.displayName);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {place.displayName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {place.formattedAddress}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full md:flex-2">
            <DateRangePicker />
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-8 h-11 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 font-medium text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-white flex justify-between items-center">
        {mergedHotels?.length > 0 && !isLoading && (
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {mergedHotels.length} hotels
            </span>
            {hotelsList?.place?.displayName &&
              ` in ${hotelsList.place.displayName}`}
          </p>
        )}
      </div>

      {/* Cards list */}
      <div className="flex flex-col bg-white divide-y divide-gray-100 w-full max-w-4xl mx-auto mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {isLoading && (
          <>
            <HotelSkeleton />
            <HotelSkeleton />
            <HotelSkeleton />
            <HotelSkeleton />
          </>
        )}

        {!isLoading && !mergedHotels?.length && !selectedPlace && (
          <div className="text-center py-24 text-gray-400 text-sm">
            Search for a destination to see hotels
          </div>
        )}
        {!isLoading && !hotelRates && selectedPlace && (
          <div className="text-center py-24 text-gray-400 text-sm">
            No results found
          </div>
        )}
        {!isLoading &&
          mergedHotels?.map((item) => {
            const cheapest = getCheapestPrice(item.roomTypes);
            const cheapestRoom = item.roomTypes?.find(
              (r) => r.offerRetailRate?.amount === cheapest,
            );
            const boardName = cheapestRoom?.rates?.[0]?.boardName;
            const roomName = cheapestRoom?.rates?.[0]?.name;
            const hotel = item.hotel;

            if (!hotel) return null;

            return (
              <Link
                to={`/hotels/${item.hotelId}`}
                key={item.hotelId}
                className="flex hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                {hotel.thumbnail ? (
                  <img
                    src={hotel.thumbnail}
                    alt={hotel.name}
                    className="w-36 min-w-36 h-28 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-36 min-w-36 h-28 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {hotel.name}
                      </p>
                      <p className="text-xs text-yellow-500 mt-0.5">
                        {getStars(hotel.stars || 0)}
                      </p>
                      {roomName && (
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {roomName}
                        </p>
                      )}
                    </div>
                    {hotel.rating && (
                      <span className="text-xs font-medium px-2 py-1 rounded-lg bg-green-50 text-green-700 shrink-0">
                        {hotel.rating}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      {cheapest && (
                        <>
                          <span className="text-xs text-gray-400">from </span>
                          <span className="text-lg font-semibold text-gray-900">
                            ${Math.round(cheapest)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {" "}
                            / night
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {boardName && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                          {boardName}
                        </span>
                      )}
                      <span className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                        Select
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};
