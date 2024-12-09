"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./index.css";
import { useSession } from "next-auth/react";
import CartItem from "./CartItem";
import formatMoney from "@/utils/formatMoney";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { cartAction } from "@/libs/features/cart/cart";
import { useAdjustQuantityMutation } from "@/libs/features/services/cart";
import { AdjustQuantity } from "@/types/Cart";
import { useEffect, useState } from "react";
import cartImg from "@@/assets/images/cartImg.png";
import cartImg2 from "@@/public/images/cartImg2.png";
import Image from "next/image";
import CartStepper from "./CartStepper";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import calculateSalePrice from "@/utils/caculateSalePrice";
const CartPage = () => {
  useEffect(() => {
    document.body.classList.remove("dark");

    // Xóa lớp "dark" khỏi body khi component unmount
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  const activeStep = 0;
  const session = useSession();
  const authStatus = session.status;
  const [adjustQuantity, { data: cartAfterAdjust }] =
    useAdjustQuantityMutation();
  const { update: sessionUpdate } = useSession();
  const dispatch = useDispatch();
  const cartItems = session.data?.user?.userCart?.cartItems;
  const unauthenticatedCarts = useSelector(
    (state: RootState) => state.cart?.items || [],
  );

  const [itemsToDisplay, setItemToDisplay] = useState<any>();

  useEffect(() => {
    if (authStatus == "authenticated") {
      setItemToDisplay(cartItems);
    } else {
      setItemToDisplay(unauthenticatedCarts);
    }
  }, [cartItems, unauthenticatedCarts]);

  const authenticatedCartId = session.data?.user?.userCart?._id;

  function handleClearCart() {
    if (authStatus === "authenticated") {
      const adjustObject: AdjustQuantity = {
        adjustOption: "clearAll",
        cartId: authenticatedCartId,
      };
      adjustQuantity(adjustObject);
    } else {
      dispatch(cartAction.clearCart());
    }
  }

  useEffect(() => {
    const cartData = [cartAfterAdjust];
    const updatedCart = cartData.find((cart) => cart);
    if (updatedCart) {
      sessionUpdate({
        ...session,
        user: {
          _id: session?.data?.user._id,
          username: session.data?.user.username,
          ...session?.data?.user,
          userCart: updatedCart,
        },
      });
    }
  }, [cartAfterAdjust]);
  const totalPrice = itemsToDisplay?.reduce((acc: any, item: any) => {
    const price =
      item?.salePercent > 0
        ? item.productPrice - (item.productPrice * item.salePercent) / 100
        : item.productPrice;

    return acc + price * item.productQuantity;
  }, 0);
  return (
    <div className="flex min-h-screen flex-col items-center px-[100px] py-10">
      <div className="w-full rounded-lg p-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-[60%] flex-col justify-end px-[50px] text-center">
            <h2>Cửa hàng thức ăn thú cưng</h2>
            <h1 className="mt-[20px] text-[50px] font-[500] leading-[60px] text-black">
              Cửa hàng thú cưng cho Những Người Bạn Lông Xù
            </h1>
            <div className="mt-[30px] flex justify-center">
              <NormalTransitionLink href="/shop">
                <button
                  type="button"
                  className="flex flex-row items-center gap-[7px] rounded-[30px] border-2 border-black px-[15px] py-[7px] transition duration-200 ease-in hover:bg-black hover:text-white"
                >
                  <span className="font-[500]">Tiếp tục mua</span>
                  <Icon icon="mingcute:arrow-right-line" />
                </button>
              </NormalTransitionLink>
            </div>
            <div className="mt-[70px] flex justify-center">
              <Image src={cartImg2} width={250} height={400} alt="" />
            </div>
          </div>
          <div className="w-[40%]">
            <Image src={cartImg} width={600} height={400} alt="" />
          </div>
        </div>
        <div className="mt-[20px] flex flex-row justify-between">
          <div className="mb-4">
            <div className="mb-[10px] flex flex-row items-center">
              <Icon icon="uil:cart" width={50} />
              <h1 className="mt-[10px] text-[30px] font-semibold">Giỏ hàng</h1>
            </div>
          </div>
          <div>
            <CartStepper activeStep={activeStep} />
          </div>
        </div>
        {itemsToDisplay?.length ? (
          <>
            <div className="flex justify-end">
              <button
                className="border-b-2 border-primary text-primary"
                onClick={handleClearCart}
              >
                Xóa tất cả
              </button>
            </div>
            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng phụ</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsToDisplay?.map((item: any) => (
                    <CartItem
                      authenticatedCartId={authenticatedCartId}
                      key={item.productId}
                      cartItem={item as any}
                    />
                  ))}
                  <tr>
                    <td className="border-b-0"></td>
                    <td className="border-b-0"></td>
                    <td colSpan={2}>
                      <div className="flex flex-row items-center justify-between">
                        <h4 className="font-[500]">Thành tiền:</h4>
                        <h3 className="text-[20px] font-[500]">
                          {formatMoney(totalPrice)}
                        </h3>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b-0"></td>
                    <td className="border-b-0"></td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td className="border-b-0"></td>
                    <td className="border-b-0"></td>
                    <td
                      className="border-b-0 text-[15px] text-gray-800"
                      colSpan={2}
                    >
                      <NormalTransitionLink
                        className="w-full rounded-[20px] bg-primary py-[12px] text-center font-bold text-white"
                        href="/cart/place-order"
                      >
                        <button>THANH TOÁN</button>
                      </NormalTransitionLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>Giỏ hàng trống.</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
