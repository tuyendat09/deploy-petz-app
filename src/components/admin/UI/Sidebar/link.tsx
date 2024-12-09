import { Icon } from "@iconify/react/dist/iconify.js";

export const links = [
  {
    url: "/admin/dashboard",
    icon: <Icon className="size-6" icon="mage:dashboard" />,
    label: "Dashboard",
  },
  {
    url: "/admin/shop",
    icon: <Icon className="size-6" icon="iconoir:shop" />,
    label: "Sản phẩm",
  },
  {
    url: "/admin/category-voucher",
    icon: <Icon className="size-6" icon="mdi:voucher-outline" />,
    label: "Danh mục - Voucher",
  },
  {
    url: "/admin/bookings",
    icon: <Icon className="size-6" icon="uil:schedule" />,
    label: "Lịch đặt",
  },
  {
    url: "/admin/users",
    icon: <Icon className="size-6" icon="quill:user-sad" />,
    label: "Người dùng",
  },
  {
    url: "/admin/orders",
    icon: <Icon className="size-6" icon="iconamoon:box-light" />,
    label: "Đơn hàng",
  },
  {
    url: "/admin/feedback",
    icon: <Icon className="size-6" icon="material-symbols:feedback-outline" />,
    label: "Feedbacks",
  },
];
