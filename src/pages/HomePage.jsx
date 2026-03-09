import "../App.css";
import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DatePicker from "react-datepicker";
import DateRangePicker from "../components/DateRangePicker";

const HomePage = () => {
  const { destinations } = useContext(DestinationsContext);

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
          <form className="px-3 gap-3 rounded-xl border w-full max-w-90/100 h-20 flex bg-orange-400 flex items-center">
            <input
              type="search"
              placeholder="Choose destination"
              className="dest-search w-4/10 h-12 px-11 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition text-gray-700 bg-white"
            />
            <div className="w-40/100">
              <DateRangePicker />
            </div>
            <button className="px-7 h-12  bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold">
              Search
            </button>
          </form>
        </div>
      </main>
      <section className="py-4 bg-gray-100 flex flex-col items-center gap-5">
        <div className="flex w-80/100 flex-col gap-y-2 items-center lg:items-start">
          <h2 className="text-[30px] font-bold">Top Destinations</h2>
          <ul className="flex flex-wrap justify-center gap-4 lg:justify-between w-full">
            {destinations.map((item) => {
              return (
                <li
                  className="min-h-80 rounded-lg w-full sm:w-48 lg:w-23/100 bg-white shadow-md"
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
                      <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                        Book Now
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="">
        <h2 className="text-[30px] font-bold">Why Choose Us</h2>
        <div>
          
        </div>
      </section>
    </>
  );
};

export default HomePage;
