"use client";
import CartStepper from "@/components/pages/Cart/CartStepper";
import useSearchMap from "@/components/pages/User/Account/_hooks/useSearchMap";
import { MapSearchType } from "@/types/Map";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./index.css";
import { Radio, RadioChangeEvent, message } from "antd";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import Image from "next/image";
import Voucher from "./voucher";
import { Field, FieldProps, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { UserState } from "@/types/User";
import { useDispatch } from "react-redux";
import userSlice from "@/libs/features/user/user";
import { useInsertOrderMutation } from "@/libs/features/services/order";
import { errorModal, successModal } from "@/utils/callModalANTD";
import { useRouter } from "next/navigation";
import { useHandlePaymentMomoMutation } from "@/libs/features/services/payment";
interface CartItem {
  productId: string;
  productName: string;
  productOption: string;
  productPrice: number;
  productQuantity: number;
  salePercent: number;
  productImage: string;
  productSlug: string;
}

export const Index = () => {
  const session = useSession();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isDisplay, setIsDisplay] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState<CartItem[]>([]);
  const [shippingDiscount, setShippingDiscount] = useState(0);
  const activeStep = 1;
  const [addresses, setAddresses] = useState<MapSearchType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucherId, setVoucherId] = useState("");
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const [salePercent, setSalePercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  let shippingFee = 38000;
  const [insertOrder, { data: insertResponse, isLoading, error: insertError }] =
    useInsertOrderMutation();
  const [handlePaymentMomo, { data: response }] =
    useHandlePaymentMomoMutation();
  const [addressSelected, setAddressSelected] = useState<string | null>(null);
  const router = useRouter();
  const voucher = useSelector(
    (state: { user: UserState }) => state.user.voucher,
  );
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { update: sessionUpdate } = useSession();
  const { handleAutoComplete } = useSearchMap();
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "") {
      const response = await handleAutoComplete(e.currentTarget.value);
      setAddresses(response);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  const formatCurrency = (amount: any) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`;
  };

  const unauthenticatedCarts = useSelector(
    (state: RootState) => state.cart?.items || [],
  );
  const success = () => {
    message.success(<div>Voucher đã áp dụng thành công</div>);
  };
  const handleChangeVoucher = () => {
    const voucher = {
      voucherId: voucherId,
      discount: salePercent,
    };
    dispatch(userSlice.actions.setVoucher(voucher));
    if (voucher.voucherId !== '' || shippingDiscount > 0) {
      success();
    }
  };
  const authStatus = session.status;
  const cartItems = session.data?.user?.userCart?.cartItems || [];
  const data = (
    authStatus === "authenticated" ? cartItems : unauthenticatedCarts
  ) as CartItem[];
  const initialTotal = itemsToDisplay?.reduce((acc: any, item: any) => {
    const price = item?.salePercent > 0
      ? item.productPrice - (item.productPrice * item.salePercent) / 100
      : item.productPrice;
    
    return acc + price * item.productQuantity;
  }, 0);

  useEffect(() => {
    setItemsToDisplay(data);
    const discount = voucher?.discount ?? 0;
    let finalTotal = initialTotal + shippingFee;

    if (voucherId && discount > 0) {
      const voucherDiscount = (initialTotal * discount) / 100;
      finalTotal -= voucherDiscount;
    }

    if (shippingDiscount > 0) {
      finalTotal -= shippingDiscount;
    }

    if (voucherId && flatDiscount > 0) {
      finalTotal -= flatDiscount;
    }
    finalTotal = Math.max(finalTotal, 0);
    setTotal(finalTotal);
    const appliedDiscount = (voucherId !== "" && discount > 0)
      ? (initialTotal * salePercent) / 100
      : 0;

    setDiscount(appliedDiscount);
  }, [voucherId, handleChangeVoucher, session, shippingDiscount, flatDiscount]);

  useEffect(() => {
    if (paymentMethod === "COD" && insertResponse) {
      sessionUpdate({
        ...session,
        user: {
          ...session?.data?.user,
          userCart: {
            _id: session?.data?.user.userCart._id,
            cartItems: [],
          },
        },
      });
      successModal({ content: "Đặt hàng thành công về trang chủ sau 3s" });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }

    if (insertError) {
      errorModal({ content: (insertError as any).data.message });
    }
  }, [insertError, insertResponse]);

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Họ và tên là bắt buộc."),
    customerEmail: Yup.string().required("Email là bắt buộc."),
    customerPhone: Yup.string()
      .required("Số điện thoại là bắt buộc.")
      .matches(/^[0-9]+$/, "Phone must be a number")
      .min(10, "Số điện thoại ít nhất 10 số")
      .max(10, "Số điện thoại không quá 11 số"),
  });

  return (
    <>
      <div className="mt-[100px] px-[30px] pb-[50px]">
        <Formik
          initialValues={{
            customerName: "",
            customerEmail: session.data?.user?.userEmail,
            customerPhone: session.data?.user?.userPhone,
            customerAddress: "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, {}) => {
            const formData = {
              ...values,
              customerAddress: addressSelected,
              paymentMethod: paymentMethod,
              orderTotal: initialTotal,
              voucherId: voucherId,
              orderDiscount: discount,
              userId: session.data?.user?._id,
              totalAfterDiscount: total,
              orderStatus: "PENDING",
              products: data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              orderDate: new Date().toISOString(),
            };

            if (paymentMethod === "COD") {
              insertOrder(formData as any).unwrap();
            }
            if (paymentMethod === "BANKING") {
              const insertResponse = await insertOrder(
                formData as any,
              ).unwrap();
              if (insertResponse) {
                const res = await handlePaymentMomo({
                  amount: total as any,
                  orderId: insertResponse.orderId,
                }).unwrap();
                if (res?.payUrl) {
                  router.push(res.payUrl);
                }
              }
            }
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="flex flex-row gap-[20px]">
              <div className="w-[62%]">
                <CartStepper activeStep={activeStep} />
                <div className="mt-[30px] flex flex-row gap-[30px]">
                  <div className="w-[60%]">
                    <h1 className="mb-[20px] text-[24px] font-[600]">
                      Địa chỉ giao hàng
                    </h1>

                    <div className="mt-[30px]">
                      <div className="flex flex-row items-center gap-[10px]">
                        <button className="rounded-[50%] bg-black p-[2px]">
                          <Icon
                            icon="ic:round-check"
                            color="white"
                            width={13}
                          />
                        </button>
                        <p className="font-[600]">Thông tin</p>
                      </div>
                      <div className="mt-[10px] flex flex-row justify-between gap-[25px]">
                        <Field name="customerName">
                          {({ field, meta }: FieldProps) => (
                            <div className="w-[50%]">
                              <input
                                {...field}
                                autoComplete="off"
                                placeholder="Họ tên"
                                className={`w-full rounded-[5px] border border-gray-200 px-[10px] py-[10px] outline-none transition duration-150 ease-in-out placeholder:text-[15px] placeholder:text-black focus:shadow-input ${meta.touched && meta.error ? "border-red-500" : ""}`}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-sm text-red-500">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                        <Field name="customerPhone">
                          {({ field, meta }: FieldProps) => (
                            <div className="w-[50%]">
                              <input
                                {...field}
                                autoComplete="off"
                                placeholder="Số điện thoại"
                                className={`w-full rounded-[5px] border border-gray-200 px-[10px] py-[10px] outline-none transition duration-150 ease-in-out placeholder:text-[15px] placeholder:text-black focus:shadow-input ${meta.touched && meta.error ? "border-red-500" : ""}`}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-sm text-red-500">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div>
                        <Field name="customerEmail">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <input
                                {...field}
                                value={field.value}
                                autoComplete="off"
                                placeholder="Email"
                                className={`mt-4 w-full rounded-[5px] border border-gray-200 px-[10px] py-[10px] outline-none transition duration-150 ease-in-out placeholder:text-[15px] placeholder:text-black focus:shadow-input ${meta.touched && meta.error ? "border-red-500" : ""}`}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-sm text-red-500">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="mt-4 w-[100%]">
                        <Autocomplete
                          defaultItems={addresses}
                          label="Địa chỉ"
                          name="customerAddress"
                          className="custom-autocomplete w-full"
                          onKeyUp={(e) => handleKeyUp(e)}
                          onSelectionChange={(value) => {
                            setAddressSelected(value as string | null);
                          }}
                          onInputChange={(value) => {
                            setAddressSelected(value);
                          }}
                          allowsCustomValue={true}
                        >
                          {(suggestion) => (
                            <AutocompleteItem key={suggestion.label}>
                              {suggestion.label}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      </div>
                    </div>
                  </div>
                  <div className="w-[40%]">
                    <h1 className="text-[24px] font-[600]">
                      Phương thức giao hàng
                    </h1>
                    <div className="mt-[20px] flex flex-row items-center gap-[15px] rounded-br-[30px] rounded-tl-[30px] border border-gray-200 px-[25px] pb-[30px] pt-[25px]">
                      <button className="rounded-[50%] bg-black p-[2px]">
                        <Icon icon="ic:round-check" color="white" width={13} />
                      </button>
                      <p className="font-[500]">Chuyển phát nhanh</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-[40px]">
                    <h1 className="text-[24px] font-[600]">
                      Phương thức thanh toán
                    </h1>
                    <div className="mt-[20px] rounded-br-[30px] rounded-tl-[30px] border border-gray-200 px-[20px] pb-[30px] pt-[25px]">
                      <span className="text-[14px] text-gray-500">
                        Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ
                        tín dụng sẽ không bao giờ được lưu lại.
                      </span>
                      <div className="mt-[20px]">
                        <div>
                          <Radio.Group
                            onChange={onChange}
                            value={paymentMethod}
                            className="flex flex-col gap-[15px]"
                          >
                            <Radio value="COD" className="custom-radio">
                              Thanh toán khi giao hàng
                            </Radio>
                            <Radio value="BANKING" className="custom-radio">
                              Thanh toán bằng Momo
                            </Radio>
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <button
                      type="button"
                      onClick={() => setIsDisplay(!isDisplay)}
                      className="flex items-center justify-center rounded-[25px] border border-black bg-black px-[45px] py-[10px] text-[15px] tracking-[0.8px] text-white transition duration-200 ease-in-out hover:bg-white hover:text-black"
                    >
                      HIỂN THỊ SẢN PHẨM
                    </button>
                  </div>

                  <div
                    className={`${isDisplay ? "block" : "hidden"} mt-[30px]`}
                  >
                    <h1 className="text-[20px] font-[500]">Giỏ hàng của bạn</h1>
                    <table className="cart-table">
                      <thead>
                        <tr>
                          <th>TÊN SẢN PHẨM</th>
                          <th>GIÁ</th>
                          <th>SỐ LƯỢNG</th>
                          <th>TỔNG TIỀN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itemsToDisplay.map((item: any, i: number) => {
                          return (
                            <tr key={i}>
                              <td>
                                <div className="flex flex-row items-center gap-[10px]">
                                  <Image
                                    unoptimized
                                    src={item?.productImage}
                                    width={60}
                                    height={60}
                                    alt=""
                                  />
                                  <div>
                                    <h1 className="text-[17px]">
                                      {item?.productName}
                                    </h1>
                                    <p className="text-[15px]">
                                      {item?.productOption}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-[17px]">
                                {item?.salePercent > 0 ? formatCurrency(item?.productPrice - ((item?.productPrice * item?.salePercent) / 100)) : formatCurrency(item?.productPrice)}
                              </td>
                              <td>
                                <span className="rounded-br-[15px] rounded-tl-[15px] border border-gray-200 bg-gray-100 px-[40px] py-[10px] text-[17px]">
                                  {item?.productQuantity}
                                </span>
                              </td>
                              <td className="text-[18px] font-[500]">
                                {item.salePercent > 0
                                  ? formatCurrency((item?.productPrice - ((item?.productPrice * item?.salePercent) / 100)) * item?.productQuantity) 
                                  : formatCurrency(item?.productPrice * item?.productQuantity)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="h-full w-[38%] bg-gray-50">
                <div>
                  <div className="p-[22px]">
                    <h1 className="text-[24px]">Tóm tắt đơn hàng</h1>
                    <div className="mt-[10px] flex flex-col gap-[12px]">
                      <div className="flex flex-row justify-between">
                        <span>Tổng tiền hàng</span>
                        <span>
                          {formatCurrency(initialTotal)}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between">
                        <span>Giảm giá voucher:</span>
                        <span className="text-primary">
                          {discount !== 0
                            ? "-" + formatCurrency(discount)
                            : flatDiscount !== 0 ? "-" + formatCurrency(flatDiscount) : 0}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(shippingFee)}</span>
                      </div>
                      {shippingDiscount > 0 && (
                        <div className="flex flex-row justify-between">
                          <span>Giảm giá phí vận chuyển:</span>
                          <span>-{formatCurrency(shippingDiscount)}</span>
                        </div>
                      )}
                      <div className="flex flex-row justify-between">
                        <span>Tiền thanh toán:</span>
                        <span className="text-[17px] font-[500]">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-[20px] w-full rounded-br-[15px] rounded-tl-[15px] border border-black bg-black py-[15px] text-[15px] font-[500] text-white transition duration-200 ease-in-out hover:bg-white hover:text-black"
                  >
                    TIẾP TỤC THANH TOÁN
                  </button>
                </div>
                <div className="mt-[20px] flex flex-row justify-between rounded-[5px] bg-yellow-50 px-[20px] py-[10px]">
                  <div className="flex flex-row items-center gap-[7px]">
                    <Icon
                      icon="mdi:voucher-outline"
                      width={20}
                      color="#AD3E39"
                    />
                    <span>Voucher</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="font-[500] text-primary z-10"
                  >
                    Chọn
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Voucher
        setFlatDiscount={setFlatDiscount}
        total={initialTotal}
        setShippingDiscount={setShippingDiscount}
        setSalePercent={setSalePercent}
        handleChangeVoucher={handleChangeVoucher}
        voucherId={voucherId}
        setVoucherId={setVoucherId}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </>
  );
};
