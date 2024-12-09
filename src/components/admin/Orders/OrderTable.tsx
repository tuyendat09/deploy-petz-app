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
  Spinner,
} from "@nextui-org/react";
import { OrderAdmin, OrderStatus } from "@/types/Order";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import ModalOrderDetail from "./Modal/ModalDetail";

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
    key: "createAt",
    label: "NGÀY ĐẶT",
  },
  {
    key: "totalAfterDiscount",
    label: "TỔNG TIỀN",
  },
  {
    key: "productId",
    label: "SỐ SẢN PHẨM",
  },
  {
    key: "orderStatus",
    label: "TRẠNG THÁI",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

const statusColors = {
  [OrderStatus.DELIVERED]: "bg-green-700",
  [OrderStatus.PAID]: "bg-green-700",
  [OrderStatus.FAILED]: "bg-red-600",
  [OrderStatus.DELIVERING]: "bg-blue-600	",
  [OrderStatus.CANCELLED]: "bg-red-600",
  [OrderStatus.PENDING]: "bg-amber-500",
};

export default function OrderTable() {
  const {
    isLoading,
    orderList,
    page,
    totalPages,
    handleSetPage,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
  } = useOrderContext();

  const formatUserId = (userId: string | null) => {
    if (!userId) return "Khách lẻ";
    return userId.slice(-3).toUpperCase();
  };

  const loadingState = isLoading ? "loading" : "idle";

  return (
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
          emptyContent="Không tìm thấy đơn hàng nào"
          items={orderList?.orders || []}
        >
          {(orderItem: OrderAdmin) => (
            <TableRow key={orderItem._id}>
              {(columnKey) => {
                if (columnKey === "userId") {
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
                if (columnKey === "action") {
                  return (
                    <TableCell className="space-x-2">
                      <Button
                        variant="flat"
                        size="sm"
                        onClick={() => {
                          handleViewOrderDetail(orderItem._id);
                        }}
                      >
                        Xem
                      </Button>
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
