import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
interface MySwiperProps extends SwiperProps {
  onSwiper: (swiper: SwiperCore) => void;
  onSlideChange: (swiper: SwiperCore) => void;
  activeIndex: number;
}
const SwiperComponent: React.FC<MySwiperProps> = ({ onSwiper, onSlideChange, activeIndex, children, ...props }) => {
  return (
    <>
      <button className="swiper-button-prev"></button>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={onSwiper}
        onSlideChange={(swiper) => {
          onSlideChange(swiper);
        }}
        initialSlide={activeIndex}
        {...props}
      >
        {children}
      </Swiper>
      <button className="swiper-button-next"></button>
    </>
  );
};

export default SwiperComponent
