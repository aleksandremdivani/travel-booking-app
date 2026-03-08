import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const DestinationsContext = createContext();

const DestinationsProvider = ({ children }) => {
  const [currentCity, setCurrentCity] = useState("");
  //weather
  const [weather, setWeather] = useState(null);
  //hotels
  const [hotelsList, SetHotelsList] = useState([]);
  const inputRef = useRef();
  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        `grant_type=client_credentials&client_id=${import.meta.env.VITE_AMADEUS_API_KEY}&client_secret=${import.meta.env.VITE_AMADEUS_API_SECRET}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      console.log("TOKEN:", response.data);

      return response.data.access_token;
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  const searchCity = async (city) => {
    const token = await getAccessToken();

    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/cities",
      {
        params: {
          keyword: city,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response.data);

    return response.data.data[0].iataCode;
  };

  //hotels
  useEffect(() => {
    const fetchHotelsList = async (city) => {
      console.log(import.meta.env.VITE_AMADEUS_API_KEY);
      console.log(import.meta.env.VITE_AMADEUS_API_SECRET);
      try {
        if (!city) return;
        const token = await getAccessToken();
        const cityCode = await searchCity(city);
        const response = await axios.get(
          "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
          {
            params: {
              cityCode: cityCode,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response.data);
        SetHotelsList(response.data.data.data);
        console.log(hotelsList);
      } catch (error) {}
    };
    fetchHotelsList(currentCity);
  }, [currentCity]);
  //https://test.api.amadeus.com/v3/shopping/hotel-offers
  useEffect(() => {
    const fetchHotelDetails = async() => {
      try {
        const response = await axios.get("https://test.api.amadeus.com/v3/shopping/hotel-offers")
      } catch (error) {
        
      }
    }
  },[])

  //weather
  useEffect(() => {
    const fetchWeatherData = async (city) => {
      const { VITE_WEATHER_API_KEY } = import.meta.env;
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
