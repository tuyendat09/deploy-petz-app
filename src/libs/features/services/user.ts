import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HeldVouchersResponse } from "@/types/Voucher";
import { PaginateUser, User } from "@/types/User";

interface ChangePasswordParams {
  userId: string;
  newPassword?: string;
  displayName?: string;
  birthDay?: string;
  userEmail?: string;
  userPhone?: string;
  userImage?: any;
  userAddress?: string;
}

interface ChangeUserRoleParams {
  userId: string;
  newRole?: string;
}

export interface QueryUserParams {
  page?: number;
  limit?: number;
  userRole?: string;
  username?: string;
  userEmail?: string;
}

export interface HeldVoucherQueryParams {
  userId?: string;
  page?: number;
  salePercentSort?: "asc" | "desc";
  typeFilter?: string;
  limit?: number;
}

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  }),
  tagTypes: ["User", "HeldVouchers"],

  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => `/${userId}`,
      providesTags: ["User"],
    }),
    getUserPaginate: builder.query<PaginateUser, QueryUserParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as unknown as Record<string, string>,
        ).toString();

        return `/paginate?${queryParams}`;
      },
      providesTags: ["User"],
    }),
    editUser: builder.mutation<any, ChangePasswordParams>({
      query: (formData: ChangePasswordParams) => ({
        url: ``,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    editUserRole: builder.mutation<any, ChangeUserRoleParams>({
      query: (formData: ChangeUserRoleParams) => ({
        url: `/change-role`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    editUserShift: builder.mutation<any, any>({
      query: (formData: any) => ({
        url: `/change-shift`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getVouchersHeld: builder.query<
      HeldVouchersResponse,
      HeldVoucherQueryParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();
        return `/voucher-held?${queryParams}`;
      },
      providesTags: ["HeldVouchers"], // Cung cấp tags HeldVouchers
    }),
  }),
});

export const {
  useGetUserQuery,
  useEditUserMutation,
  useGetVouchersHeldQuery,
  useLazyGetVouchersHeldQuery,
  useGetUserPaginateQuery,
  useEditUserRoleMutation,
  useEditUserShiftMutation,
} = userAPI;
