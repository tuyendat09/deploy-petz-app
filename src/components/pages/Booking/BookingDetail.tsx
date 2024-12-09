import Logo from "@/components/ui/Header/Logo";
import { useCreateBookingMutation } from "@/libs/features/services/booking";
import formatMoney from "@/utils/formatMoney";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import ConfirmBooking from "./Modal/ConfirmBooking";

interface BookingDetailProps {
  formik: any;
  isConfirm: boolean;
  handleCreateBooking: () => void;
  handleCancelConfirm: () => void;
}

export default function BookingDetail({
  formik,
  isConfirm,
  handleCreateBooking,
  handleCancelConfirm,
}: BookingDetailProps) {
  const selectedServiceNames = Object.values(formik.values.selectedServices)
    .filter((service: any) => service && service.serviceName)
    .map((service: any) => service.serviceName)
    .join(" - ");

  const totalPrice = Object.values(formik.values.selectedServices).reduce(
    (total, service: any) => total + service.servicePrice,
    0,
  );

  const duration = Object.values(formik.values.selectedServices).reduce(
    (total, service: any) => total + service.serviceDuration,
    0,
  );

  return (
    <div className="xl:w-1/2">
      <div className="mb-4 border-b border-l border-t px-4">
        <h1 className="text-h1 font-semibold uppercase">Chi tiết</h1>
      </div>

      <div className="px-4">
        <Card className="w-full" shadow="sm">
          <CardHeader className="flex gap-3">
            <Logo />
            <div className="flex flex-col">
              <p className="text-md">{formik.values.customerName}</p>
              <p className="text-small text-default-500">
                {formik.values.customerPhone}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              <span className="font-bold">Dịch vụ đã chọn:</span>{" "}
              {selectedServiceNames || "Chưa chọn dịch vụ"}
            </p>
            <p>
              <span className="font-bold">Giờ:</span>{" "}
              {formik.values.bookingHours || "Chưa chọn giờ"}
            </p>

            <p>
              <span className="font-bold">Ngày:</span>{" "}
              {formik.values.bookingDate
                ? formik.values.bookingDate.split("T")[0]
                : "Chưa chọn ngày"}
            </p>
            <p>
              <span className="font-bold">Tổng tiền thiệt hại:</span>{" "}
              {formatMoney(totalPrice)}
            </p>
            <p>
              <span className="font-bold">Tổng thời gian:</span> {""}
              {duration as any} phút
            </p>
          </CardBody>
          <Divider />
          <CardFooter>
            <button
              type="button"
              onClick={formik.handleSubmit}
              className="w-full rounded-full bg-primary py-2 font-bold text-white"
            >
              Đặt lịch ngay
            </button>
          </CardFooter>
        </Card>
      </div>
      {isConfirm && (
        <ConfirmBooking
          isDialogOpen={isConfirm}
          handleCloseDialog={handleCancelConfirm}
          formik={formik}
          handleCreateBooking={handleCreateBooking}
        />
      )}
    </div>
  );
}
