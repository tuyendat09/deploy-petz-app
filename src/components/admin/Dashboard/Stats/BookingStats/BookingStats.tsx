"use client";

import { Skeleton } from "@nextui-org/react";
import { useBookingStats } from "./_hooks/useStatsAction";
import formatMoney from "@/utils/formatMoney";

export default function BookingStats() {
  const {
    startDate,
    endDate,
    report,
    data,
    handleGenerateReport,
    setStartDate,
    setEndDate,
    isLoading,
    error,
  } = useBookingStats();

  if (isLoading) {
    return (
      <>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </>
    );
  }

  let errorMessage = "Đã xảy ra lỗi!";
  if (error && "data" in error) {
    errorMessage = (error.data as any)?.message || "Lỗi không xác định";
  } else if (error && "status" in error) {
    errorMessage = `Lỗi mạng: ${error.status}`;
  }

  if (error) return <div>Error: {errorMessage}</div>;

  return (
    <div className="relative z-20 mt-8 w-full rounded-lg bg-white p-8 shadow-lg dark:bg-[#18181b] dark:text-white">
      <div className="mb-4 flex items-center">
        <h1 className="text-2xl font-semibold">Báo cáo doanh thu</h1>
      </div>

      <div className="mb-2 mt-6">Thời gian báo cáo</div>
      <div className="mb-6 flex gap-4">
        <input
          type="date"
          className="w-1/2 rounded-lg border border-black p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="w-1/2 rounded-lg border border-black p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerateReport}
          className="mt-2 rounded-full bg-green-600 px-6 py-2 font-medium text-white"
        >
          Xem Báo Cáo →
        </button>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-semibold">Doanh thu lịch đặt</h2>
        <div className="space-y-5">
          <div className="flex justify-between">
            <span className="font-medium">Tổng tiền</span>
            <span className="text-gray-500">
              {formatMoney(data.totalBooking)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Số đơn hàng đã bán</span>
            <span className="text-gray-500">{data.bookingsDone} đơn</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Số đơn hàng đã hủy</span>
            <span className="text-gray-500">{data.bookingsCancelled} đơn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
