import { useGetBookingQuery } from "@/libs/features/services/booking";
import { useEffect, useMemo, useState } from "react";
import { BookingQueryParams } from "@/libs/features/services/booking";

interface useBookingActionProps {
  initialPage: number;
}

export default function useBookingAction({
  initialPage,
}: useBookingActionProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Status"]));
  const [queryParams, setQueryParams] = useState<BookingQueryParams>({});

  const [page, setPage] = useState(initialPage);
  const { data: bookingList } = useGetBookingQuery({
    ...queryParams,
    limit: 4,
    page: page,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (bookingList) {
      setTotalPages(bookingList.totalPages);
    }
  }, [bookingList]);

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

  return {
    bookingList,
    handleDateChange,
    setSelectedKeys,
    selectedValue,
    handleClearDate,
    handleCustomerNameSearch,
    handleSetPage,
    page,
    totalPages,
  };
}
