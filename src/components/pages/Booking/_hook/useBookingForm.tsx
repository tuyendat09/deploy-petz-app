/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCreateBookingMutation } from "@/libs/features/services/booking";
import { useSession } from "next-auth/react";

interface errorsValues {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedServices: string;
  bookingDate: string;
  bookingHours: string;
}

export default function useBookingForm() {
  const router = useRouter();
  const [createBooking, { data }] = useCreateBookingMutation();
  const [isModalDisplay, setIsModalDisplay] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const session = useSession();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerPhone: session?.data?.user.userPhone || "",
      customerEmail: session?.data?.user.userEmail || "",
      selectedServices: {},
      bookingDate: "",
      bookingHours: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsConfirm(true);
    },
    validate: (values) => {
      let errors: Partial<errorsValues> = {};
      const hasSelectedService =
        Object.keys(values.selectedServices).length > 0;

      const phoneRegex = /^[0-9]{10}$/;

      if (!values.customerName) {
        errors.customerName = "Vui lòng nhập tên ";
      }

      if (!values.customerPhone) {
        errors.customerPhone = "Vui lòng nhập thông tin liên hệ";
      }

      if (!phoneRegex.test(values.customerPhone)) {
        errors.customerPhone = "Vui lòng số điện thoại hợp lệ";
      }

      if (!values.customerEmail) {
        errors.customerEmail = "Vui lòng nhập Email";
      }

      if (!hasSelectedService) {
        errors.selectedServices = "Vui lòng chọn ít nhất 1 dịch vụ";
      }

      if (!values.bookingDate) {
        errors.bookingDate = "Vui lòng chọn ngày";
      }

      if (!values.bookingHours) {
        errors.bookingHours = "Vui lòng chọn giờ đặt lịch ";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (data) {
      router.push("/booking-success");
    }
  }, [data]);

  async function handleCreateBooking() {
    const totalPrice = Object.values(formik.values.selectedServices).reduce(
      (total, service: any) => total + service.servicePrice,
      0,
    ) as number;
    const bookingObject = {
      userId: session.data?.user._id || null,
      ...formik.values,
      totalPrice: totalPrice,
    };
    createBooking(bookingObject);
    setIsConfirm(false);
  }

  function handleCancelConfirm() {
    setIsConfirm(false);
  }

  return {
    formik,
    isModalDisplay,
    isConfirm,
    handleCreateBooking,
    handleCancelConfirm,
  };
}
