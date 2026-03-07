import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      isClearable
      minDate={Date()}
      placeholderText="Check in - Check out"
      className="w-full h-12 px-4 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        hover:border-gray-400 transition cursor-pointer text-gray-700 bg-white"
    />
  );
};

export default DateRangePicker;
