import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useGetOrdersByOrderIdQuery } from "@/libs/features/services/order";
import { Order, OrderStatus } from "@/types/Order";
import Image from "next/image";

interface ModalOrderDetailProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  orderId: string;
}

const columns = [
  {
    key: "productName",
    label: "TÊN SẢN PHẨM",
  },
  {
    key: "productThumbnail",
    label: "HÌNH ẢNH",
  },

  {
    key: "productPrice",
    label: "GIÁ SẢN PHẨM",
  },
  {
    key: "productOption",
    label: "Số lượng sản phẩm",
  },
];

export default function ModalOrderDetail({
  isDialogOpen,
  handleCloseDialog,
  orderId,
}: ModalOrderDetailProps) {
  const { data } = useGetOrdersByOrderIdQuery({ orderId: orderId });
  const [orderDetail, setOrderDetail] = useState<Order>();
  useEffect(() => {
    if (data) {
      setOrderDetail(data[0]);
    }
  }, [data]);

  return (
    <Modal
      size="2xl"
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
              Xác nhận thông tin
            </ModalHeader>
            <ModalBody>
              <p>
                <span className="font-bold">Tên khách hàng:</span>{" "}
                {orderDetail?.customerName}
              </p>
              <p>
                <span className="font-bold">Số điện thoại:</span>{" "}
                {orderDetail?.customerPhone}
              </p>
              <p>
                <span className="font-bold">Địa chỉ:</span>{" "}
                {orderDetail?.customerAddress}
              </p>
              <Table aria-label="Chi tiết sản phẩm">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={orderDetail?.products || []}>
                  {(data) => {
                    const selectedOption = (
                      data as any
                    ).productId.productOption.find(
                      (option: any) =>
                        option.name === (data as any).productOption,
                    );

                    const isOnSale = (data as any).productId.salePercent > 0;
                    const salePrice = isOnSale
                      ? (selectedOption?.productPrice || 0) *
                        ((100 - (data as any).productId.salePercent) / 100)
                      : selectedOption?.productPrice || 0;

                    return (
                      <TableRow key={data.productId}>
                        <TableCell>
                          {(data as any).productId.productName}
                        </TableCell>
                        <TableCell>
                          <Image
                            src={(data as any).productId.productThumbnail}
                            alt="product"
                            style={{ width: "80px", height: "100px" }}
                            width={500}
                            height={500}
                          />
                        </TableCell>
                        <TableCell>{formatMoney(salePrice)}</TableCell>
                        <TableCell>
                          {" "}
                          {(data as any)?.productQuantity} x{" "}
                          {selectedOption?.name}
                        </TableCell>
                      </TableRow>
                    );
                  }}
                </TableBody>
              </Table>
              <p>
                <span className="font-bold">Tổng tiền đơn hàng:</span>{" "}
                {formatMoney(orderDetail?.orderTotal)}
              </p>
              <p>
                <span className="font-bold">Giảm giá:</span>{" "}
                {formatMoney((orderDetail as any)?.orderDiscount)}
              </p>
              <p>
                <span className="font-bold">Thành tiền sau giảm:</span>{" "}
                {formatMoney((orderDetail as any)?.totalAfterDiscount)}
              </p>
              <p>
                <span className="font-bold">Trạng thái:</span>{" "}
                {
                  OrderStatus[
                    (orderDetail as any)
                      ?.orderStatus as keyof typeof OrderStatus
                  ]
                }
              </p>
              <p>
                <span className="font-bold">Ngày tạo:</span>{" "}
                {formatDate(orderDetail?.createdAt)}
              </p>
              <div className="flex gap-4">
                <Button color="danger" onPress={handleCloseDialog}>
                  Hủy đơn
                </Button>
                <Button
                  color="success"
                  className="text-white"
                  onPress={handleCloseDialog}
                >
                  Giao thành công
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
