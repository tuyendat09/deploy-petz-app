import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartAction } from "@/libs/features/cart/cart";

export default function CartModal() {
  const dispatch = useDispatch();

  function handleToggleCart() {
    dispatch(cartAction.toggle());
  }

  return (
    <>
      <div
        onClick={handleToggleCart}
        className="fixed bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ translateX: 100 + "%" }}
        exit={{ translateX: 100 + "%" }}
        animate={{ translateX: 0 }}
        transition={{ type: "tween" }}
        className="glass fixed bottom-4 right-4 top-4 z-50 w-1/3 rounded-[20px] bg-white px-8 py-4"
      >
        <div className="flex h-full flex-col">
          <CartHeader />
          <div className="h-full overflow-y-auto text-white">Empty cart</div>
          <CartFooter />
        </div>
      </motion.div>
    </>
  );
}
