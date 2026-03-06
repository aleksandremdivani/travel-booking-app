import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const DestinationsContext = createContext();

const DestinationsProvider = ({ children }) => {
  const [currentCity, setCurrentCity] = useState("");
  const [weather, setWeather] = useState(null);
  const inputRef = useRef();
  useEffect(() => {
    const { VITE_HOTELS_API_KEY } = import.meta.env;
    const fetchHotelsList = async (city) => {
      try {
        const response = await axios.get(
          "https://booking-com-api4.p.rapidapi.com/api/core/list-hotels",
          {
            params: {
              city_name: city,
            },
            headers: {
              "x-rapidapi-host": "booking-com-api4.p.rapidapi.com",
              "x-rapidapi-key": VITE_HOTELS_API_KEY,
            },
          },
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelsList("paris");
  }, [currentCity]);
  useEffect(() => {
    const fetchWeatherData = async (city) => {
      const { VITE_WEATHER_API_KEY } = import.meta.env;
      console.log(VITE_WEATHER_API_KEY);
      try {
        if (!city) return;
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: VITE_WEATHER_API_KEY,
              units: "metric",
            },
          },
        );
        setWeather(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData(currentCity);
  }, [currentCity]);
  const handleSearch = () => {
    setCurrentCity(inputRef.current.value.trim());
    inputRef.current.value = "";
  };
  const destinations = [
    {
      id: "paris",
      name: "Paris",
      country: "France",
      airportCode: "CDG",
      price: 899,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      shortDescription: "The city of lights and romance.",
    },
    {
      id: "bali",
      name: "Bali",
      country: "Indonesia",
      airportCode: "DPS",
      price: 499,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      shortDescription: "Tropical paradise with stunning beaches.",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Japan",
      airportCode: "HND",
      price: 1099,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      shortDescription: "Modern city mixed with tradition.",
    },
    {
      id: "newyork",
      name: "New York",
      country: "USA",
      airportCode: "JFK",
      price: 999,
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
      shortDescription: "The city that never sleeps.",
    },
  ];
  return (
    <DestinationsContext.Provider
      value={{
        destinations,
        weather,
        setCurrentCity,
        setWeather,
        handleSearch,
        inputRef,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export { DestinationsContext, DestinationsProvider };
