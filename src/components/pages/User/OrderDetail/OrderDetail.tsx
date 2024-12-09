"use client";

import OrderSumary from "./OrderSumary";
import OrderDetailInfo from "./OrderDetailInfo";
import { useGetOrdersByOrderIdQuery } from "@/libs/features/services/order";
import formatDate from "@/utils/formatDate";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

interface OrderDetailProps {
  orderId: string;
}

export default function OrderDetail({ orderId }: OrderDetailProps) {
  const { data: orderById } = useGetOrdersByOrderIdQuery({ orderId: orderId });
  const router = useRouter();

  return (
    <div className="container px-4 py-14 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
      <div className="item-start flex flex-col justify-start space-y-2">
        <button
          onClick={() => {
            router.push("./");
          }}
          className="flex items-center gap-1"
        >
          <Icon icon="tabler:chevron-left" />
          Quay về
        </button>
        <h1 className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
          {orderById &&
            "#" +
              (orderById as any)[0]._id.substring(
                (orderById as any)[0]._id.length - 4,
              )}
        </h1>
        <p className="text-base font-medium leading-6 text-gray-600">
          {orderById && formatDate(orderById[0].createdAt)}
        </p>
      </div>
      <div className="jusitfy-center mt-10 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
        <OrderSumary
          products={orderById && (orderById[0].products as any)}
          order={orderById && (orderById as any)}
        />

        <div className="flex w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 md:items-start md:p-6 xl:w-96 xl:p-8">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Khách hàng
          </h3>
          <OrderDetailInfo order={orderById && orderById} />
        </div>
      </div>
    </div>
  );
}
