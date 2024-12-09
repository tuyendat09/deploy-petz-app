"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

export default function WhyChooseUs() {
  const triggerRef = useRef(null);
  const linesRef = useRef([]);
  const textsRef = useRef([]);

  const textContent = [
    "Nhân viên chuyên nghiệp",
    "Chăm sóc phù hợp cho từng thú cưng",
    "Không gian sạch sẽ và khử trùng thường xuyên",
    "Sử dụng sản phẩm an toàn và chất lượng",
    "Trang thiết bị hiện đại",
    "Chính sách chăm sóc sau dịch vụ chu đáo",
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (triggerRef.current && linesRef.current.length) {
      gsap.to(linesRef.current, {
        width: "100vw",
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          start: "top 70%",
          end: "bottom 30%",
        },
      });

      gsap.to(textsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          scrub: true,
          start: "top 70%",
          end: "bottom 30%",
        },
      });
    }
  }, []);

  return (
    <section className="my-[200px] w-full">
      <div>
        <div ref={triggerRef}>
          {textContent.map((text, index) => (
            <div key={index} className="relative my-12">
              <div
                ref={(el: any) => ((linesRef as any).current[index] = el)}
                className="line absolute left-0 right-0 top-1/2 h-[1px] w-0 rounded-full bg-[#1a1a1a]"
              />
              <div
                ref={(el: any) => ((textsRef as any).current[index] = el)}
                className={`relative z-10 translate-y-6 text-[12px] opacity-0 md:text-[16px] lg:px-6 lg:text-h3 ${
                  index % 2 === 0 ? `ml-24 md:ml-[50%]` : "ml-24 md:ml-32"
                } w-fit bg-white text-center`}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
