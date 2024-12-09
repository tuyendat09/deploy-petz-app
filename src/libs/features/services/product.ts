import { PaginateReview } from "@/types/Review";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginateProduct } from "@/types/Product";

interface Option {
  name: string;
  productQuantity: number;
}
export interface QueryParams {
  page?: number;
  productName?: string;
  status?: string;
  limit?: number;
  search?: string;
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
  size?: string[];
}

export interface ReviewQueryParams {
  publicStatus?: boolean;
  productId?: string;
  reviewId?: string;
  start?: number | undefined;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/product`,
  }),
  tagTypes: ["Product", "ProductList", "Review"],

  endpoints: (builder) => ({
    getProducts: builder.query<PaginateProduct, QueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `?${queryParams}`;
      },
      providesTags: ["ProductList"],
    }),
    getProductsByCatId: builder.query<void, string>({
      query: (categoryId) => {
        const queryParams = new URLSearchParams({ categoryId }).toString();
        return `/by-cat-id?${queryParams}`;
      },
    }),
    getReview: builder.query<PaginateReview, any>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();
        return `/get-review?${queryParams}`;
      },
      providesTags: ["Review"],
    }),

    addNewProduct: builder.mutation<any, FormData>({
      query: (formData: FormData) => ({
        url: "/insert-product",
        method: "POST",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId: string) => ({
        url: `/delete-product`,
        method: "DELETE",
        body: { productId },
      }),
      // invalidatesTags: ["ProductList"],
    }),

    editProduct: builder.mutation<any, FormData>({
      query: (formData: FormData) => ({
        url: `/edit-product`,
        method: "PUT",
        body: formData,
      }),
    }),
    review: builder.mutation<any, FormData>({
      query: (formData: FormData) => ({
        url: `/review`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Review"],
    }),
    publicReview: builder.mutation<any, FormData>({
      query: (formData: FormData) => ({
        url: `/public-review`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Review"],
    }),
    lowstockNofi: builder.mutation<any, string>({
      query: (productId) => ({
        url: `/lowstock-nofi`,
        method: "post",
        body: {
          productId: productId,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCatIdQuery,
  useLazyGetProductsQuery,
  useAddNewProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useLowstockNofiMutation,
  useGetReviewQuery,
  useReviewMutation,
  usePublicReviewMutation,
} = productsAPI;
