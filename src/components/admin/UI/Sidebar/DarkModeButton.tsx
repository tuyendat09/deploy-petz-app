"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function handleDarkMode() {
    setIsDarkMode((prevState) => !prevState);
    document.querySelector("body")?.classList.toggle("dark");
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log(mediaQuery);
    setIsDarkMode(mediaQuery.matches);
    document
      .querySelector("body")
      ?.classList.toggle("dark", mediaQuery.matches);

    const handleChange = (e: any) => {
      setIsDarkMode(e.matches);
      document
        .querySelector("body")
        ?.classList.toggle("dark", mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return (
    <div
      onClick={handleDarkMode}
      className={`flex h-7 w-14 cursor-pointer items-center rounded-full bg-[#76a5ff] p-1 transition-colors duration-300 dark:bg-black`}
    >
      <div
        className={`relative h-5 w-5 transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        <p className="absolute top-1/2 -translate-y-1/2 text-white">
          {isDarkMode ? (
            <>
              <Icon className="size-6" icon="mdi:moon-waxing-crescent" />
              <motion.div
                key={3}
                transition={{ delay: 0.4 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: isDarkMode ? 1 : 0, y: 0 }}
                className="absolute bottom-[4px] right-[33px] text-white"
              >
                <Icon className="size-[4px]" icon="mdi:moon-full" />
              </motion.div>
              <motion.div
                transition={{ delay: 0.8 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: isDarkMode ? 1 : 0, y: 0 }}
                key={4}
                className="absolute bottom-[15px] right-[17px] text-white"
              >
                <Icon className="size-[4px]" icon="mdi:moon-full" />
              </motion.div>
              <motion.div
                transition={{ delay: 0.6 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: isDarkMode ? 1 : 0, y: 0 }}
                key={5}
                className="absolute bottom-[11px] right-[25px] text-white"
              >
                <Icon className="size-[5px]" icon="mdi:moon-full" />
              </motion.div>

              <motion.div
                transition={{ delay: 0.5 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: isDarkMode ? 1 : 0, y: 0 }}
                key={6}
                className="absolute right-[32px] top-0 text-white"
              >
                <Icon
                  className="size-[16px]"
                  icon="material-symbols-light:star"
                />
              </motion.div>
              <motion.div
                transition={{ delay: 0.58 }}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: isDarkMode ? 1 : 0, y: 0 }}
                key={7}
                className="absolute bottom-0 right-[16px] text-white"
              >
                <Icon
                  className="size-[12px]"
                  icon="material-symbols-light:star"
                />
              </motion.div>
            </>
          ) : (
            <>
              <Icon className="size-6" icon="mdi:moon-full" />
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 4 }}
                transition={{ delay: 0.6 }}
                animate={{ opacity: isDarkMode ? 0 : 1, y: 0 }}
                className="absolute -right-[20px] bottom-2.5 text-white"
              >
                <Icon className="size-[10px]" icon="mdi:moon-full" />
              </motion.div>
              <motion.div
                key={2}
                transition={{ delay: 0.5 }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: isDarkMode ? 0 : 1, y: 0 }}
                className="absolute -right-[10px] top-2.5 text-white"
              >
                <Icon className="size-[8px]" icon="mdi:moon-full" />
              </motion.div>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
