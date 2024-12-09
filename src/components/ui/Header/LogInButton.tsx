import { useSession, signOut } from "next-auth/react";
import NormalTransitionLink from "../NormalTransitionLink";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Notification from "./Notification";

export default function LoginButton() {
  const { data: session, status } = useSession();

  // Xác định URL cho Trang Admin dựa trên userRole
  const getAdminUrl = () => {
    const userRole = session?.user.userRole;
    if (userRole === "spa") {
      return "/admin/bookings";
    } else if (userRole === "seller") {
      return "/admin/shop";
    } else {
      return "/admin/dashboard";
    }
  };

  if (status === "unauthenticated") {
    return (
      <>
        <NormalTransitionLink href="/auth">Đăng nhập</NormalTransitionLink>
      </>
    );
  }

  return (
    <div>
      <Notification />
      <Dropdown
        classNames={{
          base: "before:bg-default-200", // change arrow background
          content: "border border-default-200 glass text-white",
        }}
      >
        <DropdownTrigger>
          <Button className="text-white" variant="flat">
            {session?.user.displayName !== ""
              ? session?.user.displayName
              : "Tài khoản"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          itemClasses={{
            base: [
              "rounded-md",
              "text-white",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
          aria-label="Link Actions"
        >
          <DropdownItem textValue="Thông tin" key="/user/account">
            <NormalTransitionLink
              className="w-full text-left"
              href="/user/account"
            >
              Thông tin
            </NormalTransitionLink>
          </DropdownItem>

          {session?.user.userRole !== "user" &&
            ((
              <DropdownItem textValue="Trang Admin" key="/admin/dashboard">
                <NormalTransitionLink
                  className="w-full text-left"
                  href={getAdminUrl()} // Sử dụng URL động dựa trên userRole
                >
                  Trang Admin
                </NormalTransitionLink>
              </DropdownItem>
            ) as any)}

          <DropdownItem textValue="Lịch sử mua hàng" key="/order-history">
            <NormalTransitionLink
              className="w-full text-left"
              href="/user/change-voucher"
            >
              Đổi voucher
            </NormalTransitionLink>
          </DropdownItem>
          <DropdownItem textValue="Lịch sử mua hàng" key="/order-history">
            <NormalTransitionLink
              className="w-full text-left"
              href="/user/order-history"
            >
              Lịch sử mua hàng
            </NormalTransitionLink>
          </DropdownItem>
          <DropdownItem
            textValue="Đăng xuất"
            key="logout"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
