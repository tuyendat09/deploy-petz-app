import { useGetVouchersQuery } from "@/libs/features/services/voucher";
import { useEffect, useState } from "react";

interface useVoucherActionProps {
  initialPage: number;
}

export default function useVoucherAction({
  initialPage,
}: useVoucherActionProps) {
  const [pages, setPages] = useState<number>(initialPage);
  const { data: voucher, refetch } = useGetVouchersQuery({ page: pages });
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editVoucher, setEditVoucher] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteVoucher, setDeleteVoucher] = useState<string>("");

  useEffect(() => {
    setTotalPages(voucher?.totalPages);
  }, [voucher]);

  function handleSetPage(page: number) {
    setPages(page);
    refetch(); // Refetch data when page changes
  }

  pages;

  function handleAddVoucher() {
    setAddModalOpen(true);
  }

  function handleCancelAddVoucher() {
    setAddModalOpen(false);
  }

  function handleEditVoucher(id: string) {
    setEditModalOpen(true);
    setEditVoucher(id);
  }

  function handleCancelEdit() {
    setEditModalOpen(false);
  }

  function handleDeleteVoucher(id: string) {
    setDeleteModalOpen(true);
    setDeleteVoucher(id);
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  return {
    voucher,
    pages,
    totalPages,
    handleSetPage,
    handleEditVoucher,
    handleCancelEdit,
    editVoucher,
    editModalOpen,
    addModalOpen,
    handleAddVoucher,
    handleCancelAddVoucher,
    deleteModalOpen,
    handleDeleteVoucher,
    deleteVoucher,
    handleCancelDelete,
  };
}
