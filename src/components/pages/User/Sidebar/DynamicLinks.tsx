"use client";

import { usePathname } from "next/navigation";
import { links } from "./links";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { useGetReviewQuery } from "@/libs/features/services/product";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";
interface DynamicLink {
  children: React.ReactNode;
  url: string;
}

export default function DynamicLink() {
  const pathname = usePathname();
  const session = useSession();
  const userId = useMemo(() => session.data?.user._id, [session.data]);
  const { data } = useGetReviewQuery(
    userId ? { userId: userId, limit: 99, ratingStatus: "no" } : skipToken,
  );

  console.log(data);

  return (
    <ul className="my-4 space-y-4">
      {links.map((link) => (
        <li
          key={link.url}
          className={`${
            pathname === link.url ? "bg-black text-white" : ""
          } rounded-xl flex items-center gap-1 rounded-full px-6 py-3 transition delay-75 duration-300 hover:bg-[#5d5d5d] hover:text-white`}
        >
          <NormalTransitionLink className="cursor-auto" href={link.url}>
            {link.label}
          </NormalTransitionLink>
          {link.url == "/user/review-product" && (
            <NormalTransitionLink
              className="cursor-auto space-x-2"
              href="/user/review-product"
            >
              <span>Đánh giá sản phẩm</span>
              <span className="text-[14px]">
                ({(data as any)?.reviews.length || 0})
              </span>
            </NormalTransitionLink>
          )}
        </li>
      ))}
    </ul>
  );
}
