"use client";

import { useEffect } from "react";
import useBookingForm from "./_hook/useBookingForm";
import BookingDetail from "./BookingDetail";
import BookingForm from "./BookingForm";

export default function Booking() {
  const {
    formik,
    isModalDisplay,
    isConfirm,
    handleCreateBooking,
    handleCancelConfirm,
  } = useBookingForm();

  useEffect(() => {
    document.body.classList.remove("dark");

    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  return (
    <section className="mt-14">
      <div>
        <div>
          <h1 className="px-4 text-[100px] font-bold uppercase">
            Đặt lịch spa
          </h1>
          <div className="xl:flex">
            <BookingForm isModalDisplay={isModalDisplay} formik={formik} />
            <BookingDetail
              handleCancelConfirm={handleCancelConfirm}
              isConfirm={isConfirm}
              handleCreateBooking={handleCreateBooking}
              formik={formik}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
