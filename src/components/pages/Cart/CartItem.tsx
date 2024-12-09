import formatMoney from "@/utils/formatMoney";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartAction } from "@/libs/features/cart/cart";
import { useSession } from "next-auth/react";
import {
  useAdjustQuantityMutation,
  useRemoveItemFromCartMutation,
} from "@/libs/features/services/cart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";
import { AdjustQuantity } from "@/types/Cart";
import Link from "next/link";
import calculateSalePrice from "@/utils/caculateSalePrice";

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

interface CartItemProps {
  cartItem: CartItem;
  authenticatedCartId?: string;
}

export default function CartItem({
  cartItem,
  authenticatedCartId,
}: CartItemProps) {
  const dispatch = useDispatch();
  const session = useSession();
  const authStatus = session.status;
  const { update: sessionUpdate } = useSession();
  const { salePrice } = calculateSalePrice(
    cartItem?.salePercent,
    cartItem?.productPrice,
  );

  const [removeItemFromCart, { data: cartAfterRemoveItem }] =
    useRemoveItemFromCartMutation();
  const [adjustQuantity, { data: cartAfterAdjust }] =
    useAdjustQuantityMutation();

  const handleIncreaseQuantity = (productId: string, productOption: string) => {
    if (authStatus === "authenticated") {
      const adjustObject: AdjustQuantity = {
        adjustOption: "increase",
        cartId: authenticatedCartId,
        productId: cartItem.productId,
        productOption: cartItem.productOption,
      };
      adjustQuantity(adjustObject);
    } else {
      dispatch(cartAction.increaseQuantity({ productId, productOption }));
    }
  };

  const handleDecreaseQuantity = (productId: string, productOption: string) => {
    if (authStatus === "authenticated") {
      const adjustObject: AdjustQuantity = {
        adjustOption: "decrease",
        cartId: authenticatedCartId,
        productId: cartItem.productId,
        productOption: cartItem.productOption,
      };
      adjustQuantity(adjustObject);
    } else {
      dispatch(cartAction.decreaseQuantity({ productId, productOption }));
    }
  };

  const handleRemove = (productId: string, productOption: string) => {
    const removeObject = {
      productId: productId,
      productOption: productOption,
      cartId: session.data?.user?.userCart?._id,
    };

    if (authStatus === "authenticated") {
      removeItemFromCart(removeObject);
    } else {
      dispatch(cartAction.removeFromCart({ productId, productOption }));
    }
  };

  useEffect(() => {
    const cartData = [cartAfterRemoveItem, cartAfterAdjust];
    const updatedCart = cartData.find((cart) => cart);
    if (updatedCart) {
      sessionUpdate({
        ...session,
        user: {
          ...session?.data?.user,
          userCart: updatedCart,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartAfterRemoveItem, cartAfterAdjust]);
  return (
    <tr>
      <td>
        <Link
          href={`shop/${cartItem?.productSlug}`}
          className="flex flex-row items-center gap-[20px]"
        >
          <Image
            unoptimized
            src={cartItem?.productImage}
            width={100}
            height={100}
            alt=""
          />
          <div>
            <h2>{cartItem?.productName}</h2>
            <p className="text-gray-800">{cartItem.productOption}</p>
          </div>
        </Link>
      </td>
      <td className="text-center">
        {cartItem?.productPrice && formatMoney(salePrice)}
        {cartItem?.salePercent !== 0 && (
          <span className="ml-1 rounded-full bg-primary px-2 py-1 text-[14px] text-white">
            {-cartItem?.salePercent}%
          </span>
        )}
      </td>
      <td>
        <div className="flex justify-center">
          <div className="flex items-center gap-[5px] rounded-lg border px-3 py-1">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() =>
                handleDecreaseQuantity(
                  cartItem.productId,
                  cartItem.productOption as string,
                )
              }
            >
              <Icon icon="gravity-ui:minus" />
            </button>
            <input
              type="text"
              value={cartItem.productQuantity}
              className="w-8 border-none bg-transparent text-center text-gray-700 outline-none"
              readOnly
            />
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() =>
                handleIncreaseQuantity(
                  cartItem.productId,
                  cartItem.productOption as string,
                )
              }
            >
              <Icon icon="gravity-ui:plus" />
            </button>
          </div>
        </div>
      </td>
      <td className="text-center">
        <p className="font-medium text-gray-700">
          {formatMoney(salePrice * cartItem.productQuantity)}
        </p>
      </td>
      <td>
        <button
          className="rounded-[10px] bg-slate-200 p-[10px] hover:bg-slate-300"
          onClick={() =>
            handleRemove(cartItem?.productId, cartItem?.productOption as string)
          }
        >
          <Icon icon="iconamoon:trash" width={20} />
        </button>
      </td>
    </tr>
  );
}
