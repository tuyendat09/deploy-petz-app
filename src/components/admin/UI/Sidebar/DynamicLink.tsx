"use client";

import { usePathname } from "next/navigation";
import { links } from "./link";
import NormalTransitionLink from "@/components/ui/NormalTransitionLink";
import { useSession } from "next-auth/react";

export default function DynamicLink() {
  const pathname = usePathname();
  const session = useSession();
  const userRole = session.data?.user.userRole;

  const filteredLinks = links.filter((link) => {
    if (userRole === "seller") {
      return ["/admin/orders", "/admin/shop"].includes(link.url);
    } else if (userRole === "spa") {
      return ["/admin/bookings"].includes(link.url);
    }
    return true;
  });

  return (
    <ul className="my-4 space-y-4">
      {filteredLinks.map((link) => (
        <li
          key={link.url}
          className={`${
            pathname === link.url
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "text-black dark:text-white"
          } rounded-xl flex items-center gap-1 rounded-full px-8 py-3 transition delay-75 duration-300 hover:bg-[#5d5d5d] hover:text-white dark:hover:bg-[#f9f9f9] dark:hover:text-black`}
        >
          <span>{link.icon}</span>
          <NormalTransitionLink href={link.url}>
            {link.label}
          </NormalTransitionLink>
        </li>
      ))}
    </ul>
  );
}
