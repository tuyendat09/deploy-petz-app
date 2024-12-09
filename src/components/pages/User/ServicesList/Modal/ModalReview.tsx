/* eslint-disable react-hooks/exhaustive-deps */
import {
  useGetBookingQuery,
  useReviewBookingMutation,
} from "@/libs/features/services/booking";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Booking, BookingStatus } from "@/types/Booking";
import AnimateRating from "./AnimateRating";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { successModal } from "@/utils/callModalANTD";

interface ModalReviewProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  bookingId: string;
}

export default function ModalReview({
  isDialogOpen,
  handleCloseDialog,

  bookingId,
}: ModalReviewProps) {
  const { data } = useGetBookingQuery({ bookingId: bookingId });
  const [createReview, { data: reviewResponse }] = useReviewBookingMutation();
  const [bookingDetail, setBookingDetail] = useState<Booking>();
  const [selectedEmojiId, setSelectedEmojiId] = useState<number | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const { update, data: session } = useSession();
  const userId = session?.user?._id;

  useEffect(() => {
    if (data) {
      setBookingDetail(data?.bookings[0]);
    }

    if (reviewResponse) {
      update({
        ...session,
        user: {
          ...session?.user,
          userPoint: (reviewResponse as any).userPoint,
        },
      });
      successModal({ content: "Đánh giá thành công", duration: 3 });
      handleCloseDialog();
    }
  }, [data, reviewResponse]);

  const handleEmojiSelect = (id: number) => {
    setSelectedEmojiId(id);
    setErrorMessage("");
  };

  const handleReviewChange = (value: string) => {
    setReviewContent(value);
    setWordCount(_.words(value).length);
  };

  const handleCreateReview = () => {
    if (!selectedEmojiId) {
      return setErrorMessage("Vui lòng chọn mức độ hài lòng");
    }

    const serviceIds = bookingDetail?.service.map(
      (service: any) => service._id,
    );

    createReview({
      userId: userId as any,
      customerName: bookingDetail?.customerName as any,
      bookingId: bookingDetail?._id as any,
      rating: selectedEmojiId as any,
      review: reviewContent as any,
      services: serviceIds as any,
    });
  };

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
            <ModalHeader className="text-center">
              Đánh giá dịch vụ
              <p className="ml-2 text-[12px] font-normal">
                (Nhận ngay 50 điểm khi đánh giá)
              </p>
            </ModalHeader>
            <ModalBody>
              <p>
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {bookingDetail?.customerName}
              </p>
              <p>
                <span className="font-bold">Dịch vụ đã chọn:</span>{" "}
                {bookingDetail?.service.map(
                  (service) => (service as any).serviceName + " - ",
                )}
              </p>
              <p>
                <span className="font-bold">Giờ đặt:</span>{" "}
                {bookingDetail?.bookingHours}
              </p>

              <p>
                <span className="font-bold">Ngày đặt:</span>{" "}
                {formatDate(bookingDetail?.bookingDate as any)}
              </p>
              <p>
                <span className="font-bold">Tổng tiền thiệt hại:</span>{" "}
                {formatMoney(bookingDetail?.totalPrice)}
              </p>
              <p>Đánh giá của bạn: {selectedEmojiId}</p>
              <p className="text-[12px] text-red-500">{errorMessage}</p>
              <AnimateRating onEmojiSelect={handleEmojiSelect} />

              <Textarea
                onValueChange={(values) => handleReviewChange(values)}
                value={reviewContent}
                label={`Đánh giá chi tiết (50 từ nhận được 100 POINT / Từ ${wordCount})`}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="rounded-full bg-black text-white"
                onPress={handleCloseDialog}
              >
                Hủy
              </Button>
              <Button
                color="success"
                className="rounded-full text-white"
                onPress={handleCreateReview}
              >
                Đánh giá
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
