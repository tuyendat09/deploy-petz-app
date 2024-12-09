import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginateProduct } from "../../../types/Product";

interface Option {
  name: string;
  productQuantity: number;
}
export interface QueryParams {
  page?: number;
  search?: string;
  productName?: string;
  status?: string;
  limit?: number;
  productQuantity?: number;
  productCategory?: string | string[];
  productSlug?: string;
  productSubCategory?: string | string[];
  salePercent?: number;
  productStatus?: string;
  productBuy?: number;
  productOption?: Option[];
  lowStock?: boolean;
  sortBy?: string;
}

export const shopAPI = createApi({
  reducerPath: "shopAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/shop`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),
  tagTypes: ["Product", "ProductList", "Review"],

  endpoints: (builder) => ({
    getShop: builder.query<PaginateProduct, QueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `?${queryParams}`;
      },
      providesTags: ["ProductList"],
    }),
  }),
});

export const { useGetShopQuery } = shopAPI;
