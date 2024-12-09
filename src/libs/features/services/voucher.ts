import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VoucherPaginate } from "@/types/Voucher";

export interface QueryParams {
  voucherId?: string;
  page?: number;
  salePercentSort?: string; // asc || desc
  pointSort?: string; // asc || desc
  typeFilter?: string; // ON_ORDER_SAVINGS || PER_ITEM_SAVINGS
  limit?: number;
}

export interface ChangeVoucherParams {
  voucherPoint: number;
  voucherId: string;
  userId: string;
}

interface newVoucher {
  voucherType: string;
  voucherPoint: string;
  expirationDate: string;
  voucherDescription: string;
  flatDiscountAmount?: number;
  salePercent?: string;
  shippingDiscountAmount?: number;
  maxRedemption?: number | null;
}

export const vouchersAPI = createApi({
  reducerPath: "vouchersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/voucher`,
  }),
  tagTypes: ["Voucher", "HeldVouchers"],

  endpoints: (builder) => ({
    getVouchers: builder.query<VoucherPaginate, QueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `?${queryParams}`;
      },
      providesTags: ["Voucher"],
    }),
    insertVoucher: builder.mutation<any, newVoucher>({
      query: (formData: newVoucher) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Voucher"],
    }),
    deleteVoucher: builder.mutation<
      any,
      { deleteVoucherId: string | string[] }
    >({
      query: ({ deleteVoucherId }) => ({
        url: "",
        method: "DELETE",
        body: {
          deleteVoucherId: Array.isArray(deleteVoucherId)
            ? deleteVoucherId
            : [deleteVoucherId],
        },
      }),
      invalidatesTags: ["Voucher"],
    }),
    editVoucher: builder.mutation<void, newVoucher>({
      query: (formData: newVoucher) => ({
        url: `/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Voucher"],
    }),
    changeVoucher: builder.mutation<any, ChangeVoucherParams>({
      query: (formData: ChangeVoucherParams) => ({
        url: "/change-voucher",
        method: "post",
        body: formData,
      }),
      invalidatesTags: ["HeldVouchers", "Voucher"],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useInsertVoucherMutation,
  useDeleteVoucherMutation,
  useEditVoucherMutation,
  useChangeVoucherMutation,
} = vouchersAPI;
