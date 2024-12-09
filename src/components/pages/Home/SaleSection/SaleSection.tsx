"use client";

import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { useGetProductsQuery } from "@/libs/features/services/product";
import { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SaleSection() {
  const { data: Products } = useGetProductsQuery({ salePercent: 1, limit: 4 });

  useEffect(() => {
    if (Products) {
      ScrollTrigger.refresh();
    }
  }, [Products]);

  console.log(Products);

  return (
    <section className="mt-[250px]">
      <div className="container">
        <div>
          <div className="relative z-10 text-[32px] font-bold uppercase md:text-h1 md:leading-[70px]">
            <div className="flex">
              <div className="relative h-full w-full">
                <div className="absolute p-4">
                  <span className="text-primary">Ưu đãi</span> tốt
                  <div>Cho bạn</div>
                </div>
                <video
                  className="h-[300px] w-full rounded-lg object-cover object-right lg:h-[400px] lg:object-center"
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="/video/sale-section-video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-4">
            {Products?.products.map((product) => (
              <ProductCard key={product._id} Product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
