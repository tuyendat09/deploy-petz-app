"use client";

import { useState, useRef } from "react";
import ProductSlider from "./ProductSlider";
import CategoryButton from "./CategoryButton";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { Icon } from "@iconify/react/dist/iconify.js";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type FilterProductState = { productBuy: number } | { sortBy: string };

export default function Categories() {
  const triggerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (triggerRef.current) {
      gsap.to("body", {
        background: "#0d0d0d",
        color: "#ffffff",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          start: "top 70%",
          end: "bottom 75%",
          onEnter: () => document.body.classList.add("dark"),
          onLeaveBack: () => document.body.classList.remove("dark"),
        },
      });
    }
  }, []);

  const [filterOption, setFilterOption] = useState<FilterProductState>({
    sortBy: "lastest",
  });
  const [currentFilter, setCurrentFilter] = useState("lastest");

  function handleFilterProduct(filterOption: string) {
    switch (filterOption) {
      case "lastest":
        setFilterOption({ sortBy: "latest" });
        setCurrentFilter("lastest");
        break;

      case "bestseller":
        setFilterOption({ productBuy: 100 });
        setCurrentFilter("bestseller");
        break;

      default:
        setFilterOption({ sortBy: "latest" });
    }
  }

  return (
    <section className="container mt-[200px] text-center">
      <p
        ref={triggerRef}
        className="relative translate-y-10 text-[82px] dark:text-white md:text-[172px] lg:translate-y-20"
      >
        Products
      </p>
      <ProductSlider filterOption={filterOption} />
      <div className="relative z-10 mb-8">
        <div className="space-x-4">
          <div className="flex items-center justify-between gap-2 text-[16px] font-bold md:text-[32px]">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="relative z-10 flex flex-row gap-[10px]">
                <CategoryButton
                  currentFilter={currentFilter}
                  filterOption="lastest"
                  handleFilter={handleFilterProduct}
                  buttonLabel="Mới nhất"
                />
                <CategoryButton
                  currentFilter={currentFilter}
                  filterOption="bestseller"
                  handleFilter={handleFilterProduct}
                  buttonLabel="Bán chạy nhất"
                />
              </div>
            </div>
            <NormalTransitionLink
              href="/shop"
              className="ml-auto flex flex-row items-center gap-[7px] text-[12px] font-[500] dark:text-white md:text-[17px]"
            >
              <span>Xem tất cả</span>
              <Icon icon="lsicon:right-filled" width={20} />
            </NormalTransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
