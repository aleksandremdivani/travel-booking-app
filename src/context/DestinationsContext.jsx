import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

const DestinationsContext = createContext();

const DestinationsProvider = ({ children }) => {
  // ============================================================
  // 1. GLOBAL / SHARED
  // ============================================================
  const [dateRange, setDateRange] = useState(() => {
    const savedDates = localStorage.getItem("dateRange");
    if (!savedDates) return [null, null];

    const parsed = JSON.parse(savedDates);
    return [
      parsed[0] ? new Date(parsed[0]) : null,
      parsed[1] ? new Date(parsed[1]) : null,
    ];
  });
  const [startDate, endDate] = dateRange;
  const [dates, setDates] = useState([null, null]);
  const [accessToken, setAccessToken] = useState(null);

  const destinationSearchRef = useRef();

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const [destinationCity, setDestinationCity] = useState(() => {
    return localStorage.getItem("destinationCity") || "";
  });

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
      shortDescription: "vibrant coastal city full of art",
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

  const formatDate = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    setDestinationCity(destinationSearchRef.current.value.trim());
    destinationSearchRef.current.value = "";
  };

  // const handleHotelSearch = () => {
  //   if (destinationSearchRef.current.value.trim() === "") return;

  //   setDestinationCity(destinationSearchRef.current.value.trim());
  //   destinationSearchRef.current.value = "";

  //   setIsLoading(true);
  //   setHotelOffers([]);
  //   setBooked(false);
  // };

  const handleBooking = () => {
    if (selectedHotels.length === 0) return;

    const newBooking = selectedHotels.map((item) => {
      return {
        hotelData: item,
        id: `TRIP-${Date.now()}-${Math.random()
          .toString(36)
          .toUpperCase()
          .substring(2, 7)}`,
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

  const calculateTotalStayPrice = (checkIn, checkOut, nightlyPrice) => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffInMs = end - start;
    const nights = Math.max(1, Math.round(diffInMs / (1000 * 60 * 60 * 24)));

    return nights * nightlyPrice;
  };

  const getConvertRate = (hotel) => {
    const hotelCurrency = hotel.offers[0].price.currency;

    const rateData =
      hotelOffers?.dictionaries?.currencyConversionLookupRates?.[hotelCurrency];

    return rateData ? Number(rateData.rate) : 1;
  };

  // ============================================================
  // 2. PLACES
  // ============================================================
  // const placeSearchRef = useRef();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 600);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setPlaces([]);
      return;
    }
    const fetchPlaces = async (place) => {
      try {
        const response = await axios.get(
          "https://api.liteapi.travel/v3.0/data/places",
          {
            params: {
              textQuery: place,
              type: "locality,hotel",
            },
            headers: {
              "X-API-Key": import.meta.env.VITE_LITEAPI_KEY,
            },
          },
        );
        console.log("places:", response.data);
        setPlaces(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces(debouncedValue);
  }, [debouncedValue]);

  // ============================================================
  // 3. HOTELS
  // ============================================================
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hotelsList, SetHotelsList] = useState([]);

  useEffect(() => {
    if (!selectedPlace) return;
    const fetchHotelsList = async () => {
      try {
        const response = await axios.get(
          "https://api.liteapi.travel/v3.0/data/hotels",
          {
            params: {
              placeId: selectedPlace.placeId,
            },
            headers: {
              "X-API-Key": import.meta.env.VITE_LITEAPI_KEY,
            },
          },
        );
        console.log(response.data);
        SetHotelsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelsList();
  }, [selectedPlace]);
  console.log(selectedPlace);
  // const [hotelsList, SetHotelsList] = useState([]);
  const [hotelOffers, setHotelOffers] = useState(null);

  const [selectedHotels, setSelectedHotels] = useState(() => {
    const saved = localStorage.getItem("selectedHotels");
    return saved ? JSON.parse(saved) : [];
  });

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
      }

      return [...prev, hotel];
    });
  };
  const [hotelRates, setHotelRates] = useState([]);
  useEffect(() => {
    if (!hotelsList?.hotelIds?.length || !startDate || !endDate) return;
    const checkInDate = formatDate(startDate);
    const checkOutDate = formatDate(endDate);
    const fetchHotelRates = async () => {
      try {
        const response = await axios.post(
          "https://api.liteapi.travel/v3.0/hotels/rates",
          {
            hotelIds: hotelsList.hotelIds,
            occupancies: [{ rooms: 1, adults: 2 }],
            currency: "USD",
            guestNationality: "US",
            checkin: checkInDate,
            checkout: checkOutDate,
          },
          {
            headers: {
              "X-API-Key": import.meta.env.VITE_LITEAPI_KEY,
            },
          },
        );
        console.log(response.data);
        setHotelRates(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelRates();
  }, [hotelsList]);
  const mergedHotels = useMemo(() => {
    const hotelData = hotelRates.map((rate) => {
      return {
        ...rate,
        hotel: hotelsList.data.find((h) => h.id === rate.hotelId),
      };
    });
    return hotelData;
  }, [hotelRates, hotelsList]);
  console.log(mergedHotels);
  // ============================================================
  // 4. WEATHER
  // ============================================================
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      const { VITE_WEATHER_API_KEY } = import.meta.env;
      if (!city) return;
      try {
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData(destinationCity);
  }, [destinationCity]);
  // ============================================================
  // 5. ACTIVITIES
  // ============================================================
  const [activities, setActivities] = useState([]);

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

  useEffect(() => {
    if (!weather || !accessToken || activities.length) return;

    const fetchActivities = async () => {
      try {
        const lat = weather.coord.lat;
        const lon = weather.coord.lon;

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
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchActivities();
  }, [weather, accessToken]);

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
  // ============================================================
  // PROVIDER
  // ============================================================
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
        // handleHotelSearch,
        isLoading,
        setIsLoading,
        destinationCity,
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
        setBookings,
        selectedPlace,
        setSelectedPlace,
        query,
        setQuery,
        places,
        dates,
        setDates,
        hotelsList,
        hotelRates,
        mergedHotels,
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
};

export { DestinationsContext, DestinationsProvider };
