// Cursor.js

"use client";

import { useEffect } from "react";
import { useCursorHover } from "./_store/CursorContext";
import gsap from "gsap";
import { Icon } from "@iconify/react";

export default function Cursor() {
  const {
    textRef,
    buttonText,
    iconRef,
    circleSize,
    circle,
    mouse,
    delayMouse,
  } = useCursorHover();

  const lerp = (x: any, y: any, a: any) => x * (1 - a) + y * a;

  const manageMouseMove = (e: any) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };

  const animate = () => {
    const { x, y } = delayMouse.current;
    delayMouse.current = {
      x: lerp(x, mouse.current.x, 0.08),
      y: lerp(y, mouse.current.y, 0.08),
    };
    moveCircle(delayMouse.current.x, delayMouse.current.y);
    window.requestAnimationFrame(animate);
  };

  const moveCircle = (x: any, y: any) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };


  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);


  return (
    <div
      ref={circle}
      style={{
        width: circleSize,
        height: circleSize,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[51] hidden items-center justify-center rounded-full bg-black text-center dark:bg-white xl:flex"
    >
      <Icon
        ref={iconRef}
        className="hidden size-[16px] text-white opacity-0 dark:text-black"
        icon="mdi:arrow-top-right"
        width="20"
      />
      <p
        ref={textRef}
        className="absolute text-[12px] text-white opacity-0 dark:text-black"
      >
        {buttonText}
      </p>
    </div>
  );
}
