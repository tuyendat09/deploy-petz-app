import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useGetReviewQuery,
  usePublicReviewMutation,
} from "@/libs/features/services/product";
import { Review } from "@/types/Review";
import { errorModal, successModal } from "@/utils/callModalANTD";

interface ModalReviewDetailProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  reviewId: string;
}

export default function ModalReviewDetail({
  isDialogOpen,
  handleCloseDialog,

  reviewId,
}: ModalReviewDetailProps) {
  const { data, isLoading } = useGetReviewQuery({ reviewId: reviewId });
  const [reviewDetail, setReviewDetail] = useState<Review>();
  const [changeReviewPublicStatus, { data: editResponse, error: editError }] =
    usePublicReviewMutation();

  useEffect(() => {
    if (data) {
      setReviewDetail(data?.reviews[0] as any);
    }
  }, [data]);

  useEffect(() => {
    if (editResponse) {
      successModal({ content: "Thay đổi trạng thái thành công" });
      handleCloseDialog();
    }
    if (editError) {
      errorModal({ content: "Thay đổi trạng thái thất bại" });
    }
  }, [editError, editResponse]);

  function handleChangeReviewPublicStatus(publicStatus: boolean) {
    const changePublicStatusObject = {
      reviewId: reviewId,
      newReviewStatus: publicStatus,
    };

    changeReviewPublicStatus(changePublicStatusObject as any);
  }

  if (isLoading) {
    return (
      <Modal
        className="dark:text-white"
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
                Chi tiết lịch đặt
              </ModalHeader>
              <ModalBody>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
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

  return (
    <Modal
      className="dark:text-white"
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
            <ModalHeader className="text-center">Chi tiết đánh giá</ModalHeader>
            <ModalBody>
              <p>
                Tên sản phẩm:{" "}
                <span className="font-bold">{reviewDetail?.productName}</span>
              </p>
              <p>
                Điểm đánh giá:{" "}
                <span className="font-bold">{reviewDetail?.rating}</span>
              </p>
              <p>
                Nội dung đánh giá:{" "}
                <span className="font-bold">{reviewDetail?.reviewContent}</span>
              </p>
              <p>
                Trạng thái của đánh giá:{" "}
                <span className="font-bold">
                  {reviewDetail?.publicStatus ? "Hiển thị" : "Không hiển thị"}
                </span>
              </p>
              <div>
                <p className="mb-2">Thay đổi trạng thái đánh giá: </p>
                <Button
                  onClick={() => handleChangeReviewPublicStatus(false)}
                  color="danger"
                  className="mr-2 text-white"
                >
                  Không hiển thị
                </Button>
                <Button
                  onClick={() => handleChangeReviewPublicStatus(true)}
                  color="success"
                  className="text-white"
                >
                  Hiển thị
                </Button>
              </div>
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
