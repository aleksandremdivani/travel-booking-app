import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DestinationsContext } from "../context/DestinationsContext";

const DateRangePicker = () => {
  const { dates, setDates } = useContext(DestinationsContext);
  const [startDate, endDate] = dates;

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const formatedTommorow = tommorow.toISOString().slice(0, 10);

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDates(update)}
      dateFormat="yyyy-MM-dd"
      isClearable
      minDate={Date()}
      
      placeholderText={new Date().toISOString().slice(0, 10) + "-" + formatedTommorow}
      className="w-full h-12 px-4 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition cursor-pointer text-gray-700 bg-white"
    />
  );
};

export default DateRangePicker;
