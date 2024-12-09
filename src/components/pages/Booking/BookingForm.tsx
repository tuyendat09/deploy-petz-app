"use client";

import {
  Input,
  Tab,
  Tabs,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ServicesCard from "./ServicesCard";
import { useGetServicesQuery } from "@/libs/features/services/services";
import { ServicesType } from "@/types/Services";
import { useLazyGetBookingByDateQuery } from "@/libs/features/services/booking";
import { useEffect, useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

const SERVICES_TYPE = ["NAIL_CARE", "CLEAN", "HAIR", "MASSAGE", "COMBO"];
const TIMES = ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export default function BookingForm({
  formik,
}: {
  formik: any;
  isModalDisplay: boolean;
}) {
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [pastTimes, setPastTimes] = useState<string[]>([]);

  const { data } = useGetServicesQuery({});
  const [triggerGetBookingByDate, { data: bookings }] =
    useLazyGetBookingByDateQuery();

  const handleDateChange = async (
    date: any,
    setFieldValue: (field: string, value: any) => void,
    triggerGetBookingByDate: (params: {
      year: number;
      month: number;
      day: number;
    }) => void,
  ) => {
    const year = date.year;
    const month = date.month - 1;
    const day = date.day;

    const selectedDate = new Date(year, month, day);

    const formattedDate = selectedDate.toISOString();

    setFieldValue("bookingDate", formattedDate);

    triggerGetBookingByDate({ year, month: month + 1, day });

    // Check if selected date is today
    const todayDate = new Date();
    if (
      selectedDate.getFullYear() === todayDate.getFullYear() &&
      selectedDate.getMonth() === todayDate.getMonth() &&
      selectedDate.getDate() === todayDate.getDate()
    ) {
      // It's today, disable times in the past
      const currentTime = todayDate.getHours() + todayDate.getMinutes() / 60;
      const timesInPast = TIMES.filter((time) => {
        const [hourStr, minuteStr] = time.split(":");
        const timeValue = parseInt(hourStr) + parseInt(minuteStr) / 60;
        return timeValue <= currentTime;
      });
      setPastTimes(timesInPast);
    } else {
      setPastTimes([]);
    }
  };

  useEffect(() => {
    if (bookings) {
      const bookedHours =
        (bookings as any)?.map((booking: any) => booking.bookingHours) || [];
      setBookedTimes(bookedHours);
      formik.setFieldValue("bookingHours", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  return (
    <div className="border-r pb-8 xl:w-1/2">
      <div className="mb-4 border-b border-t px-4">
        <h1 className="text-h1 font-semibold uppercase">Đặt lịch</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 border-b pb-4">
          <div className="space-y-4 px-4">
            <p>Thông tin liên hệ của bạn</p>
            <Input
              label="Họ và tên"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="customerName"
              errorMessage={
                formik.touched.customerName && formik.errors.customerName
                  ? formik.errors.customerName
                  : undefined
              }
              isInvalid={
                formik.touched.customerName && !!formik.errors.customerName
              }
            />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="customerPhone"
              value={formik.values.customerPhone}
              errorMessage={
                formik.touched.customerPhone && formik.errors.customerPhone
                  ? formik.errors.customerPhone
                  : undefined
              }
              isInvalid={
                formik.touched.customerPhone && !!formik.errors.customerPhone
              }
              label="Số điện thoại"
            />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="customerEmail"
              value={formik.values.customerEmail}
              errorMessage={
                formik.touched.customerEmail && formik.errors.customerEmail
                  ? formik.errors.customerEmail
                  : undefined
              }
              isInvalid={
                formik.touched.customerEmail && !!formik.errors.customerEmail
              }
              label="Email"
            />
          </div>
        </div>

        <div className="mb-4 border-b pb-4">
          <div className="space-y-4 px-4">
            <div>
              <p>Chọn dịch vụ cho bé</p>
              <p className="text-[12px] text-red-500">
                {formik.touched.selectedServices &&
                formik.errors.selectedServices
                  ? (formik.errors.selectedServices as any)
                  : ""}
              </p>
            </div>
            <Tabs isVertical>
              {SERVICES_TYPE.map((service) => (
                <Tab
                  key={service}
                  title={ServicesType[service as keyof typeof ServicesType]}
                >
                  <div className="grid grid-cols-1 justify-center gap-3 md:grid-cols-2 2xl:grid-cols-3">
                    {data &&
                      data
                        .filter((item: any) => item.serviceType === service)
                        .map((filteredService: any) => (
                          <ServicesCard
                            formik={formik}
                            key={filteredService._id}
                            service={filteredService}
                          />
                        ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
        <div className="mb-4">
          <div className="space-y-4 px-4">
            <div>
              <p>Chọn ngày thư giãn cho bé</p>
              <p className="text-[12px] text-red-500">
                {formik.touched.bookingDate && formik.errors.bookingDate
                  ? (formik.errors.bookingDate as any)
                  : ""}
              </p>
            </div>
            <DatePicker
              minValue={today(getLocalTimeZone()) as any}
              aria-label="Chọn ngày"
              onBlur={formik.handleBlur}
              onChange={(date) =>
                handleDateChange(
                  date,
                  formik.setFieldValue,
                  triggerGetBookingByDate,
                )
              }
            />
            <div>
              <p>Chọn giờ phù hợp với bé</p>
              <p className="text-[12px] text-red-500">
                {formik.touched.bookingHours && formik.errors.bookingHours
                  ? (formik.errors.bookingHours as any)
                  : ""}
              </p>
            </div>
            <Select
              label="Chọn giờ"
              disabledKeys={[...bookedTimes, ...pastTimes]}
              selectedKeys={
                formik.values.bookingHours
                  ? new Set([formik.values.bookingHours])
                  : new Set()
              }
              onSelectionChange={(selected) => {
                const selectedValue = Array.from(selected)[0];
                formik.setFieldValue("bookingHours", selectedValue);
              }}
            >
              {TIMES.map((time) => (
                <SelectItem key={time}>{time}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
}
