import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HotelDetailsPage = () => {
  const [hotelData, setHotelData] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          "https://api.liteapi.travel/v3.0/data/hotel",
          {
            params: {
              hotelId: id,
            },
            headers: {
              "X-API-Key": import.meta.env.VITE_LITEAPI_KEY,
            },
          },
        );
        setHotelData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHotelDetails();
  }, [id]);
  return <div>{hotelData.name}</div>;
};

export default HotelDetailsPage;
