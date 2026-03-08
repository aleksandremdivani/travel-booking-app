import { useContext } from "react";
import { DestinationsContext } from "../context/DestinationsContext";
import DateRangePicker from "../components/DateRangePicker";

export const HotelsPage = () => {
  const { inputRef, handleSearch } = useContext(DestinationsContext);
  return (
    <main className="flex flex-col h-180 gap-3 px-4">
      <div className="border h-1/10 flex">
        <input type="text" ref={inputRef} placeholder="search" />
        <div className="w-40/100">
          <DateRangePicker />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="h-88/100 border-green-500 border w-full"></div>
    </main>
  );
};
