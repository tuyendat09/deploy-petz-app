"use client";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

const text =
  "Bạn đang lo lắng tìm một tiệm spa phù hợp cho thú cưng của mình, mong muốn tìm được nơi đáng tin cậy với dịch vụ chuyên nghiệp và đảm bảo an toàn..";
const text2 = "PETZ chúng tôi cung cấp:";

export default function AboutUs() {
  gsap.registerPlugin(ScrollTrigger);
  const [letterRef, setLetterRef] = useArrayRef();
  const triggerRef = useRef(null);

  function useArrayRef() {
    const letterRef = useRef([]);
    letterRef.current = [];
    return [
      letterRef,
      (ref: any) => ref && (letterRef as any).current.push(ref),
    ];
  }

  useGSAP(() => {
    gsap.to((letterRef as any).current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "bottom center",
      },
      color: "#1d1d1d",
      duration: 1,
      stagger: 1,
    });
  }, []);

  return (
    <div className="container flex flex-col justify-center gap-4 lg:flex-row lg:gap-[300px]">
      <p>++ bạn đang lo lắng</p>
      <div ref={triggerRef} className="w-full text-h2 lg:w-[900px] lg:text-h1">
        {text.split("").map((letter, index) => (
          <span
            ref={setLetterRef as any}
            className="text-[#bababa]"
            key={index}
          >
            {letter}
          </span>
        ))}

        <div className="mt-4">
          {text2.split("").map((letter, index) => (
            <span
              ref={setLetterRef as any}
              className="mt-2 text-h1 font-bold text-[#bababa]"
              key={index}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
