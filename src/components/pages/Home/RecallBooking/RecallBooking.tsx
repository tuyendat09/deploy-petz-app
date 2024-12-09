"use client";

import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
const text =
  " ++ Dịch vụ spa thú cưng của chúng tôi không ngừng nâng cấp – hãy để chúng tôi mang đến cho bé yêu của bạn trải nghiệm tuyệt vời nhất";
export default function RecallBooking() {
  const triggerRef = useRef(null);
  const textsRef = useRef([]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(textsRef.current, {
      opacity: 1,
      y: 300,
      duration: 1,
      stagger: 0.5,
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top 70%",
        end: "bottom 75%",
      },
    });
  }, []);

  return (
    <section>
      <div>
        <div ref={triggerRef} className="relative z-10 py-[250px]">
          <div className="container px-8 lg:px-64">
            <div className="recall-section">
              <div className="w-full text-h2 lg:text-display">
                {text.split("").map((letter, index) => (
                  <span
                    ref={(el: any) => ((textsRef as any).current[index] = el)}
                    className="text-[#bababa] opacity-0"
                    key={index}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <NormalTransitionLink
                href="/booking"
                className="mt-4 rounded-full bg-primary px-6 py-2 text-h3 text-white"
              >
                Thư giãn cho bé
              </NormalTransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
