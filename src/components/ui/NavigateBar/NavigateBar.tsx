"use client";

import TransitionLink from "./TransitionLink";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import "./NavigateBar.css";
import { usePathname } from "next/navigation";

function NavigateName({
  isHidden,
  handleToggleNavbar,
}: {
  isHidden: boolean;
  handleToggleNavbar: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const path = usePathname();
  const [pathName, setPathname] = useState("");

  useEffect(() => {
    switch (path) {
      case "/":
        setPathname("Trang chủ");
        break;
      case "/shop":
        setPathname("Cửa hàng");
        break;
      case "/marketplace":
        setPathname("Tìm bạn");
        break;
      case "/message":
        setPathname("Tin nhắn");
        break;
      case "/user/profile":
        setPathname("Thông tin");
        break;
      case "/booking":
        setPathname("Đặt lịch spa");
        break;
      case "/user/account":
        setPathname("Tài khoản");
        break;
      case "/user/service-list":
        setPathname("Dịch vụ");
        break;
      case "/user/order-history":
        setPathname("Đơn hàng");
        break;
      case "/user/change-voucher":
        setPathname("Đổi voucher");
        break;

      default:
        break;
    }
  }, [path]);

  return (
    <motion.button
      onClick={handleToggleNavbar}
      animate={{
        opacity: isHidden ? 1 : 0,
        display: isHidden ? "block" : "none",
      }}
      transition={{ delay: 0.3 }}
      className={`w-fit min-w-max max-w-max select-none`}
    >
      {pathName}
    </motion.button>
  );
}

interface NavigateBarProps {
  onTop?: boolean;
}

export default function NavigateBar({ onTop }: NavigateBarProps) {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  function handleToggleNavbar() {
    setIsHidden((prevState) => !prevState);
  }

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous) {
      if (latest > previous && latest > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(true);
      }
    }
  });

  return (
    <motion.div
      initial={false}
      animate={{
        width: isHidden ? 140 : 340,
      }}
      transition={{
        type: "spring",
        stiffness: 50, // Độ cứng của lò xo (giá trị càng cao, bounce càng nhanh)
        damping: 6, // Lực cản (giá trị càng thấp, bounce càng nhiều)
        mass: 0.4, // Khối lượng của đối tượng (khối lượng lớn hơn sẽ làm chậm chuyển động)
      }}
      className={`glass-navbar fixed ${onTop ? "top-1" : "bottom-8"} left-1/2 z-[60] flex -translate-x-1/2 overflow-x-hidden rounded-full text-white shadow-md`}
    >
      <div className="relative flex items-center gap-2 py-2 pr-4 text-[14px]">
        <button
          onClick={handleToggleNavbar}
          className="flex h-full w-full items-center justify-center rounded-full px-4"
        >
          <div className="relative size-4">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-white" />
            <div
              className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-white transition delay-75 duration-300 ${isHidden ? "" : "rotate-90"}`}
            />
          </div>
        </button>
        <NavigateName
          handleToggleNavbar={handleToggleNavbar}
          isHidden={isHidden}
        />
        <TransitionLink isHidden={isHidden} href="/" label="Trang chủ" />
        <TransitionLink isHidden={isHidden} href="/shop" label="Cửa hàng" />
        <TransitionLink isHidden={isHidden} href="/booking" label="Đặt lịch" />
      </div>
    </motion.div>
  );
}
