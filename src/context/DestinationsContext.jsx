import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const DestinationsContext = createContext();
const savedHotelOffers = localStorage.getItem("hotelOffers");

const DestinationsProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [accessToken, setAccessToken] = useState(null);
  const [startDate, endDate] = dateRange;
  const destinationSearchRef = useRef();
  const originSearchRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  //`https://source.unsplash.com/600x400/?${hotel.name},hotel`;

  const [destinationCity, setDestinationCity] = useState("");
  // const [originCity, setOriginCity] = useState("");
  //weather
  const [weather, setWeather] = useState(null);

  //tours and activities
  const [activities, setActivities] = useState([]);
  //hotels

  const [hotelsList, SetHotelsList] = useState([]);
  const [hotelOffers, setHotelOffers] = useState(
    savedHotelOffers ? JSON.parse(savedHotelOffers) : [],
  );
  // const [hotelRatings, setHotelRatings] = useState([]);

  useEffect(() => {
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

        setAccessToken(response.data.access_token);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    getAccessToken();
  }, []);
  const searchCity = async (city) => {
    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/cities",
      {
        params: {
          keyword: city,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log(response.data);

    return response.data.data[0].iataCode;
  };
  // const searchFlightLocation = async (city) => {
  //   const { VITE_RAPIDAPI_API_KEY } = import.meta.env;

  //   const response = await axios.get(
  //     "https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination",
  //     {
  //       params: {
  //         query: city,
  //       },
  //       headers: {
  //         "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  //         "X-RapidAPI-Key": VITE_RAPIDAPI_API_KEY,
  //       },
  //     },
  //   );
  //   console.log(response.data.data);
  //   return response.data.data[0].id;
  // };
  const formatDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  // tours and activities
  useEffect(() => {
  if (!weather) return; 

  const fetchActivities = async () => {
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;

    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/shopping/activities",
        {
          params: {
            latitude: lat,
            longitude: lon,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setActivities(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchActivities();
}, [weather]);
  //hotels
  //https://maps.googleapis.com/maps/api/place/textsearch/json?query=Hotel+Name+City+Name&key=YOUR_API_KEY
  useEffect(() => {
    const fetchHotelsList = async (city) => {
      console.log(import.meta.env.VITE_AMADEUS_API_KEY);
      console.log(import.meta.env.VITE_AMADEUS_API_SECRET);
      try {
        if (!city) return;
        const cityCode = await searchCity(city);
        const response = await axios.get(
          "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
          {
            params: {
              cityCode,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        console.log(response.data);

        SetHotelsList(response.data.data);
      } catch (error) {}
    };
    fetchHotelsList(destinationCity);
  }, [destinationCity]);

  useEffect(() => {
    const fetchHotelOffers = async () => {
      try {
        if (!hotelsList.length) return;

        const hotelIds = hotelsList
          .slice(0, 30)
          .map((item) => item.hotelId)
          .join(",");

        const response = await axios.get(
          "https://test.api.amadeus.com/v3/shopping/hotel-offers",
          {
            params: {
              hotelIds: hotelIds,
              checkInDate: formatDate(startDate),
              checkOutDate: formatDate(endDate),
              includeClosed: false,
              currency: "USD",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(response.data);
        setHotelOffers(response.data.data);
        localStorage.setItem("hotelOffers", JSON.stringify(response.data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelOffers();
  }, [hotelsList, startDate, endDate]);

  // useEffect(() => {
  //   const getHotelReviews = async () => {
  //     // const hotelIds = hotelOffers.map((item) => item.hotel.hotelId).join(",");
  //     try {
  //       const response = await axios.get(
  //         "https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments",
  //         {
  //           params: {
  //             hotelIds: "BWPAR160",
  //           },
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         },
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getHotelReviews();
  // }, [hotelOffers]);

  //hotel
  const handleHotelSearch = () => {
    setDestinationCity(destinationSearchRef.current.value.trim());
    destinationSearchRef.current.value = "";
    setIsLoading(true);
    setHotelOffers([]);
    if (destinationSearchRef.current.value.trim() === "") {
      return;
    }
  };

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
    fetchWeatherData(destinationCity);
  }, [destinationCity]);
  const handleSearch = () => {
    setDestinationCity(destinationSearchRef.current.value.trim());
    destinationSearchRef.current.value = "";
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
        setDestinationCity,
        setWeather,
        handleSearch,
        destinationSearchRef,
        dateRange,
        startDate,
        setDateRange,
        endDate,
        hotelsList,
        hotelOffers,
        setHotelOffers,
        handleHotelSearch,
        isLoading,
        destinationCity,
        originSearchRef,
        activities,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export { DestinationsContext, DestinationsProvider };
