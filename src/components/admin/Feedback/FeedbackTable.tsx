import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import formatDate from "@/utils/formatDate";
import { useReviewContext } from "./_store/FeedbackContext";
import { Review } from "@/types/Review";
import ModalReviewDetail from "./Modal/ModalReviewDetail";

const columns = [
  {
    key: "userId",
    label: "USERID",
  },
  {
    key: "rating",
    label: "ĐÁNH GIÁ ",
  },
  {
    key: "publicStatus",
    label: "HIỂN THỊ",
  },

  {
    key: "productName",
    label: "TÊN SẢN PHẨM",
  },
  {
    key: "createdAt",
    label: "NGÀY ĐÁNH GIÁ",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function BookingsTable() {
  const {
    isLoading,
    reviewList,
    handleSetPage,
    page,
    totalPages,
    handleViewReviewDetail,
    handleCancelReviewDetail,
    viewDetail,
    reviewId,
  } = useReviewContext();

  const statusColors = {
    1: "bg-red-700",
    2: "bg-yellow-500",
    3: "bg-yellow-600",
    4: "bg-green-600",
    5: "bg-green-700",
  };

  const formatUserId = (userId: string | null) => {
    if (!userId) return "Khách lẻ";
    return userId.slice(-3).toUpperCase();
  };

  const loadingState = isLoading ? "loading" : "idle";
  console.log(reviewList);

  return (
    <>
      <div className="mt-4">
        <Table
          className="dark:text-white"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                classNames={{
                  cursor: "bg-black",
                }}
                total={totalPages}
                onChange={(page) => handleSetPage(page)}
              />
            </div>
          }
          aria-label="Example table with dynamic content"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            loadingContent={<Spinner />}
            loadingState={loadingState}
            emptyContent="Không tìm thấy lịch đặt nào"
            items={reviewList?.reviews || []}
          >
            {(reviewItem: Review) => (
              <TableRow key={reviewItem._id}>
                {(columnKey) => {
                  if (columnKey === "userId") {
                    return (
                      <TableCell className="font-bold">
                        {reviewItem.userId.userEmail}
                      </TableCell>
                    );
                  }
                  if (columnKey === "createdAt") {
                    return (
                      <TableCell>{formatDate(reviewItem.createdAt)}</TableCell>
                    );
                  }
                  if (columnKey === "rating") {
                    const ratingValue = reviewItem.rating as 1 | 2 | 3 | 4 | 5;
                    const statusClass =
                      statusColors[ratingValue] || "bg-gray-400";

                    return (
                      <TableCell className="space-x-2">
                        <span
                          className={`rounded-full px-4 py-2 text-white ${statusClass}`}
                        >
                          {ratingValue} sao
                        </span>
                      </TableCell>
                    );
                  }

                  if (columnKey === "action") {
                    return (
                      <TableCell className="space-x-2">
                        <Button
                          variant="flat"
                          size="sm"
                          onClick={() => {
                            handleViewReviewDetail(reviewItem._id);
                          }}
                        >
                          Xem
                        </Button>
                      </TableCell>
                    );
                  }

                  if (columnKey === "publicStatus") {
                    return (
                      <TableCell className="space-x-2">
                        {reviewItem.publicStatus === true
                          ? "Hiển thị"
                          : "Không hiển thị"}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell>{getKeyValue(reviewItem, columnKey)}</TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ModalReviewDetail
          isDialogOpen={viewDetail}
          handleCloseDialog={handleCancelReviewDetail}
          reviewId={reviewId}
        />
      </div>
    </>
  );
}
