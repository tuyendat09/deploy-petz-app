import { useRouter } from "next/navigation";

interface OrderDetailInfoProps {
  order: any;
}

export default function OrderDetailInfo({ order }: OrderDetailInfoProps) {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
      <div className="flex flex-shrink-0 flex-col items-start justify-start gap-4">
        <div className="flex w-full items-center justify-center space-x-4 pt-4 md:justify-start">
          <div className="flex flex-col items-start justify-start">
            <p className="text-left text-base leading-4 text-gray-800">
              <span className="font-bold"> Tên: </span>
              {order && order[0].customerName}
            </p>
            <p className="text-sm leading-5 text-gray-600"></p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center space-x-4 border-b border-gray-200 pb-4 text-gray-800 md:justify-start">
          <p className="cursor-pointer text-sm leading-5">
            <span className="font-bold"> Email: </span>

            {order && order[0].customerEmail}
          </p>
        </div>
      </div>

      {/* Contact infomation */}
      <div className="mt-6 flex w-full flex-col items-stretch justify-between md:mt-0 xl:h-full">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
            <p className="text-center text-base font-semibold leading-4 text-gray-800 md:text-left">
              Giao đến
            </p>
            <p className="w-48 text-center text-sm leading-5 text-gray-600 md:text-left lg:w-full xl:w-48">
              {order && order[0].customerAddress}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 md:items-start md:justify-start">
            <p className="text-center text-base font-semibold leading-4 text-gray-800 md:text-left">
              Số điện thoại
            </p>
            <p className="w-48 text-center text-sm leading-5 text-gray-600 md:text-left lg:w-full xl:w-48">
              {order && order[0].customerPhone}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:items-start md:justify-start">
          <button
            onClick={() => {
              router.push("./");
            }}
            className="mt-6 w-96 border border-gray-800 py-5 text-center text-base font-medium leading-4 text-gray-800 transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 md:mt-0 2xl:w-full"
          >
            Về lịch sử đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}
