import { PaginateBooking } from "@/types/Booking";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BookingInformation {
  userId: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  selectedServices: {};
  bookingDate: string;
  bookingHours: string;
  totalPrice: Number;
}

export interface BookingQueryParams {
  bookingId?: string;
  userId?: string;
  customerName?: string;
  year?: number;
  month?: number;
  day?: number;
  status?: string;
  page?: number;
  limit?: number;
}

interface ReviewPayload {
  userId: string;
  customerName: string;
  bookingId: string;
  rating: number;
  review?: string;
  services: string[];
}

export const bookingsAPI = createApi({
  reducerPath: "bookingsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/booking`,
  }),
  tagTypes: ["Booking"],

  endpoints: (builder) => ({
    getBookingByDate: builder.query<
      string,
      { year: number; month: number; day: number }
    >({
      query: ({ year, month, day }) =>
        `/booking-by-date?year=${year}&month=${month}&day=${day}`,
      providesTags: ["Booking"],
    }),
    getBooking: builder.query<PaginateBooking, BookingQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `?${queryParams}`;
      },
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation<any, BookingInformation>({
      query: (formData: BookingInformation) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation<any, { bookingId: string }>({
      query: ({ bookingId }) => ({
        url: "/cancel-booking",
        method: "PUT",
        body: { bookingId: bookingId },
      }),
      invalidatesTags: ["Booking"],
    }),
    doneBooking: builder.mutation<any, { bookingId: string }>({
      query: ({ bookingId }) => ({
        url: "/done-booking",
        method: "PUT",
        body: { bookingId: bookingId },
      }),
      invalidatesTags: ["Booking"],
    }),
    confirmBooking: builder.mutation<any, { bookingId: string }>({
      query: ({ bookingId }) => ({
        url: "/confirm-booking",
        method: "PUT",
        body: { bookingId: bookingId },
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingByUserId: builder.query<PaginateBooking, BookingQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams(
          params as Record<string, string>,
        ).toString();

        return `/booking-userId/?${queryParams}`;
      },
      providesTags: ["Booking"],
    }),
    reviewBooking: builder.mutation<void, ReviewPayload>({
      query: (payload) => ({
        url: `/review-booking`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetBookingQuery,
  useGetBookingByDateQuery,
  useLazyGetBookingByDateQuery,
  useCreateBookingMutation,
  useGetBookingByUserIdQuery,
  useCancelBookingMutation,
  useReviewBookingMutation,
  useDoneBookingMutation,
  useConfirmBookingMutation,
} = bookingsAPI;
