import { CartItem } from "./Cart";
import { VoucherOrder } from "./Voucher";

interface UserOrder {
  orderDate?: Date;
  orderId: string;
  orderTotal: number;
}

export enum UserRole {
  admin = "Admin",
  user = "Người dùng",
  spa = "Nhân viên spa",
  manager = "Quản lý",
  seller = "Nhân viên",
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface LoginUser {
  loginkey: string;
  password: string;
}

export interface VerifyEmail {
  email: string;
  otpCode: number;
}

export interface UserCart {
  _id: string;
  cartItems: CartItem[];
}

// Định nghĩa interface cho User
export interface User {
  _id: string;
  googleId: string | null;
  username: string;
  displayName: string;
  userActive: boolean;
  userAddress: string;
  userEmail: string;
  userPhone: string;
  userRole: "admin" | "user" | "spa" | "manager" | "seller";
  userPoint: number;
  userVoucher: string[];
  userOrders: UserOrder[];
  userCart: UserCart;
  userShift: [
    {
      startTime: {
        type: String;
        required: false;
      };
      endTime: {
        type: String;
        required: false;
      };
    },
  ];
  __v: number;
  token: string;
  refreshToken: string;
}

export interface PaginateUser {
  data: User[];
  currentPage: number;
  totalPages: number;
}

export interface UserState {
  token: string | null;
  voucher: VoucherOrder | null;
}
