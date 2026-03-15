import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DestinationsContext } from "../context/DestinationsContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ActivityDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { activities } = useContext(DestinationsContext);
  // const [activityData, setActivityData] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  const activityData = activities.find((i) => i.id === id);
  // useEffect(() => {
  //   if (!accessToken || activityData) return;

  //   const fetchActivityDetails = async () => {
  //     if (!accessToken || activityData?.id === id) return;
  //     try {
  //       const response = await axios.get(
  //         `https://test.api.amadeus.com/v1/shopping/activities/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         },
  //       );

  //       setActivityData(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchActivityDetails();
  // }, [id, accessToken]);

  if (!activityData)
    return <p className="text-center mt-20 text-xl">Loading...</p>;

  return (
    <div className="w-full bg-gray-200 items-start flex flex-col gap-y-4 p-8">
      <button
        onClick={handleBackClick}
        className="font-semibold hover:text-blue-500"
      >
        ← Back
      </button>
      <div className="flex w-full justify-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{activityData.name}</h1>

          <Slider {...sliderSettings} className="mb-8">
            {activityData.pictures?.map((photo, index) => (
              <div key={index}>
                <img
                  src={photo}
                  alt={`Activity photo ${index + 1}`}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            ))}
          </Slider>
          {activityData.shortDescription &&
            activityData.description &&
            (activityData.shortDescription.length >
            activityData.description.length ? (
              <p>{activityData.shortDescription.replace(/<[^>]+>/g, "")}</p>
            ) : (
              <p>{activityData.description.replace(/<[^>]+>/g, "")}</p>
            ))}

          <p className="mt-2 font-semibold text-lg">
            Price: {activityData.price.amount} {activityData.price.currencyCode}
          </p>
          {activityData.minimumDuration !== "" && (
            <p className="font-semibold text-lg">
              Minimum Duration: {activityData.minimumDuration}
            </p>
          )}
          {activityData.bookingLink  && (
            <p>
              Booking link: <a className="hover:text-blue-500" href={`${activityData.bookingLink}`}>{activityData.bookingLink}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
