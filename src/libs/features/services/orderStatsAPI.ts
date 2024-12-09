import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BaseOrderQuery {
    page?: number;
    limit?: number;
    year?: number;
    month?: number;
    day?: number;
    userId?: string;
    customerName?: string;
    totalPriceSort?: string;
    productQuantitySort?: string;
    orderStatus?: string;
    startDate?: string;
    endDate?: string;
}

export const orderStatsAPI = createApi({
    reducerPath: "orderStatsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    tagTypes: ["Orders"],

    endpoints: (builder) => ({
        getOrderStats: builder.query<any, BaseOrderQuery>({
            query: (params: BaseOrderQuery) => {
                const queryParams = new URLSearchParams(params as any).toString();
                console.log("Điều kiện", params)
                const url = `orderStats?${queryParams}`;
                console.log("Fetching URL:", url);
                return url;

            },
            providesTags: ["Orders"],
        }),
        getBookingStats: builder.query<any, BaseOrderQuery>({
            query: (params: BaseOrderQuery) => {
                const queryParams = new URLSearchParams(params as any).toString();
                console.log("Điều kiện", params)
                const url = `bookingStats?${queryParams}`;
                console.log("Fetching URL:", url);
                return url;

            },
            providesTags: ["Orders"],
        }),

    }),
});

export const {
    useGetOrderStatsQuery,
    useGetBookingStatsQuery,
} = orderStatsAPI;
