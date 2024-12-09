"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animation";
import { useCursorHover } from "@/components/ui/Cursor/_store/CursorContext";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NormalTransitionLink({
  href,
  children,
  className,
}: TransitionLinkProps) {
  const { handleMouseEnterLink, handleMouseLeaveLink } = useCursorHover();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  }
  return (
    <div>
      <div
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
        onClick={handleClick}
        className={`w-fit cursor-pointer ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
