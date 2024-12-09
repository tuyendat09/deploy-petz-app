/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyGetOrdersByUserIdQuery } from "@/libs/features/services/order";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function useOrdersHistoryAction() {
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Status"]));

  const [getOrderByUserId, { data: orderList }] =
    useLazyGetOrdersByUserIdQuery();

  const [userId, setUserId] = useState<string | undefined>();
  const [cancelOrder, setCancelOrder] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState("");

  const [queryParams, setQueryParams] = useState<{
    year?: number;
    month?: number;
    day?: number;
    orderStatus?: string;
  }>({});

  const handleDateChange = async (date: any) => {
    const year = date.year;
    const month = date.month - 1;
    const day = date.day;
    setQueryParams({ year, month: month + 1, day });
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    if (session) {
      setUserId(session.user._id);
    }
  }, [session]);

  useEffect(() => {
    if (selectedValue !== "Status") {
      setQueryParams((prev) => ({ ...prev, orderStatus: selectedValue }));
    }
  }, [selectedKeys]);

  useEffect(() => {
    if (userId) {
      getOrderByUserId({ userId, ...queryParams });
    }
  }, [userId, queryParams, getOrderByUserId]);

  function handleCancelOrder(cancelOrderId: string) {
    setCancelOrder(true);
    setCancelOrderId(cancelOrderId);
  }

  function handleCloseCancel() {
    setCancelOrder(false);
    setCancelOrderId("");
  }

  return {
    orderList,
    handleDateChange,
    setSelectedKeys,
    selectedValue,
    handleCancelOrder,
    cancelOrder,
    cancelOrderId,
    handleCloseCancel,
  };
}
