import OrderDetailProduct from "./OrderDetailProduct";
import OrderDetailTotal from "./OrderDetailTotal";

interface OrderSumaryProps {
  products: any[];
  order: any[];
}

export default function OrderSumary({ products, order }: OrderSumaryProps) {
  return (
    <>
      <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
        <div className="flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 md:p-6 md:py-6 xl:p-8">
          <p className="text-lg font-semibold leading-6 text-gray-800 md:text-xl xl:leading-5">
            Sản Phẩm
          </p>
          <OrderDetailProduct product={products} />
        </div>

        <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8">
          <OrderDetailTotal order={order && order[0]} />
        </div>
      </div>
    </>
  );
}
