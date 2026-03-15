import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const DestinationsContext = createContext();
const savedDates = localStorage.getItem("dateRange");

const DestinationsProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState(() => {
    if (!savedDates) return [null, null];

    const parsed = JSON.parse(savedDates);
    return [
      parsed[0] ? new Date(parsed[0]) : null,
      parsed[1] ? new Date(parsed[1]) : null,
    ];
  });
  const [accessToken, setAccessToken] = useState(null);
  const [startDate, endDate] = dateRange;
  const destinationSearchRef = useRef();
  const originSearchRef = useRef();
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  //`https://source.unsplash.com/600x400/?${hotel.name},hotel`;

  const [destinationCity, setDestinationCity] = useState(() => {
    return localStorage.getItem("destinationCity") || "";
  });
  //weather
  const [weather, setWeather] = useState(null);

  //tours and activities
  const [activities, setActivities] = useState([]);

  //hotels
  const [hotelsList, SetHotelsList] = useState([]);
  const [hotelOffers, setHotelOffers] = useState(null);
  const [selectedHotels, setSelectedHotels] = useState(() => {
    const saved = localStorage.getItem("selectedHotels");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("dateRange", JSON.stringify(dateRange));
  }, [dateRange]);
  useEffect(() => {
    localStorage.setItem("destinationCity", destinationCity);
  }, [destinationCity]);
  useEffect(() => {
    localStorage.setItem("selectedHotels", JSON.stringify(selectedHotels));
  }, [selectedHotels]);
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);
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
  }, [weather, accessToken]);

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
  }, [destinationCity, accessToken]);

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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelOffers();
  }, [hotelsList, startDate, endDate]);

  //hotel
  const calculateTotalStayPrice = (checkIn, checkOut, nightlyPrice) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffInMs = end - start;
    const nights = Math.max(1, Math.round(diffInMs / (1000 * 60 * 60 * 24)));

    return nights * nightlyPrice;
  };

  const handleHotelSearch = () => {
    if (destinationSearchRef.current.value.trim() === "") {
      return;
    }
    setDestinationCity(destinationSearchRef.current.value.trim());
    destinationSearchRef.current.value = "";
    setIsLoading(true);
    setHotelOffers([]);
    setBooked(false);
  };
  const handleBooking = () => {
    if (selectedHotels.length === 0) return;

    const newBooking = selectedHotels.map((item) => {
      return {
        hotelData: item,
        id: `TRIP-${Date.now()}-${Math.random().toString(36).toUpperCase().substring(2, 7)}`,
        city: destinationCity,
        country: weather?.sys?.country || "",
      };
    });
    setBookings((prev) => [...prev, ...newBooking]);
    setSelectedHotels([]);
    setDestinationCity("");
    setActivities([]);
    setWeather(null);
    setBooked(true);
    setHotelOffers([]);
    setDateRange([null, null]);
  };
  console.log(bookings);
  const handleHotelSelect = (hotel) => {
    setSelectedHotels((prev) => {
      const isAlreadySelected = prev.find(
        (item) =>
          item.hotel.hotelId === hotel.hotel.hotelId &&
          item.offers[0].checkInDate === hotel.offers[0].checkInDate &&
          item.offers[0].checkOutDate === hotel.offers[0].checkOutDate,
      );

      if (isAlreadySelected) {
        return prev.filter(
          (item) =>
            !(
              item.hotel.hotelId === hotel.hotel.hotelId &&
              item.offers[0].checkInDate === hotel.offers[0].checkInDate &&
              item.offers[0].checkOutDate === hotel.offers[0].checkOutDate
            ),
        );
      } else {
        return [...prev, hotel];
      }
    });
  };
  const getConvertRate = (hotel) => {
    const hotelCurrency = hotel.offers[0].price.currency;
    const rateData =
      hotelOffers?.dictionaries?.currencyConversionLookupRates?.[hotelCurrency];
    return rateData ? Number(rateData.rate) : 1;
  };

  const totalPrice = selectedHotels.reduce((sum, item) => {
    const nightlyPriceUSD = Math.round(
      (Number(item.offers[0].price.base) ||
        Number(item.offers[0].price.total)) * getConvertRate(item),
    );
    const stayTotalPrice = calculateTotalStayPrice(
      item.offers[0].checkInDate,
      item.offers[0].checkOutDate,
      nightlyPriceUSD,
    );

    return sum + stayTotalPrice;
  }, 0);
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
      id: "barcelona",
      name: "Barcelona",
      country: "Spain",
      airportCode: "DPS",
      price: 499,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      shortDescription:
        "A lively Spanish city on the Mediterranean, known for beaches and unique architecture.",
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
        accessToken,
        handleHotelSelect,
        selectedHotels,
        totalPrice,
        handleBooking,
        bookings,
        booked,
        calculateTotalStayPrice,
        getConvertRate,
        totalPrice,
        setBookings,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export { DestinationsContext, DestinationsProvider };
