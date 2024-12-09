import { useGetBookingQuery } from "@/libs/features/services/booking";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Booking, BookingStatus } from "@/types/Booking";

interface ModalBookingDetailProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  bookingId: string;
}

export default function ModalBookingDetail({
  isDialogOpen,
  handleCloseDialog,

  bookingId,
}: ModalBookingDetailProps) {
  const { data } = useGetBookingQuery({ bookingId: bookingId });
  const [bookingDetail, setBookingDetail] = useState<Booking>();
  useEffect(() => {
    if (data) {
      setBookingDetail(data?.bookings[0]);
    }
  }, [data]);

  return (
    <Modal
      backdrop="blur"
      onClose={handleCloseDialog}
      isOpen={isDialogOpen}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-center">Chi tiết lịch đặt</ModalHeader>
            <ModalBody>
              <p>
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {bookingDetail?.customerName}
              </p>
              <div>
                <p>
                  <span className="font-bold">Giờ đặt:</span>{" "}
                  {bookingDetail?.bookingHours}
                </p>

                <p>
                  <span className="font-bold">Ngày đặt:</span>{" "}
                  {formatDate(bookingDetail?.bookingDate as any)}
                </p>
              </div>
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left font-[14px]">Dịch vụ</th>
                      <th className="text-right font-[14px]">Giá tiền</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {bookingDetail?.service.map((service: any) => (
                      <tr
                        key={service._id}
                        className="border-b border-[#e5e7eb] text-[14px]"
                      >
                        <td className="p-0.5 text-[#4a4a4a]">
                          {service.serviceName}
                        </td>
                        <td className="p-0.5 text-right text-[#4a4a4a]">
                          {formatMoney(service.servicePrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table className="w-full border-collapse text-[14px]">
                  <tbody>
                    <tr>
                      <th className="text-left text-[#4a4a4a]">Tổng tiền:</th>
                      <th className="text-right text-[#4a4a4a]">
                        {formatMoney(bookingDetail?.totalPrice)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <span className="font-bold">Trạng thái:</span>{" "}
                {
                  BookingStatus[
                    bookingDetail?.bookingStatus as keyof typeof BookingStatus
                  ]
                }
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Hủy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
