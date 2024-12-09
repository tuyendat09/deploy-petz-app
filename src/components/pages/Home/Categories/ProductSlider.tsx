import ProductBox from "@/components/ui/ProductCard/ProductCard";
import { useGetProductsQuery } from "@/libs/features/services/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import { useCursorHover } from "@/components/ui/Cursor/_store/CursorContext";

gsap.registerPlugin(ScrollTrigger);

interface ProductSliderProps {
  filterOption?: any;
}

export default function ProductSlider({ filterOption }: ProductSliderProps) {
  const { handleMouseEnterActionButton, handleMouseLeaveActionButton } =
    useCursorHover();

  const { data } = useGetProductsQuery({
    ...filterOption,
    limit: 8,
    page: 1,
  });

  useEffect(() => {
    if (data) {
      ScrollTrigger.refresh();
    }
  }, [data]);

  return (
    <div>
      <Swiper
        className="relative z-50"
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 2,
          minimumVelocity: 0,
        }}
        modules={[FreeMode]}
        breakpoints={{
          375: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        <SwiperSlide />

        {data?.products?.map((product) => (
          <SwiperSlide className="relative z-50 shadow-sm" key={product._id}>
            <ProductBox Product={product} status={filterOption?.sortBy} />
          </SwiperSlide>
        ))}
        <SwiperSlide />
      </Swiper>
    </div>
  );
}
