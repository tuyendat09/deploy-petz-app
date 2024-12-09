import { useGetOrdersQuery } from "@/libs/features/services/order";
import { BaseOrderQuery } from "@/libs/features/services/order";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { useEffect, useState } from "react";
interface useOrdergActionProps {
  initialPage: number;
}

export default function useOrdergAction({ initialPage }: useOrdergActionProps) {
  const [statusFilter, setStatusFilter] = useState(new Set(["Status"]));
  const [productQuantityFilter, setProductQuantityFilter] = useState(
    new Set(["Số lượng đặt"]),
  );
  const [orderTotalFilter, setOrderTotalFilter] = useState(
    new Set(["Tổng tiền"]),
  );
  const [userFilter, setUserFilter] = useState(new Set(["Khách"]));
  const [queryParams, setQueryParams] = useState<BaseOrderQuery>({
    totalPriceSort: "asc",
  });
  const [viewDetail, setViewDetail] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [page, setPage] = useState(initialPage);
  const { data: orderList, isLoading } = useGetOrdersQuery({
    ...queryParams,
    limit: 20,
    page: page,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (orderList) {
      setTotalPages(orderList?.totalPages);
    }
  }, [orderList]);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const handleDateChange = async (date: any) => {
    const year = date.year;
    const month = date.month - 1;
    const day = date.day;

    setQueryParams({ year, month: month + 1, day });
  };

  const handleClearDate = async () => {
    setQueryParams({
      totalPriceSort: "asc", // Reset về giá trị mặc định
    });
    setStatusFilter(new Set(["Status"]));
    setOrderTotalFilter(new Set(["Tổng tiền"]));
    setProductQuantityFilter(new Set(["Số lượng đặt"]));
    setUserFilter(new Set(["Khách"]));
  };

  useEffect(() => {
    if (formatSelectedKeys(statusFilter) !== "Status") {
      setQueryParams((prev) => ({
        ...prev,
        orderStatus: formatSelectedKeys(statusFilter),
      }));
    }
    if (formatSelectedKeys(productQuantityFilter) !== "Số lượng đặt") {
      setQueryParams((prev) => ({
        ...prev,
        productQuantitySort: formatSelectedKeys(productQuantityFilter),
      }));
    }
    if (formatSelectedKeys(userFilter) !== "Khách") {
      setQueryParams((prev) => ({
        ...prev,
        userId: formatSelectedKeys(userFilter),
      }));
    }
  }, [productQuantityFilter, statusFilter, userFilter]);

  // Lắng nghe sự thay đổi của orderTotalFilter để cập nhật queryParams
  useEffect(() => {
    const totalSortValue = formatSelectedKeys(orderTotalFilter);
    setQueryParams((prev) => ({
      ...prev,
      totalPriceSort: totalSortValue,
    }));
  }, [orderTotalFilter]);

  const handleCustomerNameSearch = (value: string) => {
    if (value === "") {
      setQueryParams((prev) => {
        const { customerName, ...rest } = prev;
        return rest;
      });
    } else {
      setQueryParams((prev) => ({
        ...prev,
        customerName: value,
      }));
    }
  };

  const handleViewOrderDetail = (orderId: string) => {
    setViewDetail(true);
    setOrderId(orderId);
  };

  const handleCancelViewOrderDetail = () => {
    setViewDetail(false);
    setOrderId("");
  };

  return {
    isLoading,
    orderList,
    handleDateChange,
    setStatusFilter,
    statusFilter,
    handleClearDate,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
    orderTotalFilter,
    productQuantityFilter,
    userFilter,
    setProductQuantityFilter,
    setOrderTotalFilter,
    setUserFilter,
  };
}
