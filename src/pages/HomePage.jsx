import "../App.css";
import { useContext } from "react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";
import { CalendarCheck, CircleDollarSign, CloudSun } from "lucide-react";
import { FeaturesCard } from "../components/FeaturesCard";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    destinations,
    setDestinationCity,
    destinationSearchRef,
    handleHotelSearch,
    setHotelOffers,
    setIsLoading,
    setQuery,
    isOpen,
    setIsOpen,
  } = useContext(DestinationsContext);
  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration in milliseconds
      once: false, // whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <>
      <main className="home-main h-140 justify-center flex items-center flex-col">
        <div className="h-100 w-full items-center flex flex-col justify-between">
          <div className="max-w-80/100 w-full flex flex-col items-start justify-start gap-3">
            <h1 className="text-white font-bold text-[50px] line-[0px]">
              Plan Your Perfect Trip!
            </h1>
            <p className="text-white font-semibold text-[20px]">
              Find and book amazing travel deals easily
            </p>
          </div>
          <form className="flex-col py-5 px-3 sm:flex-row gap-3 rounded-xl border w-full max-w-90/100 min-h-20 flex bg-orange-400 flex items-center">
            <input
              type="search"
              ref={destinationSearchRef}
              placeholder="Choose destination"
              className="dest-search w-7/10 sm:w-4/10 h-12 px-11 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
            />
            <div className="sm:w-4/10 w-7/10">
              <DateRangePicker />
            </div>
            <button
              type="button"
              onClick={() => {
                handleHotelSearch();
                navigate("/booking");
              }}
              className="sm:px-7 w-40 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      </main>
      <section
        data-aos="fade-up"
        className="py-4 bg-gray-100 flex flex-col items-center gap-5"
      >
        <div className="flex w-80/100 flex-col gap-y-2 items-center lg:items-start">
          <h2 className="text-[30px] font-bold">Top Destinations</h2>
          <ul className="flex flex-wrap justify-center gap-4 lg:justify-between w-full">
            {destinations.map((item) => {
              return (
                <li
                  className="min-h-80 rounded-lg w-full sm:w-48/100 lg:w-23/100 bg-white shadow-md"
                  key={item.id}
                >
                  <div
                    style={{ backgroundImage: `url(${item.image})` }}
                    className="
               rounded-t-lg h-50/100 bg-center bg-cover"
                  ></div>
                  <div className="flex flex-col p-2 justify-between">
                    <h3 className="text-[20px] font-bold">
                      {item.name}, {item.country}
                    </h3>
                    <p>{item.shortDescription}</p>
                    <p>From {item.price}$</p>
                    <div className="flex justify-end items-end">
                      <button
                        onClick={() => {
                          setQuery(item.name);
                          navigate("/hotels");
                          setIsOpen(true);
                        }}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
                      >
                        See Hotels
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="flex flex-col items-center pb-7 pt-4"
      >
        <h2 className="text-[30px] font-bold">Why Choose Us</h2>
        <div className="w-90/100 h-auto flex lg:justify-between flex-wrap gap-4 justify-center">
          <FeaturesCard
            title={"Best Prices"}
            text={"Competetive prices for top travel destinations worldwide"}
            icon={<CircleDollarSign className="text-blue-500" size={65} />}
          />
          <FeaturesCard
            title={"Easy Booking"}
            text={"Fast, simple and secure booking process"}
            icon={<CalendarCheck className="text-blue-500" size={65} />}
          />
          <FeaturesCard
            title={"Real-Time Weather"}
            text={"Live weather updates for your destinations"}
            icon={<CloudSun className="text-yellow-500" size={65} />}
            isBottomCard={true}
          />
        </div>
      </section>
    </>
  );
};

export default HomePage;
// import "../App.css";
// import { useContext, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { DestinationsContext } from "../context/DestinationsContext";
// import DateRangePicker from "../components/DateRangePicker";
// import { CalendarCheck, CircleDollarSign, CloudSun, MapPin } from "lucide-react";
// import { FeaturesCard } from "../components/FeaturesCard";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const {
//     destinations,
//     setDestinationCity,
//     destinationSearchRef,
//     handleHotelSearch,
//     setIsLoading,
//   } = useContext(DestinationsContext);

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//   }, []);

//   return (
//     <>
//       {/* HERO */}
//       <main
//         className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
//         style={{
//           backgroundImage: "url('/assets/main-image.avif')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-[#0a0f1e]/60" />

//         <div className="relative z-10 flex flex-col items-center text-center gap-4 max-w-3xl w-full">
//           <span className="text-xs font-semibold tracking-[3px] uppercase text-[#f0c96b] border border-[#f0c96b]/40 rounded-full px-4 py-1.5">
//             ✦ Your Travel Companion
//           </span>

//           <h1
//             className="text-white font-bold text-5xl md:text-7xl leading-tight"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             Travel the World, <br />
//             <em className="text-[#f0c96b]">Your Way</em>
//           </h1>

//           <p className="text-white/70 text-lg">
//             Discover stunning destinations, find the best hotels, and book your perfect trip in minutes.
//           </p>

//           {/* SEARCH BAR */}
//           <div className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 w-full mt-2">
//             <div className="flex items-center gap-2 flex-1 min-w-[160px] bg-white/10 border border-white/10 rounded-xl px-3 py-2.5">
//               <MapPin size={16} className="text-white/60 shrink-0" />
//               <input
//                 ref={destinationSearchRef}
//                 type="text"
//                 placeholder="Where are you going?"
//                 className="bg-transparent outline-none text-white placeholder-white/40 text-sm w-full"
//               />
//             </div>
//             <div className="flex-1 min-w-[160px]">
//               <DateRangePicker />
//             </div>
//             <button
//               onClick={() => {
//                 handleHotelSearch();
//                 navigate("/booking");
//               }}
//               className="bg-[#f0c96b] hover:bg-[#f5d980] text-[#0a0f1e] font-bold text-sm rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
//             >
//               Search →
//             </button>
//           </div>
//         </div>

//         {/* SCROLL HINT */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
//           <div className="w-5 h-8 border border-white/50 rounded-full relative">
//             <div className="w-1 h-1 bg-white rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
//           </div>
//           <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
//         </div>
//       </main>

//       {/* STATS */}
//       <div className="bg-[#f0c96b] py-5 px-4 flex flex-wrap justify-center gap-8">
//         {[
//           { num: "10K+", label: "Hotels worldwide" },
//           { num: "180+", label: "Countries covered" },
//           { num: "50K+", label: "Happy travelers" },
//           { num: "4.9★", label: "Average rating" },
//         ].map((s) => (
//           <div key={s.label} className="text-center">
//             <div className="text-[#0a0f1e] font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
//             <div className="text-[#0a0f1e]/60 text-xs font-medium tracking-wide">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* DESTINATIONS */}
//       <section data-aos="fade-up" className="bg-[#0a0f1e] py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <p className="text-[#f0c96b] text-xs font-semibold tracking-[3px] uppercase mb-1">Handpicked for you</p>
//           <h2 className="text-white font-bold text-4xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
//             Top Destinations
//           </h2>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {destinations.map((item) => (
//               <li
//                 key={item.id}
//                 className="relative rounded-2xl overflow-hidden h-80 cursor-pointer group transition-transform duration-300 hover:-translate-y-2"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/90 via-transparent to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <p className="text-[#f0c96b] text-[10px] font-semibold tracking-[2px] uppercase mb-0.5">{item.country}</p>
//                   <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
//                   <p className="text-white/55 text-xs mb-3">{item.shortDescription}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-white/60 text-xs">From <strong className="text-white text-base">${item.price}</strong></span>
//                     <button
//                       onClick={() => {
//                         setDestinationCity(item.name);
//                         navigate("/hotels");
//                         setIsLoading(true);
//                       }}
//                       className="bg-[#f0c96b] hover:bg-[#f5d980] text-[#0a0f1e] text-xs font-bold rounded-lg px-3 py-1.5 transition-all hover:scale-105"
//                     >
//                       See Hotels
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section data-aos="fade-up" className="bg-[#0d1426] py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <p className="text-[#f0c96b] text-xs font-semibold tracking-[3px] uppercase mb-1">Why Traveloop</p>
//           <h2 className="text-white font-bold text-4xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
//             Everything you need,<br />nothing you don't.
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//             <FeaturesCard title="Best Prices" text="Competitive prices for top travel destinations worldwide." icon={<CircleDollarSign className="text-[#f0c96b]" size={40} />} />
//             <FeaturesCard title="Easy Booking" text="Fast, simple and secure booking process." icon={<CalendarCheck className="text-[#f0c96b]" size={40} />} />
//             <FeaturesCard title="Real-Time Weather" text="Live weather updates for your destination." icon={<CloudSun className="text-[#f0c96b]" size={40} />} />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomePage;
