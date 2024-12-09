"use client";

import { VoucherType } from "@/types/Voucher";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useHeldVoucherContext } from "../store/HeldVoucherContext";
import formatDate from "@/utils/formatDate";
import formatMoney from "@/utils/formatMoney";

const columns = [
  {
    key: "_id",
    label: "ID VOUCHER",
  },
  {
    key: "quantity",
    label: "SỐ LƯỢNG",
  },
  {
    key: "sale",
    label: "GIẢM GIÁ",
  },
  {
    key: "expirationDate",
    label: "NGÀY HẾT HẠN",
  },
  {
    key: "redemptionCount",
    label: "ĐÃ ĐỔI",
  },
  {
    key: "voucherType",
    label: "KIỂU GIẢM GIÁ",
  },
  {
    key: "voucherDescription",
    label: "MÔ TẢ",
  },
];

export default function HeldVoucherTable() {
  const { voucher, pages, totalPages, handleSetPage } = useHeldVoucherContext();

  return (
    <div className="mt-4 space-y-2">
      <Table
        aria-label="Bảng hiển thị danh mục"
        className="w-full"
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
        <TableBody
          emptyContent={"Bạn chưa có voucher nào."}
          items={voucher?.vouchers || []}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => {
                if (columnKey === "_id") {
                  return (
                    <TableCell className="font-bold">
                      {item.voucherId &&
                        item.voucherId._id.slice(-3).toUpperCase()}
                    </TableCell>
                  );
                }

                if (columnKey === "sale") {
                  return (
                    <TableCell className="font-bold">
                      {item.voucherId.voucherType === "FLAT_DISCOUNT" &&
                        formatMoney(item.voucherId.flatDiscountAmount)}
                      {(item.voucherId.voucherType !== "FLAT_DISCOUNT" &&
                        item.voucherId.salePercent) ||
                        item.voucherId.shippingDiscountAmount}
                      {item.voucherId.voucherType !== "FLAT_DISCOUNT" && "%"}
                    </TableCell>
                  );
                }

                if (columnKey === "voucherType") {
                  return (
                    <TableCell>
                      {item.voucherId &&
                        VoucherType[
                          item.voucherId.voucherType as keyof typeof VoucherType
                        ]}
                    </TableCell>
                  );
                }
                if (columnKey === "salePercent") {
                  return (
                    <TableCell>
                      {item.voucherId && item.voucherId.salePercent}%
                    </TableCell>
                  );
                }
                if (columnKey === "expirationDate") {
                  const expirationDate = new Date(item.expirationDate);
                  const currentDate = new Date();

                  return (
                    <TableCell>
                      {expirationDate.getTime() < currentDate.getTime() ? (
                        <span className="rounded-full bg-red-600 px-4 py-1 text-white">
                          Hết hạn
                        </span>
                      ) : (
                        formatDate(expirationDate.toISOString())
                      )}
                    </TableCell>
                  );
                }

                if (columnKey === "voucherDescription") {
                  return (
                    <TableCell>
                      {item.voucherId && item.voucherId.voucherDescription}
                    </TableCell>
                  );
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
