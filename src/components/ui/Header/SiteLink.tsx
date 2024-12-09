"use client";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { HeaderContext } from "./_store/header-context";
import NavBarIcon from "./NavBarIcon";
import Menu from "./Menu";
import Search from "./Search/Search";
import HeaderSearchButton from "./HeaderSearchButton";
import LogInButton from "./LogInButton";
import NormalTransitionLink from "../NormalTransitionLink";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { cartAction } from "@/libs/features/cart/cart";

export default function SiteLink() {
  const { openMenu, openSearch } = useContext(HeaderContext);
  const session = useSession();
  const cartItems = session.data?.user?.userCart?.cartItems;
  const unauthenticatedCarts = useSelector(
    (state: RootState) => state.cart?.items || [],
  );
  const authStatus = session.status;
  const itemsToDisplay = authStatus === "authenticated" ? cartItems : unauthenticatedCarts;
  const dispatch = useDispatch();

  function handleToggleCart() {
    dispatch(cartAction.toggle());
  }
  return (
    <div className="fixed right-0 top-5 text-[12px] lg:right-16">
      <ul className="glass flex items-center justify-center gap-4 rounded-full px-4 py-2 text-white lg:gap-12 lg:px-8 lg:py-3 lg:text-base">
        <HeaderSearchButton />
        <LogInButton />
        <NormalTransitionLink href="/cart">
            <div className="flex flex-row gap-[7px]" onMouseEnter={handleToggleCart}>
              <p>Giỏ hàng</p>
              <span className="text-[12px]">( {itemsToDisplay ? itemsToDisplay.length : 0} )</span>
            </div>
        </NormalTransitionLink>
      </ul>

      <AnimatePresence>{openMenu && <Menu />}</AnimatePresence>
      <AnimatePresence>{openSearch && <Search />}</AnimatePresence>
    </div>
  );
}
