"use client";

import { VoucherType } from "@/types/Voucher";
import { useVoucherContext } from "../store/ChangeVoucherContext";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";

const columns = [
  {
    key: "voucherPoint",
    label: "ĐIỂM",
  },
  {
    key: "sale",
    label: "GIẢM GIÁ",
  },
  {
    key: "voucherType",
    label: "KIỂU GIẢM GIÁ",
  },
  {
    key: "maxRedemption",
    label: "ĐỔI TỐI ĐA",
  },
  {
    key: "expirationDate",
    label: "HẾT HẠN SAU ĐỔI",
  },
  {
    key: "voucherQuantity",
    label: "SỐ LƯỢNG CÒN",
  },
  {
    key: "limitedDate",
    label: "NGÀY HẾT HẠN",
  },

  {
    key: "voucherDescription",
    label: "MÔ TẢ",
  },
  {
    key: "totalToUse",
    label: "TỔNG ĐƠN",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function ChangeVoucherTable() {
  const {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    handleChangeVoucher,
    userPoint,
    session,
  } = useVoucherContext();

  return (
    <div className="mt-4 space-y-2">
      <p>
        <span className="font-bold">Điểm</span>: {userPoint}
      </p>
      <Table
        aria-label="Bảng hiển thị danh mục"
        className="w-full text-[10px]"
        checkboxesProps={{
          classNames: {
            icon: "bg-black h-full w-full",
          },
        }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              classNames={{
                cursor: "bg-black",
              }}
              page={pages}
              total={totalPages || 1}
              onChange={(page: number) => handleSetPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={voucher?.vouchers || []}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) =>
                columnKey === "action" ? (
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleChangeVoucher({
                          voucherPoint: item.voucherPoint,
                          userId: session?.user._id as any,
                          voucherId: item._id,
                        })
                      }
                      variant="flat"
                      size="sm"
                      color="success"
                    >
                      Đổi Voucher
                    </Button>
                  </TableCell>
                ) : columnKey === "_id" ? (
                  <TableCell className="font-bold">
                    {item._id.slice(-3).toUpperCase()}
                  </TableCell>
                ) : columnKey === "maxRedemption" ? (
                  <TableCell className="font-bold">
                    {item.maxRedemption || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "voucherType" ? (
                  <TableCell>
                    {VoucherType[item.voucherType as keyof typeof VoucherType]}
                  </TableCell>
                ) : columnKey === "expirationDate" ? (
                  <TableCell>{(item as any).expirationDate} ngày</TableCell>
                ) : columnKey === "voucherQuantity" ? (
                  <TableCell>
                    {item.voucherQuantity === 0
                      ? "Đã hết voucher"
                      : item.voucherQuantity || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "limitedDate" ? (
                  <TableCell>
                    {formatDate(item.limitedDate) || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "totalToUse" ? (
                  <TableCell>
                    {formatMoney(item.totalToUse) || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "sale" ? (
                  <TableCell>
                    {item.voucherType === "FLAT_DISCOUNT" &&
                      formatMoney(item.flatDiscountAmount)}
                    {(item.voucherType !== "FLAT_DISCOUNT" &&
                      item.salePercent) ||
                      item.shippingDiscountAmount}
                    {item.voucherType !== "FLAT_DISCOUNT" && "%"}
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
