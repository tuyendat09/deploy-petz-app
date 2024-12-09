"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { signOut } from "next-auth/react";

export default function UserProfile() {
  return (
    <div className="mt-48 rounded-full text-center transition delay-75 duration-300 hover:bg-black hover:text-white dark:text-white dark:hover:bg-[#f9f9f9] dark:hover:text-black">
      <div className="flex items-center gap-1 px-6 py-3">
        <Icon className="size-6" icon="tabler:logout" />
        <button onClick={() => signOut({ callbackUrl: "/" })}>Đăng xuất</button>
      </div>
    </div>
  );
}
