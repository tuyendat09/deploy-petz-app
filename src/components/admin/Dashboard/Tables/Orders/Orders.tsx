"use client";

import OrderTable from "./OrderTable";
import { OrderProvider } from "./store/OrderContext";

export default function Orders() {
  return (
    <OrderProvider>
      <OrderTable />
    </OrderProvider>
  );
}
