import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SubCategories, SubCategoriesByPage } from "@/types/SubCategories";

interface QueryParams {
  categoryId?: string;
  subCategoryId?: string;
}

export const subCategoriesAPI = createApi({
  reducerPath: "subCategoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/subcategories`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),
  tagTypes: ["SubCategories"],

  endpoints: (builder) => ({
    // Modified getProducts endpoint to accept a params object
    getSubCategories: builder.query<SubCategories[], QueryParams>({
      query: (params: QueryParams) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `?${queryParams}`; // Return the URL with the query string
      },
      providesTags: ["SubCategories"],
    }),
    getSubCategoriesPaginate: builder.query<SubCategoriesByPage, number>({
      query: (page: number) => `page?page=${page}`,
      providesTags: ["SubCategories"],
    }),
    editSubCategory: builder.mutation<
      any,
      {
        editSubCategoryId: string;
        newCategoryId: string;
        newSubCategoryName: string;
      }
    >({
      query: ({ editSubCategoryId, newCategoryId, newSubCategoryName }) => ({
        url: "", // Adjust the URL based on your API structure
        method: "PUT",
        body: {
          editSubCategoryId: editSubCategoryId,
          newCategoryId: newCategoryId,
          newSubCategoryName: newSubCategoryName,
        },
      }),
      invalidatesTags: ["SubCategories"], // Correcting to invalidate tags after mutation
    }),
    addSubCategory: builder.mutation<
      any,
      { categoryId: string; newSubCategoryName: string }
    >({
      query: ({ categoryId, newSubCategoryName }) => ({
        url: "", // Adjust the URL based on your API structure
        method: "POST",
        body: {
          categoryId: categoryId,
          newSubCategoryName: newSubCategoryName,
        },
      }),
      invalidatesTags: ["SubCategories"],
    }),
    deleteSubCategory: builder.mutation<
      any,
      { subCategoryId: string | string[] }
    >({
      query: ({ subCategoryId }) => ({
        url: "",
        method: "DELETE",
        body: {
          subCategoryId: Array.isArray(subCategoryId)
            ? subCategoryId
            : [subCategoryId],
        },
      }),
      invalidatesTags: ["SubCategories"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useLazyGetSubCategoriesQuery,
  useGetSubCategoriesPaginateQuery,
  useEditSubCategoryMutation,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoriesAPI;
