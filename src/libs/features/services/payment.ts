import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Payment {
  amount?: string;
  orderId?: string;
  payUrl?: string | undefined;
}

export const paymentAPI = createApi({
  reducerPath: "paymentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/payment`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "69420");
      return headers;
    },
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    handlePaymentMomo: builder.mutation<Payment, Payment>({
      query: (payload) => ({
        url: `/`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useHandlePaymentMomoMutation } = paymentAPI;
