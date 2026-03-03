import { createContext } from "react";

const DestinationsContext = createContext();

const DestinationsProvider = ({children}) => {
    const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    airportCode: "CDG",
    price: 899,
    image: "/images/paris.jpg",
    shortDescription: "The city of lights and romance."
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    airportCode: "DPS",
    price: 499,
    image: "/images/bali.jpg",
    shortDescription: "Tropical paradise with stunning beaches."
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    airportCode: "HND",
    price: 1099,
    image: "/images/tokyo.jpg",
    shortDescription: "Modern city mixed with tradition."
  },
];
    return (
        <DestinationsContext.Provider value={{
            destinations,
        }}>
            {children}
        </DestinationsContext.Provider>
    )
}

export {DestinationsContext, DestinationsProvider};