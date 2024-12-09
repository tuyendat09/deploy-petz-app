"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function MessengerIcon() {
  const messengerURL = `https://m.me/datphan.212/`;

  return (
    <div className="fixed bottom-8 right-4">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger"
        href="https://m.me/datphan.212"
        passHref
      >
        <Icon className="size-10" icon="mingcute:messenger-fill" />
      </Link>
    </div>
  );
}
