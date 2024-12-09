import { animatePageOut } from "@/utils/animation";
import { usePathname, useRouter } from "next/navigation";

interface TransitionLinkAdminProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLinkAdmin({
  href,
  children,
  className,
}: TransitionLinkAdminProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
