import "../App.css";
import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

const HomePage = () => {
  const { destinations } = useContext(DestinationsContext);

  return (
    <>
      <main className="h-140 border justify-center flex items-center">
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
      <section className="p-3">
        <h2 className="text-[30px]">Top Destinations</h2>
        <ul>
          {destinations.map((item) => {
            return (
              <li className="border" key={item.id}>
                <h3>{item.name}</h3>
                
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default HomePage;
