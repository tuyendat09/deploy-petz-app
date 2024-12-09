import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { cartAction } from "@/libs/features/cart/cart";
export default function CartHeader() {
  const dispatch = useDispatch();

  function handleToggleCart() {
    dispatch(cartAction.toggle());
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-300 pb-4 text-white">
      <h1 className="text-2xl">Your cart</h1>
      <button
        onClick={handleToggleCart}
        className="grid size-8 place-items-center rounded-full border border-gray-300"
      >
        <Icon icon="ic:round-close" style={{ color: "#1d1d1d" }} />
      </button>
    </div>
  );
}
