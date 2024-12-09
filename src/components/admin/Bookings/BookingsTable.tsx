"use client";

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
import { Booking, BookingStatus } from "@/types/Booking";
import formatMoney from "@/utils/formatMoney";
import { useBookingContext } from "./store/BookingContext";
import formatDate from "@/utils/formatDate";
import ModalBookingDetail from "./Modal/ModalBookingDetail";

const columns = [
  {
    key: "userId",
    label: "USERID",
  },
  {
    key: "customerName",
    label: "Tên khách hàng",
  },

  {
    key: "bookingDate",
    label: "NGÀY ĐẶT",
  },
  {
    key: "bookingHours",
    label: "GIỜ ĐẶT",
  },
  {
    key: "totalPrice",
    label: "TỔNG TIỀN",
  },
  {
    key: "bookingStatus",
    label: "TRẠNG THÁI",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const statusColors = {
  [BookingStatus.Done]: "bg-green-700",
  [BookingStatus.Confirm]: "bg-blue-700",
  [BookingStatus.Booked]: "bg-amber-500	",
  [BookingStatus.Canceled]: "bg-red-600",
};

export default function BookingsTable() {
  const {
    isLoading,
    bookingList,
    page,
    totalPages,
    handleSetPage,
    handleViewBookingDetail,
    viewDetail,
    bookingId,
    handleCancelBookingDetail,
  } = useBookingContext();

  const formatUserId = (userId: string | null) => {
    if (!userId) return "Khách lẻ";
    return userId.slice(-3).toUpperCase();
  };

  const loadingState = isLoading ? "loading" : "idle";

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
            items={bookingList?.bookings || []}
          >
            {(bookingItem: Booking) => (
              <TableRow key={bookingItem._id}>
                {(columnKey) => {
                  if (columnKey === "userId") {
                    // Format the userId to the first 3 uppercase characters or "Khách lẻ"
                    return (
                      <TableCell className="font-bold">
                        {formatUserId(bookingItem.userId)}
                      </TableCell>
                    );
                  }
                  if (columnKey === "bookingDate") {
                    return (
                      <TableCell>
                        {formatDate(bookingItem.bookingDate)}
                      </TableCell>
                    );
                  }
                  if (columnKey === "totalPrice") {
                    return (
                      <TableCell>
                        {formatMoney(bookingItem.totalPrice)}
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
                            handleViewBookingDetail(bookingItem._id);
                          }}
                        >
                          Xem
                        </Button>
                      </TableCell>
                    );
                  }
                  if (columnKey === "bookingStatus") {
                    const statusLabel =
                      BookingStatus[
                        bookingItem.bookingStatus as keyof typeof BookingStatus
                      ];
                    const statusClass = statusColors[statusLabel];

                    return (
                      <TableCell className={`space-x-2`}>
                        <span
                          className={`rounded-full px-4 py-2 text-white ${statusClass}`}
                        >
                          {statusLabel}
                        </span>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell>{getKeyValue(bookingItem, columnKey)}</TableCell>
                  );
                }}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {viewDetail && (
        <ModalBookingDetail
          handleCloseDialog={handleCancelBookingDetail}
          bookingId={bookingId}
          isDialogOpen={viewDetail}
        />
      )}
    </>
  );
}
