import { useContext, useState } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import { Link } from "react-router-dom";

export const ActivitiesPage = () => {
  const { activities, destinationSearchRef, handleSearch } =
    useContext(DestinationsContext);
  const truncateByWords = (text, maxLength = 150) => {
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
        <div className="flex flex-col items-center w-full h-65/100 justify-between">
          <div className="w-8/10 flex flex-col gap-5">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold">
              Tours And Activities
            </h1>
            <p className="text-white text-[20px]">
              Discover the best experiences at your destination
            </p>
          </div>
          <div className="flex flex-row gap-4 px-4 max-w-8/10 w-full">
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
      <section className="flex flex-col items-center p-4 gap-4">
        <h2 className="text-[35px] font-bold">Tours & Activities</h2>
        <div className="w-8/10 flex gap-5 flex-wrap justify-center">
          {activities &&
            activities
              .slice(0, 30)
              .slice(0, visibleCount)
              .map((item) => (
                <div
                  key={item.id}
                  className="md:w-48/100 border border-gray-300 hover:scale-101 transition all duration-300 ease-in-out shadow-lg min-h-[440px]  rounded-xl w-full xl:w-30/100"
                >
                  <div
                    className="min-h-50 rounded-t-xl shadow-lg"
                    style={{
                      backgroundImage: `url(${item.pictures[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="p-2 flex flex-col justify-between min-h-60">
                    <div className="flex flex-col gap-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.shortDescription ? (
                        <p>{truncateByWords(item.shortDescription)}</p>
                      ) : (
                        <p>{truncateByWords(item.description)}</p>
                      )}
                    </div>
                    <div className="w-full flex justify-end">
                      <button className="shadow-lg active:opacity-70 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
                        <Link to={`activity/${item.id}`}>View Details</Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {visibleCount < activities.slice(0, 30).length && (
          <button
            onClick={handleShowMore}
            className="px-6 active:opacity-70 border rounded-lg py-2"
          >
            show more
          </button>
        )}
      </section>
    </main>
  );
};
