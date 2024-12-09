import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdjustQuantity, CartItem, RemoveCartItem } from "@/types/Cart";

export const cartAPI = createApi({
  reducerPath: "cartAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/cart`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    addItemToCart: builder.mutation<CartItem, CartItem>({
      query: (formData: CartItem) => ({
        url: "",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    removeItemFromCart: builder.mutation<RemoveCartItem, RemoveCartItem>({
      query: (formData: RemoveCartItem) => ({
        url: "/remove-item",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    adjustQuantity: builder.mutation<AdjustQuantity, AdjustQuantity>({
      query: (formData: AdjustQuantity) => ({
        url: "/quantity-adjust",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useAdjustQuantityMutation,
} = cartAPI;
