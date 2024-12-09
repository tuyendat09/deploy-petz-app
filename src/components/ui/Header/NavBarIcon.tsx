"use client";

import { motion } from "framer-motion";
import { HeaderContext } from "./_store/header-context";
import { useContext } from "react";

const topVariants = {
  open: { rotate: -45 },
  close: { rotate: 0 },
};

const middleVarians = {
  open: { scaleX: 0 },
  close: { scaleX: 1 },
};

const bottomVariants = {
  open: { rotate: 45, translateY: 3 },
  close: { rotate: 0, translateY: 0 },
};

const NavBarIcon = () => {
  const { handleToggleMenu, openMenu } = useContext(HeaderContext);
  return (
    <>
      <button onClick={handleToggleMenu} className="flex flex-col gap-1">
        <motion.div
          animate={openMenu ? "open" : "closed"}
          variants={topVariants}
          className="h-1 w-7 origin-right rounded-[20px] bg-white"
        />
        <motion.div
          animate={openMenu ? "open" : "closed"}
          variants={middleVarians}
          className="h-1 w-7 origin-right rounded-[20px] bg-white"
        />
        <motion.div
          variants={bottomVariants}
          animate={openMenu ? "open" : "closed"}
          className="h-1 w-7 origin-right rounded-[20px] bg-white"
        />
      </button>
    </>
  );
};

export default NavBarIcon;
