"use client";

import OrderFilter from "./OrderFilter";
import OrderTable from "./OrderTable";
import { OrderProvider } from "./store/OrderContext";

export default function Orders() {
  return (
    <OrderProvider>
      <p className="mb-4 w-fit rounded-full bg-black px-8 py-2 text-h4 font-bold text-white shadow-sm shadow-[#3b284e] dark:bg-black dark:text-white">
        Danh sách đơn hàng đã đặt
      </p>
      <OrderFilter />
      <OrderTable />
    </OrderProvider>
  );
}
