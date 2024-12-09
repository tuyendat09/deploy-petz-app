import { useGetVouchersHeldQuery } from "@/libs/features/services/user";
import { Modal, Radio } from "antd";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSession } from "next-auth/react";
import type { RadioChangeEvent } from "antd";
import Link from "next/link";
import voucherImg from "@@/public/images/voucher.svg";
import Image from "next/image";
import { useState } from "react";
import formatMoney from "@/utils/formatMoney";
import dayjs from "dayjs";

interface VoucherProps {
  voucherId: string | null;
  total: number;
  setVoucherId: (id: string) => void;
  setShippingDiscount: (value: number) => void
  setFlatDiscount: (value: number) => void
  isModalOpen: boolean;
  handleCancel: () => void;
  setSalePercent: (id: number) => void;
  handleChangeVoucher: () => void;
}
const voucherType = ["ON_ORDER_SAVINGS", "FLAT_DISCOUNT", "SHIPPING_DISCOUNT"]
export default function Voucher({
  total,
  setSalePercent,
  handleChangeVoucher,
  voucherId,
  setVoucherId,
  isModalOpen,
  handleCancel,
  setShippingDiscount,
  setFlatDiscount
}: VoucherProps) {
  const session = useSession();
  const userId = session?.data?.user?._id;
  const [shippingVoucherId, setShippingVoucherId] = useState('');
  const { data, error, isLoading } = useGetVouchersHeldQuery(
    userId
      ? {
          userId,
          page: 1,
        }
      : skipToken,
  );

  const onChange = (e: RadioChangeEvent, salePercent: number) => {
    setVoucherId(e.target.value);
    setSalePercent(salePercent);
  };

  const onShippingDiscountChange = (e: RadioChangeEvent, salePercent: number) => {
    setShippingVoucherId(e.target.value);
    setShippingDiscount(salePercent);
  };

  const onFlatDiscountChange = (e: RadioChangeEvent, discount: number) => {
    setVoucherId(e.target.value);
    setFlatDiscount(discount);
  }
  if (isLoading) {
    return <div>Loading vouchers...</div>;
  }
  return (
    <>
      <Modal
        title="Chọn Voucher"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <hr className="mt-[15px]" />
        <div>
          {data?.vouchers?.length === 0 && (
            <div className="mt-[10px] flex flex-row items-center gap-[10px]">
              <span className="text-[17px] text-gray-500">
                Rất tiếc, bạn không có voucher nào !
              </span>
              <Link href="/user/change-voucher">
                <i className="text-[16px] font-[600] text-primary underline">
                  Đổi voucher ngay.
                </i>
              </Link>
            </div>
          )}

          <div className="mt-[20px] flex flex-col gap-[20px]">
            {data?.vouchers?.length !== 0 && (
              <div className="flex flex-row gap-[10px] items-center justify-end">
                <Link href="/user/change-voucher">
                  <i className="text-[16px] font-[600] text-primary underline">
                    Đổi voucher
                  </i>
                </Link>
                <button
                  className="text-red-300 hover:text-red-600"
                  onClick={() => {
                    setVoucherId("");
                    setSalePercent(0);
                    setShippingDiscount(0);
                    setShippingVoucherId("");
                    setFlatDiscount(0);
                  }}
                >
                  Xóa voucher
                </button>
              </div>
            )}
            {data?.vouchers?.filter(item => item.voucherId?.voucherType === voucherType[0])?.map((item, i) => (
              <div key={item.voucherId?._id || i} className={`flex flex-row gap-2.5 ${(total < Number(item.voucherId.totalToUse) || (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) < 0) ? 'bg-gray-400 opacity-50' : 'bg-primary'}`}>
                <div className="relative">
                  <Image 
                    src={voucherImg} 
                    width={220} 
                    height={100} 
                    alt={`Voucher ${item.voucherId?.voucherDescription || 'image'}`} 
                  />
                  <div className="absolute left-[34%] top-[25%] flex flex-row items-center gap-2.5">
                    <h1 className="text-[18px] font-bold text-[#633939]">
                      {item.voucherId?.salePercent || 0}%
                    </h1>
                  </div>
                </div>
                <div className="relative w-full py-2.5">
                  <div className="flex w-[90%] flex-col justify-center text-center">
                    <h1 className="text-white">
                      {item.voucherId?.voucherDescription || 'No description available'}
                    </h1>
                    <p className="text-white text-[13px]">
                      Đơn tối thiểu:
                      <span className="ml-[5px] text-[#FFFADD]">
                        {formatMoney(item.voucherId?.totalToUse) || 0}
                      </span>
                    </p>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center bg-gray-100">
                    {(total > Number(item.voucherId.totalToUse) && (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) > 0) && (
                      <Radio
                        value={item.voucherId?._id}
                        checked={voucherId === item.voucherId?._id}
                        onChange={(e) => onChange(e, item.voucherId?.salePercent)}
                        className="pl-1.5 custom-radio"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data?.vouchers?.filter(item => item.voucherId?.voucherType === voucherType[1])?.map((item, i) => (
              <div key={item.voucherId?._id || i} className={`flex flex-row gap-2.5 ${(total < Number(item.voucherId.totalToUse) || (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) < 0) ? 'bg-gray-400 opacity-50' : 'bg-primary'}`}>
                <div className="relative">
                  <Image 
                    src={voucherImg} 
                    width={220} 
                    height={100} 
                    alt={`Voucher ${item.voucherId?.voucherDescription || 'image'}`} 
                  />
                  <div className={`${item.voucherId?.flatDiscountAmount && item.voucherId.flatDiscountAmount < 1000000 ? 'left-[20%]' : 'left-[10%]'} absolute top-[27%] flex flex-row items-center gap-2.5`}>
                    <h1 className="text-[16px] font-bold text-[#633939]">
                      {formatMoney(item.voucherId?.flatDiscountAmount)}
                    </h1>
                  </div>
                </div>
                <div className="relative w-full py-2.5">
                  <div className="flex w-[90%] flex-col justify-center text-center">
                    <h1 className="text-white">
                      {item.voucherId?.voucherDescription || 'No description available'}
                    </h1>
                    <p className="text-white text-[13px]">
                      Đơn tối thiểu:
                      <span className="ml-[5px] text-[#FFFADD]">
                        {formatMoney(item.voucherId?.totalToUse) || 0}
                      </span>
                    </p>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center bg-gray-100">
                    {(total > Number(item.voucherId.totalToUse) && (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) > 0) && (
                      <Radio
                        value={item.voucherId?._id}
                        checked={voucherId === item.voucherId?._id}
                        onChange={(e) => onFlatDiscountChange(e, item.voucherId?.flatDiscountAmount || 0)}
                        className="pl-1.5 custom-radio"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data?.vouchers?.filter(item => item.voucherId?.voucherType === voucherType[2])?.map((item, i) => (
              <div key={item.voucherId?._id || i} className={`flex flex-row gap-2.5 ${(total < Number(item.voucherId.totalToUse) || (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) < 0) ? 'bg-gray-400 opacity-50' : 'bg-[#1fccb1]'}`}>
                <div className="relative">
                  <Image 
                    src={voucherImg} 
                    width={220} 
                    height={100} 
                    alt={`Voucher ${item.voucherId?.voucherDescription || 'image'}`} 
                  />
                  <div className={`${item.voucherId?.shippingDiscountAmount && item.voucherId.shippingDiscountAmount < 100000 ? 'left-[20%]' : 'left-[10%]'} absolute top-[28%] flex flex-row items-center gap-2.5`}>
                    <h1 className="text-[16px] font-bold text-[#633939]">
                      {formatMoney(item.voucherId?.shippingDiscountAmount) || 0}
                    </h1>
                  </div>
                </div>
                <div className="relative w-full py-2.5">
                  <div className="flex w-[90%] flex-col justify-center text-center">
                    <h1 className="text-white">
                      {item.voucherId?.voucherDescription || 'No description available'}
                    </h1>
                    <p className="text-white text-[13px]">
                      Đơn tối thiểu:
                      <span className="ml-[5px] text-[#FFFADD]">
                        {formatMoney(item.voucherId?.totalToUse) || 0}
                      </span>
                    </p>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center bg-gray-100">
                    {(total > Number(item.voucherId.totalToUse) && (dayjs(item.expirationDate).diff(dayjs(new Date()), 'day')) > 0) && (
                      <Radio
                        value={item.voucherId?._id}
                        checked={shippingVoucherId === item.voucherId?._id}
                        onChange={(e) => onShippingDiscountChange(e, item.voucherId.shippingDiscountAmount || 0)}
                        className="pl-1.5 custom-radio"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[30px] flex justify-end">
            <button
              className="h-[44px] w-[120px] rounded-[5px] bg-primary font-[600] text-white"
              onClick={handleChangeVoucher}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
