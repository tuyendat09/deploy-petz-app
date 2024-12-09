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
} from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Booking, BookingStatus } from "@/types/Booking";
import formatMoney from "@/utils/formatMoney";
import { useBookingContext } from "./store/BookingContext";
import formatDate from "@/utils/formatDate";

const columns = [
  {
    key: "userId",
    label: "MÃ KHÁCH HÀNG",
  },
  {
    key: "customerName",
    label: "HỌ TÊN",
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
];

const statusColors = {
  [BookingStatus.Done]: "text-green-600",
  [BookingStatus.Confirm]: "text-blue-600",
  [BookingStatus.Booked]: "text-amber-500	",
  [BookingStatus.Canceled]: "text-red-600",
};

export default function BookingsTable() {
  const { bookingList, page, totalPages, handleSetPage } = useBookingContext();

  const currentDate = today(getLocalTimeZone());

  const isPastDate = (bookingDate: string) => {
    const booking = new Date(bookingDate);
    const current = new Date(
      currentDate.year,
      currentDate.month - 1,
      currentDate.day,
    );
    return booking < current;
  };

  const formatUserId = (userId: string | null) => {
    if (!userId) return "Khách lẻ"; // Display "Khách lẻ" if userId is null
    return userId.slice(0, 5).toUpperCase(); // Slice first 3 chars and convert to uppercase
  };

  return (
    <>
      <div className="">
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
          <TableBody items={bookingList?.bookings || []}>
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

                  if (columnKey === "bookingStatus") {
                    const statusLabel =
                      BookingStatus[
                        bookingItem.bookingStatus as keyof typeof BookingStatus
                      ];
                    const statusClass = statusColors[statusLabel];

                    return (
                      <TableCell className={`space-x-2 ${statusClass}`}>
                        {statusLabel}
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
    </>
  );
}
