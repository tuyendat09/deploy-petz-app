import { Icon } from "@iconify/react/dist/iconify.js";

export const links = [
  {
    url: "/user/account",
    icon: <Icon className="size-6" icon="mage:dashboard" />,
    label: "Thông tin tài khoản",
  },
  {
    url: "/user/service-list",
    icon: <Icon className="size-6" icon="mdi:voucher-outline" />,
    label: "Danh sách dịch vụ đã đặt",
  },

  {
    url: "/user/order-history",
    icon: <Icon className="size-6" icon="material-symbols:feedback-outline" />,
    label: "Lịch sử đơn hàng",
  },
  {
    url: "/user/review-product",
    icon: <Icon className="size-6" icon="mdi:voucher-outline" />,
  },

  {
    url: "/user/change-voucher",
    icon: <Icon className="size-6" icon="ci:settings" />,
    label: "Đổi voucher",
  },
];
