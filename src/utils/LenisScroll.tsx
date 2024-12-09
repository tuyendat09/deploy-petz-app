"use client";

import Lenis from "lenis";
import { useEffect, memo } from "react";

function LenisScroll() {
  useEffect(() => {
    // Khởi tạo Lenis
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Hàm cập nhật cuộn cho Lenis
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Bắt đầu vòng lặp
    requestAnimationFrame(raf);

    // Dọn dẹp khi unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // Nếu component chỉ dùng để cuộn thì không cần render gì
}

// Bao bọc component với memo để tránh re-render
export default memo(LenisScroll);
