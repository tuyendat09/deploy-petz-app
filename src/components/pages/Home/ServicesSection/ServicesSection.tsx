/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ServicesImageSection from "@@/public/images/services-image-setion.png";
import ServicesItem from "./ServicesItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "swiper/css";
import "./ServicesSection.css";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";

export default function ServicesSection() {
  const images = [
    "/images/services-image-1.png",
    "/images/services-image-2.png",
    "/images/services-image-3.png",
    "/images/services-image-4.png",
    "/images/services-image-5.png" as any,
  ];

  return (
    <section className="mt-[150px] overflow-hidden">
      <div className="ml-[60px]">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="w-1/2">
            <div>
              <div className="mb-4 flex items-center">
                <div className="w-1/6 lg:w-1/4">
                  <ResponsiveImage
                    additionClass="rounded-button"
                    imageSrc={ServicesImageSection}
                    altImage="Services Image Section"
                    imageWidth={500}
                    imageHeight={500}
                  />
                </div>
                <div className="text-[32px] font-bold text-black md:text-[44px] lg:text-[80px] xl:text-[100px] 2xl:text-[132px]">
                  DỊCH VỤ
                </div>
              </div>
            </div>
          </div>
          <Swiper
            className="w-full lg:w-1/2"
            modules={[Autoplay]}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              1700: {
                slidesPerView: 2,
                spaceBetween: 60,
              },
            }}
            speed={5000}
            autoplay={{
              delay: 0,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
              waitForTransition: true,
            }}
          >
            {[...images, ...images].map((src, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true });
              return (
                <SwiperSlide className="h-[600px]" key={index}>
                  <motion.div
                    ref={ref}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 30,
                    }}
                    transition={{
                      type: "spring",
                      delay: 0.3 * index,
                    }}
                  >
                    <ServicesItem
                      imageSrc={src}
                      servicesText="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem, maxime."
                      servicesTitle="Chăm sóc móng"
                    />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="">
          <div className="text-display font-bold text-primary lg:text-h2 xl:text-h1 2xl:text-display">
            PETZ
          </div>
          <div className="my-4 w-full min-w-[200px] text-h4 md:w-1/2 md:text-base lg:w-1/3">
            Dịch vụ spa chuyên nghiệp cho thú cưng, từ chăm sóc lông, da đến thư
            giãn. Chúng tôi cam kết mang lại sự thoải mái và an toàn tối đa cho
            thú cưng của bạn
          </div>
          <NormalTransitionLink
            className="rounded-full bg-primary px-6 py-2 text-white"
            href="/booking"
          >
            Đặt lịch ngay
          </NormalTransitionLink>
        </div>
      </div>
    </section>
  );
}
