import { differenceInDays } from "date-fns";
import { ArrowRight, Bed } from "lucide-react";
import React from "react";

const BookingCard = ({
  getRoomData,
  selectedRooms,
  onCancel,
  getHotelData,
}) => {
  const getStars = (count) => "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <section className="flex-1 border border-black/20 rounded-lg">
      {selectedRooms?.map((hotel) => {
        const { photo, hotelId, hotelName } = getHotelData(hotel);
        return (
          <div
            key={hotelId}
            className="rounded-2xl border border-[#E7E7E7] bg-[#FAFAFA] p-6 w-full flex flex-col"
          >
            <div className="w-full flex py-2 gap-x-3">
              <img
                className="w-36 min-w-36 h-22 rounded-md object-cover"
                src={photo}
                alt="No photo"
              />
              <div className="flex flex-1">
                <div className="max-w-100">
                  <h2 className="text-[20px] font-semibold">{hotelName}</h2>
                  <p className="capitalize">
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
                <div className="justify-end items-start flex h-full flex-1">
                  <p>{getStars(hotel.starRating)}</p>
                </div>
              </div>
            </div>
            <div>
              <p>SELECTED ROOMS</p>
              {hotel?.selectedRooms?.map((item) => {
                const { name, board, price, fullPrice } = getRoomData(item);

                const checkIn = new Date(item.check_in).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" },
                );
                const checkOut = new Date(item.check_out).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" },
                );
                const nights = differenceInDays(
                  new Date(item.check_out),
                  new Date(item.check_in),
                );

                return (
                  <div
                    key={item.roomTypeId || item.id}
                    className="hover:bg-gray-50 flex items-stretch justify-between rounded-[14px] border border-[#E8E8E8] bg-white px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#ECECEC] bg-[#FAFAFA]">
                        <Bed className="h-5 w-5 text-[#6B7280]" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-[17px] font-medium text-[#111111]">
                            {name}
                          </h3>
                          <p className="mt-1 text-[14px] text-[#6B7280]">
                            {board}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg border border-[#E7E7E7] bg-[#FAFAFA] px-3 py-2 text-[13px] text-[#4B5563]">
                            {checkIn}
                          </div>
                          <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                          <div className="rounded-lg border border-[#E7E7E7] bg-[#FAFAFA] px-3 py-2 text-[13px] text-[#4B5563]">
                            {checkOut}
                          </div>
                          <span className="ml-2 text-[13px] text-[#6B7280]">
                            {nights} Nights
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full min-h-[120px] flex-col items-end justify-between pl-8">
                      <span className="text-[18px] font-medium text-[#111111] whitespace-nowrap">
                        {price * nights || fullPrice} $
                      </span>
                      <button
                        onClick={() => {
                          onCancel(item, hotel, item.id);
                        }}
                        className="h-11 px-5 rounded-xl border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#4B5563] transition-colors hover:bg-[#F8F8F8] hover:text-[#111111]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default BookingCard;
