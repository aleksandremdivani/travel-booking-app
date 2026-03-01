import Header from "../components/Header";
import "../App.css";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="h-140 border justify-center flex items-center">
        <div className="h-80 max-w-[800px] w-full flex flex-col items-start justify-start gap-3">
          <h1 className="text-white font-bold text-[50px]">Plan Your Perfect Trip!</h1>
          <p className="text-white font-semibold text-[20px]">
            Find and book amazing travel deals easily
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
            Explore Destinations
          </button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
