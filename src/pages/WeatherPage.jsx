import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DetailsCard from "../components/DetailsCard";
import "../App.css";

export const WeatherPage = () => {
  const { handleSearch, inputRef, weather } = useContext(DestinationsContext);
  return (
    <main
      className="h-dvh flex flex-col justify-center weather-main"
      style={{
        backgroundImage: `url(/assets/main-image.avif)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="h-180 flex flex-col items-center gap-8">
        <h1 className="text-white text-[40px] font-bold">Weather Forecast</h1>
        <div className="w-6/10 flex gap-4">
          <input
            className="text-black p-4 flex-1 rounded-md bg-white outline-none"
            type="text"
            placeholder="Search for a city..."
            ref={inputRef}
          />
          <button
            onClick={handleSearch}
            className="active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            search
          </button>
        </div>
        <div className="w-full flex-col items-center flex">
          {weather && (
            <div className="w-70/100 relative h-auto gap-4 flex flex-col">
              <div
                className="w-full h-[400px] rounded-2xl shadow-xl"
                style={{
                  backgroundImage: `url(/assets/main-image.avif)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-transparent rounded-2xl"></div>

                <div className="md:w-4/10 w-5/10 bg-white/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 h-full flex flex-col gap-3">
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
              <div className="flex w-full justify-between">
                <DetailsCard
                  label={"Humidity"}
                  value={`${weather.main.humidity}%`}
                />
                <DetailsCard
                  label={"Wind Speed"}
                  value={`${weather.wind.speed} m/s`}
                />
                <DetailsCard label={"Pressure"} value={weather.main.pressure} />
                <DetailsCard
                  label={"Visibility"}
                  value={`${weather.visibility} meters`}
                />
              </div>
              <div className="w-6/10"></div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
