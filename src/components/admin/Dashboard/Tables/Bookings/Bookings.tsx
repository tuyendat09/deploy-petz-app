"use client";

import { BookingProvider } from "./store/BookingContext";
import BookingsTable from "./BookingsTable";
import BookingsFilter from "./BookingsFilter";

export default function Bookings() {
  return (
    <BookingProvider>
      <BookingsFilter />
      <BookingsTable />
    </BookingProvider>
  );
}
