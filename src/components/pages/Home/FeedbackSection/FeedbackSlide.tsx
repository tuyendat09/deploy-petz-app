// FeedbackSlide.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "./feedback.css";
import FeedbackItem from "./FeedbackItem";

const feedbacks = [
  {
    name: "Phan Tuyến Đạt",
    date: "04/09",
    review:
      "Dịch vụ chăm sóc mèo thật tuyệt vời! Nhân viên không chỉ thân thiện, tận tâm mà còn hiểu rõ từng đặc điểm của giống mèo. Bé mèo nhà mình được tắm rửa sạch sẽ, lông được chăm chút kỹ lưỡng và thái độ rất vui vẻ khi về nhà. Không gian spa thoáng mát, đồ chơi đa dạng giúp mèo không cảm thấy bị gò bó. Mình hoàn toàn yên tâm khi giao bé cho đội ngũ ở đây. Chắc chắn sẽ quay lại nhiều lần nữa và giới thiệu cho bạn bè",
  },
  {
    name: "Nguyễn Phúc Thiện",
    date: "23/09",
    review:
      "Rất hài lòng với dịch vụ! Bé mèo nhà mình rất khó tính và dễ sợ hãi, nhưng nhân viên ở đây cực kỳ kiên nhẫn và biết cách xoa dịu. Spa cho mèo sạch sẽ, thoáng mát, mọi dụng cụ được vệ sinh cẩn thận. Mình thực sự an tâm khi để bé lại đây. Nhìn thấy bé thư giãn, thoải mái và vui chơi là điều tuyệt vời nhất. Thật sự đánh giá cao sự chuyên nghiệp và tận tâm của đội ngũ. 5 sao xứng đáng!",
  },
  {
    name: "Lạc Thu Nguyệt",
    date: "12/10",
    review:
      "Địa chỉ chăm sóc mèo đáng tin cậy nhất! Mèo nhà mình không chỉ được massage, tỉa lông gọn gàng mà còn được chơi với đồ chơi yêu thích. Không gian ở đây rất thoáng mát, sạch sẽ và an toàn, có cả khu vực riêng cho mèo nhút nhát. Nhân viên chăm sóc cực kỳ yêu mèo và hiểu biết rõ về từng hành vi của chúng. Mình rất an tâm khi giao bé cho họ. Đội ngũ rất nhiệt tình và tận tâm, chắc chắn sẽ quay lại trong tương lai!",
  },
  {
    name: "Trần Phúc Huy",
    date: "20/10",
    review:
      "Dịch vụ chuyên nghiệp và an toàn cho mèo! Mèo của mình vốn rất nhát, nhưng nhờ sự khéo léo và nhẹ nhàng của nhân viên mà bé nhanh chóng quen với môi trường. Khu vực chăm sóc rộng rãi, thoáng mát và được vệ sinh sạch sẽ. Ngoài ra, còn có đồ chơi và khu vực giải trí giúp mèo không cảm thấy cô đơn hay căng thẳng. Rất cảm ơn đội ngũ vì sự chăm sóc tận tâm và chuyên nghiệp. Đây thực sự là một trải nghiệm đáng giá cho cả mình và bé mèo nhà mình!",
  },
];

export default function FeedbackSlide() {
  return (
    <div className="mb-[200px] mt-12">
      <Swiper
        className=""
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1700: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
        }}
        speed={10000}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={index}>
            <motion.div
              transition={{
                type: "spring",
                delay: 0.3 * index,
              }}
            >
              <FeedbackItem
                name={feedback.name}
                date={feedback.date}
                review={feedback.review}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
