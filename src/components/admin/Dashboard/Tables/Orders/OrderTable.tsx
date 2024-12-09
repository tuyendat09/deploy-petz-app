import { getLocalTimeZone, today } from "@internationalized/date";
import { useOrderContext } from "./store/OrderContext";

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
import { OrderAdmin, OrderStatus } from "@/types/Order";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import ModalOrderDetail from "./Modal/ModalDetail";

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
    key: "createAt",
    label: "NGÀY ĐẶT",
  },
  {
    key: "totalAfterDiscount",
    label: "TỔNG TIỀN",
  },
  {
    key: "productId",
    label: "TỔNG SẢN PHẨM",
  },
  {
    key: "orderStatus",
    label: "TRẠNG THÁI",
  },
];

const statusColors = {
  [OrderStatus.DELIVERED]: "text-green-600",
  [OrderStatus.DELIVERING]: "text-blue-600	",
  [OrderStatus.CANCELLED]: "text-red-600",
  [OrderStatus.PENDING]: "text-amber-500",
  [OrderStatus.PAID]: "text-red-600", // Add color for PAID
  [OrderStatus.FAILED]: "text-green-600", // Add color for FAILED
};

export default function OrderTable() {
  const {
    orderList,
    page,
    totalPages,
    handleSetPage,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
  } = useOrderContext();

  const currentDate = today(getLocalTimeZone());

  const isPastDate = (bookingDate: string) => {
    const booking = new Date(bookingDate);
    const current = new Date(
      currentDate.day,
      currentDate.month - 1,
      currentDate.year,
    );
    return booking < current;
  };

  const formatUserId = (userId: string | null) => {
    if (!userId) return "Khách lẻ";
    return userId.slice(0, 5).toUpperCase();
  };

  return (
    <div className="">
      <h1 className="mb-4 mt-12 text-2xl font-semibold dark:text-white">
        Danh sách đơn hàng
      </h1>
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
        <TableBody items={orderList?.orders || []}>
          {(orderItem: OrderAdmin) => (
            <TableRow key={orderItem._id}>
              {(columnKey) => {
                if (columnKey === "userId") {
                  // Format the userId to the first 3 uppercase characters or "Khách lẻ"
                  return (
                    <TableCell className="font-bold">
                      {formatUserId(orderItem.userId)}
                    </TableCell>
                  );
                }
                if (columnKey === "createAt") {
                  return (
                    <TableCell>{formatDate(orderItem.createdAt)}</TableCell>
                  );
                }
                if (columnKey === "orderAfterDiscount") {
                  return (
                    <TableCell>
                      {formatMoney(orderItem.orderAfterDiscount)}
                    </TableCell>
                  );
                }

                if (columnKey === "productId") {
                  return <TableCell>{orderItem.products.length}</TableCell>;
                }

                if (columnKey === "orderStatus") {
                  const statusLabel =
                    OrderStatus[
                      orderItem.orderStatus as keyof typeof OrderStatus
                    ];
                  const statusClass = statusColors[statusLabel];

                  return (
                    <TableCell className={`space-x-2 ${statusClass}`}>
                      {statusLabel}
                    </TableCell>
                  );
                }
                return (
                  <TableCell>{getKeyValue(orderItem, columnKey)}</TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {viewDetail && (
        <ModalOrderDetail
          handleCloseDialog={handleCancelViewOrderDetail}
          isDialogOpen={viewDetail}
          orderId={orderId}
        />
      )}
    </div>
  );
}
