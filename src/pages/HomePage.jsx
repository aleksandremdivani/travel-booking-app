import "../App.css";
import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

const HomePage = () => {
  const { destinations } = useContext(DestinationsContext);

  return (
    <>
      <main className="home-main h-140 justify-center flex items-center">
        <div className="h-100 max-w-80/100 w-full flex flex-col items-start justify-start gap-3">
          <h1 className="text-white font-bold text-[50px] line-[0px]">
            Plan Your Perfect Trip!
          </h1>
          <p className="text-white font-semibold text-[20px]">
            Find and book amazing travel deals easily
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
            Explore Destinations
          </button>
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
                        See more
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="px-6 py-3 border rounded-lg hover:shadow-lg hover:bg-gray-200 transition-all duration-300 font-semibold">
          Explore Destinations
        </button>
      </section>
      <section className="">
        <h2 className="text-[30px] font-bold">Why Choose Us</h2>
        <div></div>
      </section>
    </>
  );
};

export default HomePage;
