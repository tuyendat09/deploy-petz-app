"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import useVoucherAction from "./_hooks/useVoucherAction";
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
  Button,
} from "@nextui-org/react";
import ModalAdd from "./ModalVoucher/ModalAdd";
import ModalDelete from "./ModalVoucher/ModalDelete";
import { useState } from "react";
import { useDeleteVoucherMutation } from "@/libs/features/services/voucher";
import ModalEdit from "./ModalVoucher/ModalEdit";
import ButtonAdmin from "../../UI/Sidebar/ButtonAdmin";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";

const columns = [
  {
    key: "_id",
    label: "ID VOUCHER",
  },
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
    key: "limitedDate",
    label: "NGÀY HẾT HẠN ",
  },
  {
    key: "voucherQuantity",
    label: "SỐ LƯỢNG CÒN LẠI",
  },

  {
    key: "voucherDescription",
    label: "MÔ TẢ",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export default function VoucherTable() {
  const {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    handleAddVoucher,
    addModalOpen,
    handleCancelAddVoucher,
    handleDeleteVoucher,
    deleteVoucher,
    handleCancelDelete,
    deleteModalOpen,
    editVoucher,
    handleEditVoucher,
    handleCancelEdit,
    editModalOpen,
  } = useVoucherAction({ initialPage: 1 });

  const [deleteVoucherMutation] = useDeleteVoucherMutation();

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);

  const handleSelectedRows = (selectedKeys: any) => {
    if (selectedKeys === "all") {
      const allIds = voucher?.vouchers.map((item) => item._id);
      setSelectedIds(allIds as any);
    } else {
      const selectedIdsArray = Array.from(selectedKeys);
      setSelectedIds(selectedIdsArray as any);
    }
  };

  function handleDeleteMultiple() {
    deleteVoucherMutation({ deleteVoucherId: selectedIds as any });
  }

  return (
    <div className="mt-8">
      <p className="w-fit rounded-full bg-black px-8 py-2 text-h4 font-bold text-white shadow-sm shadow-[#3b284e] dark:bg-black dark:text-white">
        Voucher
      </p>
      <div className="flex items-center justify-end gap-4">
        {selectedIds.length > 0 && (
          <Button
            onClick={handleDeleteMultiple}
            color="danger"
            className="block w-fit px-4 py-2 text-white"
          >
            Xóa
          </Button>
        )}

        <ButtonAdmin
          onClick={handleAddVoucher}
          className="block w-fit bg-[#f2f2f2] px-4 py-2 text-black hover:bg-[#e0e0e0]"
        >
          + Thêm voucher
        </ButtonAdmin>
      </div>
      <Table
        selectionMode="multiple"
        aria-label="Bảng hiển thị danh mục"
        className="mt-4 w-full"
        onSelectionChange={(selectedKeys: any) => {
          handleSelectedRows(selectedKeys);
        }}
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
            <TableRow className="dark:text-white" key={item._id}>
              {(columnKey) =>
                columnKey === "action" ? (
                  <TableCell>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditVoucher(item._id)}
                    >
                      <Icon className="size-6" icon="uil:edit" />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteVoucher(item._id)}
                    >
                      <Icon className="size-6" icon="mdi:trash-outline" />
                    </button>
                  </TableCell>
                ) : columnKey === "_id" ? (
                  <TableCell className="font-bold">
                    {item._id.slice(-3).toUpperCase()}
                  </TableCell>
                ) : columnKey === "voucherType" ? (
                  <TableCell>
                    {VoucherType[item.voucherType as keyof typeof VoucherType]}
                  </TableCell>
                ) : columnKey === "expirationDate" ? (
                  <TableCell>{item.expirationDate as any} ngày</TableCell>
                ) : columnKey === "maxRedemption" ? (
                  <TableCell className="font-bold">
                    {item.maxRedemption || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "limitedDate" ? (
                  <TableCell className="font-bold">
                    {formatDate(item.limitedDate) || "Không giới hạn"}
                  </TableCell>
                ) : columnKey === "voucherQuantity" ? (
                  <TableCell className="font-bold">
                    {item.voucherQuantity || "Không giới hạn"}
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
      {addModalOpen && (
        <ModalAdd
          isDialogOpen={addModalOpen}
          handleCloseDialog={handleCancelAddVoucher}
        />
      )}
      {deleteModalOpen && (
        <ModalDelete
          isDialogOpen={deleteModalOpen}
          handleCloseDialog={handleCancelDelete}
          voucherId={deleteVoucher}
        />
      )}
      {editModalOpen && (
        <ModalEdit
          isDialogOpen={editModalOpen}
          handleCloseDialog={handleCancelEdit}
          voucherId={editVoucher}
        />
      )}
    </div>
  );
}
