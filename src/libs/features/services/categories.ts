import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Categories, CategoriesByPage } from "@/types/Categories";

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),
  tagTypes: ["Categories"],

  endpoints: (builder) => ({
    getCategories: builder.query<Categories[], string | void>({
      query: (categoryId?: string) =>
        categoryId ? `?categoryId=${categoryId}` : "",
      providesTags: ["Categories"],
    }),
    getCategoriesPaginate: builder.query<CategoriesByPage, number>({
      query: (page: number) => `page?page=${page}`,
      providesTags: ["Categories"],
    }),
    editCategory: builder.mutation<
      any,
      { categoryId: string; editCategoryName: string }
    >({
      query: ({ categoryId, editCategoryName }) => ({
        url: "",
        method: "PUT",
        body: {
          categoryId: categoryId,
          editCategoryName: editCategoryName,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    addCategory: builder.mutation<any, { newCategoryName: string }>({
      query: ({ newCategoryName }) => ({
        url: "", // Adjust the URL based on your API structure
        method: "POST",
        body: {
          newCategoryName: newCategoryName,
        },
      }),
      invalidatesTags: ["Categories"], // Correcting to invalidate tags after mutation
    }),
    deleteCategory: builder.mutation<
      any,
      {
        deleteCategoryId: string;
        deleteAlong: boolean;
        newCategory?: string | null;
      }
    >({
      query: ({ deleteCategoryId, deleteAlong, newCategory }) => ({
        url: "", // Adjust the URL based on your API structure
        method: "DELETE",
        body: {
          deleteCategoryId: deleteCategoryId,
          deleteAlong: deleteAlong,
          newCategory: newCategory,
        },
      }),
      invalidatesTags: ["Categories"], // Correcting to invalidate tags after mutation
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesPaginateQuery,
  useLazyGetCategoriesPaginateQuery,
  useEditCategoryMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesAPI;
