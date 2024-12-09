"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "@/libs/features/services/categories";

interface CategoriesSelectProps {
  handleFilterProduct: Function;
}

export default function CategoriesSelect({
  handleFilterProduct,
}: CategoriesSelectProps) {
  const [position, setPosition] = useState(-70);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: categoriesList } = useGetCategoriesQuery("");

  const categoriesRef = useRef<(HTMLButtonElement | null)[]>([]);

  function handleChangeCategory(
    index: number,
    ref: HTMLButtonElement | null,
    categoryName: string,
  ) {
    if (ref) {
      setPosition(ref.offsetTop - 76);
      setCurrentIndex(index);
      handleFilterProduct(categoryName);
    }
  }

  return (
    <div className="relative w-1/5">
      <motion.div
        animate={{
          top: position + "px",
        }}
        className="absolute -top-[70px] flex translate-y-[54px] items-center gap-4"
      >
        <div className="size-4 rounded-full bg-black"></div>
        <div className="rounded-xl h-0.5 w-48 bg-black"></div>
      </motion.div>

      <ul className="flex flex-col gap-8 text-h3">
        {(categoriesList as any)?.map((category: any, index: any) => (
          <li key={category._id} className="flex items-center gap-4">
            <button
              ref={(el) => {
                categoriesRef.current[index] = el;
              }}
              onClick={() =>
                handleChangeCategory(
                  index,
                  categoriesRef.current[index],
                  category._id,
                )
              }
              className={`${
                currentIndex === index ? "opacity-100" : "opacity-45"
              } transition delay-75 duration-300`}
            >
              {category.categoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
