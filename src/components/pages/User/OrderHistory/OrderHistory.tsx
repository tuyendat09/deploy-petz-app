"use client";
import {
  DatePicker,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import useOrdersHistoryAction from "./_hook/useGetOrderAction";
import { OrderStatus } from "@/types/Order";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";
import Link from "next/link";
import ModalCancelOrder from "./Modal/ModalCancelOrder";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";

const columns = [
  {
    key: "createdAt",
    label: "NGÀY ĐẶT",
  },
  {
    key: "productCount",
    label: "SẢN PHẨM",
  },
  {
    key: "paymentMethod",
    label: "PHƯƠNG THỨC THANH TOÁN",
  },
  {
    key: "totalPrice",
    label: "GIÁ TIỀN",
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

export default function OrdersHistory() {
  const {
    orderList,
    handleDateChange,
    selectedValue,
    setSelectedKeys,
    handleCancelOrder,
    cancelOrder,
    cancelOrderId,
    handleCloseCancel,
  } = useOrdersHistoryAction();

  const isPastDate = (createdAt: string) => {
    const orderDate = new Date(createdAt);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const differenceInTime = todayDate.getTime() - orderDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays >= 1;
  };

  return (
    <>
      <div className="">
        <h1 className="mb-6 text-2xl font-semibold">Lịch sử đơn hàng</h1>
        <div className="mb-6 flex gap-4">
          <DatePicker
            aria-label="Chọn ngày"
            onChange={(date) => handleDateChange(date)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {OrderStatus[selectedValue as keyof typeof OrderStatus] ||
                  "Status"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Multiple selection example"
              variant="flat"
              closeOnSelect={false}
              disallowEmptySelection
              selectionMode="single"
              onSelectionChange={setSelectedKeys as any}
            >
              {Object.keys(OrderStatus).map((statusKey) => (
                <DropdownItem key={statusKey}>
                  {OrderStatus[statusKey as keyof typeof OrderStatus]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Table
          classNames={{
            th: ["bg-black", "text-white", "border-b", "border-divider"],
          }}
          aria-label="Example table with dynamic content"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"Bạn chưa đặt đơn hàng nào."}
            items={orderList || []}
          >
            {(orderItem: any) => (
              <TableRow key={orderItem._id}>
                {(columnKey) => {
                  if (columnKey === "createdAt") {
                    return (
                      <TableCell>{formatDate(orderItem.createdAt)}</TableCell>
                    );
                  }
                  if (columnKey === "productCount") {
                    return (
                      <TableCell>{orderItem.products?.length || 0} </TableCell>
                    );
                  }
                  if (columnKey === "paymentMethod") {
                    return (
                      <TableCell>
                        {orderItem.paymentMethod === "COD"
                          ? "Thanh toán khi nhận hàng"
                          : orderItem.paymentMethod === "BANKING"
                            ? "Thanh toán bằng ngân hàng"
                            : orderItem.paymentMethod}
                      </TableCell>
                    );
                  }
                  if (columnKey === "totalPrice") {
                    return (
                      <TableCell>
                        {formatMoney((orderItem as any).totalAfterDiscount)}
                      </TableCell>
                    );
                  }
                  if (columnKey === "orderStatus") {
                    return (
                      <TableCell>
                        {
                          OrderStatus[
                            orderItem.orderStatus as keyof typeof OrderStatus
                          ]
                        }
                      </TableCell>
                    );
                  }
                  if (columnKey === "action") {
                    const pastDate = isPastDate(orderItem.createdAt as any);

                    return (
                      <TableCell className="space-x-2">
                        <Button variant="flat" size="sm" color="default">
                          <NormalTransitionLink
                            className="cursor-pointer"
                            href={`order-history/${orderItem._id}`}
                          >
                            Xem
                          </NormalTransitionLink>
                        </Button>

                        {!pastDate &&
                          orderItem.orderStatus !== "CANCELLED" &&
                          orderItem.orderStatus !== "PAID" && (
                            <Button
                              variant="flat"
                              size="sm"
                              color="danger"
                              isDisabled={pastDate}
                              onClick={() => {
                                handleCancelOrder(orderItem._id);
                              }}
                            >
                              Hủy
                            </Button>
                          )}
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
        {cancelOrder && (
          <ModalCancelOrder
            isDialogOpen={cancelOrder}
            orderId={cancelOrderId}
            handleCloseDialog={handleCloseCancel}
          />
        )}
      </div>
    </>
  );
}
