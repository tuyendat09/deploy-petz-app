import { useGetOrdersQuery } from "@/libs/features/services/order";
import { BaseOrderQuery } from "@/libs/features/services/order";
import { useEffect, useMemo, useState } from "react";
interface useOrdergActionProps {
  initialPage: number;
}

export default function useOrdergAction({ initialPage }: useOrdergActionProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Status"]));
  const [queryParams, setQueryParams] = useState<BaseOrderQuery>({});
  const [viewDetail, setViewDetail] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [page, setPage] = useState(initialPage);
  const { data: orderList } = useGetOrdersQuery({
    ...queryParams,
    totalPriceSort: "asc",
    limit: 6,
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
    setQueryParams({});
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    if (selectedValue !== "Status") {
      setQueryParams((prev) => ({ ...prev, bookingStatus: selectedValue }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

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
    orderList,
    handleDateChange,
    setSelectedKeys,
    selectedValue,
    handleClearDate,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
    handleViewOrderDetail,
    viewDetail,
    orderId,
    handleCancelViewOrderDetail,
  };
}
