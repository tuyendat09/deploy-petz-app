import formatMoney from "@/utils/formatMoney";

interface OrderDetailTotalProps {
  order: any;
}

export default function OrderDetailTotal({ order }: OrderDetailTotalProps) {
  order;
  return (
    <div className="flex w-full flex-col space-y-6 bg-gray-50 px-4 py-6 md:p-6 xl:p-8">
      <h3 className="text-xl font-semibold leading-5 text-gray-800">
        Tổng tiền
      </h3>
      <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4" />
      <div className="flex w-full items-center justify-between">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Tổng đơn
        </p>
        <p className="text-base font-semibold leading-4 text-gray-600">
          {formatMoney(order && order.orderTotal)}
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Tiền giảm giá
        </p>
        <p className="text-base font-semibold leading-4 text-gray-600">
          {formatMoney(order && order.orderDiscount)}
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-base font-semibold leading-4 text-gray-800">
          Tổng tiền
        </p>
        <p className="text-base font-semibold leading-4 text-gray-600">
          {formatMoney(order && order.totalAfterDiscount)}
        </p>
      </div>
    </div>
  );
}
