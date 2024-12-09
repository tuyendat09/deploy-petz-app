import { useGetBookingByUserIdQuery } from "@/libs/features/services/booking";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function useServicesListAction() {
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Status"]));
  const [userId, setUserId] = useState();
  const [viewDetail, setViewDetail] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [bookingDetailId, setBookingDetailId] = useState("");

  const [queryParams, setQueryParams] = useState<{
    year?: number;
    month?: number;
    day?: number;
  }>({});

  const handleDateChange = async (date: any) => {
    const year = date.year;
    const month = date.month - 1;
    const day = date.day;

    setQueryParams({ year, month: month + 1, day });
  };

  const handleViewDetail = (bookingId: string) => {
    setViewDetail(true);
    setBookingDetailId(bookingId);
  };

  const handleCloseDetail = () => {
    setViewDetail(false);
    setBookingDetailId("");
  };

  const handleReview = (bookingId: string) => {
    setIsReview(true);
    setBookingDetailId(bookingId);
  };

  const handleCancelReview = () => {
    setIsReview(false);
    setBookingDetailId("");
  };

  const handleCancelBooking = (cancelBookingId: string) => {
    setCancelBooking(true);
    setCancelBookingId(cancelBookingId);
  };

  const handleCloseCancelBooking = () => {
    setCancelBooking(false);
    setCancelBookingId("");
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    if (selectedValue !== "Status") {
      setQueryParams((prev) => ({ ...prev, bookingStatus: selectedValue }));
    }
    if (session) {
      setUserId(session?.user._id as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, session]);

  const { data: bookingList } = useGetBookingByUserIdQuery({
    userId: userId && userId,
    ...queryParams,
  });

  return {
    bookingList,
    handleDateChange,
    setSelectedKeys,
    selectedValue,
    handleViewDetail,
    viewDetail,
    bookingDetailId,
    handleCloseDetail,
    handleReview,
    isReview,
    handleCancelReview,
    handleCancelBooking,
    cancelBookingId,
    cancelBooking,
    handleCloseCancelBooking,
  };
}
