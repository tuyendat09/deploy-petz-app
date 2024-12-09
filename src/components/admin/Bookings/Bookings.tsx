"use client";

import { BookingProvider } from "./store/BookingContext";
import BookingsTable from "./BookingsTable";
import BookingsFilter from "./BookingsFilter";

export default function Bookings() {
  return (
    <BookingProvider>
      <p className="mb-4 w-fit rounded-full bg-black px-8 py-2 text-h4 font-bold text-white shadow-sm shadow-[#3b284e] dark:bg-black dark:text-white">
        Danh sách dịch vụ đã đặt
      </p>
      <BookingsFilter />
      <BookingsTable />
    </BookingProvider>
  );
}
