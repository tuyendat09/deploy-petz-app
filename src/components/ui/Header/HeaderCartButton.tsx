import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/libs/features/cart/cart";
import { RootState } from "@/libs/store";

export default function HeaderCartButton() {
  const dispatch = useDispatch();
  const toggleCart = useSelector((state: RootState) => state.cart?.openCart);

  function handleToggleCart() {
    dispatch(cartAction.toggle());
  }

  if (typeof document !== "undefined") {
    document.body.style.overflow = toggleCart ? "hidden" : "auto";
  }

  return (
    <>
      <li>
        <button onClick={handleToggleCart}>Giỏ hàng</button>
      </li>
    </>
  );
}
