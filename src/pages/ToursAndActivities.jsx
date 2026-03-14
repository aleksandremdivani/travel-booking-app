import { act, useContext, useState } from "react";
import { DestinationsContext } from "../context/DestinationsContext";

export const ActivitiesPage = () => {
  const {
    isLoading,
    destinationCity,
    activities,
    destinationSearchRef,
    handleSearch,
  } = useContext(DestinationsContext);
  const truncateByWords = (text, maxLength = 100) => {
  if (!text) return "";
  const plainText = text.replace(/<[^>]+>/g, "");
  if (plainText.length <= maxLength) return plainText;
  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "...";
};
  const [visibleCount, setVisibleCount] = useState(6);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  return (
    <main>
      <div
        className="h-[500px] flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url(/assets/tours&activities-bg-img.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center w-full h-62/100 justify-between">
          <div className="w-8/10 flex flex-col gap-5">
            <h1 className="text-white text-[60px] font-bold">
              Tours And Activities
            </h1>
            <p className="text-white text-[20px]">
              Discover the best experiences at your destination
            </p>
          </div>
          <div className="w-7/10 flex gap-4 ">
            <input
              className="shadow-lg text-black p-4 flex-1 rounded-md bg-white outline-none"
              type="search"
              placeholder="Search for a city..."
              ref={destinationSearchRef}
            />

            <button
              onClick={handleSearch}
              className="shadow-lg active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
              search
            </button>
          </div>
        </div>
      </div>
      <section className="flex flex-col items-center p-4">
        <h2 className="text-[35px] font-bold">Tours & Activities</h2>
        <div className="w-8/10 flex gap-5 flex-wrap">
          {activities &&
            activities
              .slice(0, 30)
              .slice(0, visibleCount)
              .map((item) => (
                <div
                  key={item.id}
                  className="sm:w-48/100 border rounded-xl min-h-100"
                >
                  <div
                    className="h-5/10 rounded-t-xl"
                    style={{
                      backgroundImage: `url(${item.pictures[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="p-2 ">
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.shortDescription ? (
                      <p>{truncateByWords(item.shortDescription)}</p>
                    ) : (
                      <p>{truncateByWords(item.description)}</p>
                    )}
                    <button className="shadow-lg active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
        {visibleCount < activities.slice(0, 30) && (
          <button onClick={handleShowMore}>show more</button>
        )}
      </section>
    </main>
  );
};
