import {
  ServiceQueryParams,
  useGetServicesPaginateQuery,
} from "@/libs/features/services/services";
import { useEffect, useMemo, useState } from "react";

interface useServicesActionProps {
  initialPage: number;
}

export default function useServicesAction({
  initialPage,
}: useServicesActionProps) {
  const [pages, setPages] = useState<number>(initialPage);

  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editServices, setEditServices] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteServices, setDeleteServices] = useState<string>("");
  const [queryParams, setQueryParams] = useState<ServiceQueryParams>({});
  const { data: services } = useGetServicesPaginateQuery({
    page: pages,
    limit: 5,
    ...queryParams,
  });
  useEffect(() => {
    setTotalPages(services?.totalPages);
  }, [services]);

  function handleSetPage(page: number) {
    setPages(page);
  }

  function handleAddServices() {
    setAddModalOpen(true);
  }

  function handleCancelAddServices() {
    setAddModalOpen(false);
  }

  function handleEditServices(id: string) {
    setEditModalOpen(true);
    setEditServices(id);
  }

  function handleCancelEdit() {
    setEditModalOpen(false);
  }

  function handleDeleteServices(id: string) {
    setDeleteModalOpen(true);
    setDeleteServices(id);
  }

  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  const [selectedKeys, setSelectedKeys] = useState(new Set(["Loại dịch vụ"]));
  const [bookingOrder, setbookingOrder] = useState(
    new Set(["Sắp xếp theo lượt đặt"]),
  );

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  const bookingOrderSelect = useMemo(
    () => Array.from(bookingOrder).join(", "),
    [bookingOrder],
  );

  useEffect(() => {
    if (selectedValue !== "Loại dịch vụ") {
      setQueryParams((prev) => ({ ...prev, serviceType: selectedValue }));
    }
    if (bookingOrderSelect !== "Sắp xếp theo lượt đặt") {
      setQueryParams((prev) => ({
        ...prev,
        bookingAmount: bookingOrderSelect as any,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, bookingOrderSelect]);

  function clearQueryParams() {
    setQueryParams({});
    setSelectedKeys(new Set(["Loại dịch vụ"]));
  }

  return {
    services,
    pages,
    totalPages,
    handleSetPage,
    handleAddServices,
    handleCancelAddServices,
    handleEditServices,
    handleCancelEdit,
    handleDeleteServices,
    handleCancelDelete,
    addModalOpen,
    editModalOpen,
    editServices,
    deleteModalOpen,
    deleteServices,
    setSelectedKeys,
    selectedValue,
    clearQueryParams,
    setbookingOrder,
    bookingOrderSelect,
  };
}
