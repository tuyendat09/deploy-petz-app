/* eslint-disable react-hooks/exhaustive-deps */
import "./rating.css";

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
} from "@nextui-org/react";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useReviewMutation } from "@/libs/features/services/product";
import { errorModal, successModal } from "@/utils/callModalANTD";

interface ModalReviewProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  reviewId: string;
}

export default function ModalReview({
  isDialogOpen,
  handleCloseDialog,
  reviewId,
}: ModalReviewProps) {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [review, { data, error: reviewError }] = useReviewMutation();

  function handleRating(value: number) {
    setRating(value);
  }

  function handleReview() {
    if (rating == 0) {
      return errorModal({ content: "Vui lòng đánh giá sản phẩm" });
    }
    const reviewObject = {
      reviewId: reviewId,
      rating: rating,
      reviewContent: reviewContent,
    };
    review(reviewObject as any);
  }

  useEffect(() => {
    if (data) {
      successModal({ content: "Đánh giá thành công" });
      handleCloseDialog();
    }

    if (reviewError) {
      errorModal({ content: "Đánh giá thất bại" });
    }
  }, [data, reviewError]);

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
              Đánh giá sản phẩm
              <p className="ml-2 text-[12px] font-normal">
                (Nhận ngay 50 điểm khi đánh giá)
              </p>
            </ModalHeader>
            <ModalBody>
              <StarRating handleRating={handleRating} rating={rating} />
              <Textarea
                onValueChange={setReviewContent}
                value={reviewContent}
                label={`Đánh giá chi tiết`}
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
                onClick={handleReview}
                color="success"
                className="rounded-full text-white"
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
