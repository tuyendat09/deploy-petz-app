import gsap from "gsap";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const col1 = document.querySelector("#col-1");
  const col2 = document.querySelector("#col-2");
  const col3 = document.querySelector("#col-3");
  const col4 = document.querySelector("#col-4");

  if (col1 && col2 && col3 && col4) {
    const tl = gsap.timeline();
    tl.set([col1, col2, col3, col4], {
      yPercent: 0,
    }).to([col1, col2, col3, col4], {
      yPercent: 120,
      stagger: 0.2,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const col1 = document.querySelector("#col-1");
  const col2 = document.querySelector("#col-2");
  const col3 = document.querySelector("#col-3");
  const col4 = document.querySelector("#col-4");

  if (col1 && col2 && col3 && col4) {
    const tl = gsap.timeline();
    tl.set([col1, col2, col3, col4], {
      yPercent: -100,
    }).to([col1, col2, col3, col4], {
      yPercent: 0,
      stagger: 0.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
