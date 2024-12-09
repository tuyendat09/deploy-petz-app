import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Services, PaginateServices } from "@/types/Services";

export interface ServiceQueryParams {
  serviceType?: string;
  bookingAmount?: "desc" | "asc";
  page?: number;
  limit?: number;
  serviceId?: string;
}

interface newService {
  serviceName: string;
  serviceType: string;
  servicePrice: number;
  serviceDuration: number;
}

interface editService {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  servicePrice: number;
  serviceDuration: number;
}

export const servicesAPI = createApi({
  reducerPath: "servicesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/services`,
  }),
  tagTypes: ["Services"],

  endpoints: (builder) => ({
    getServices: builder.query<Services[], ServiceQueryParams>({
      query: (params: ServiceQueryParams) => {
        const queryParams = new URLSearchParams(params as any).toString();

        return `?${queryParams}`; // Return the URL with the query string
      },
      providesTags: ["Services"],
    }),
    getServicesPaginate: builder.query<PaginateServices, ServiceQueryParams>({
      query: (params: ServiceQueryParams) => {
        const queryParams = new URLSearchParams(params as any).toString();

        return `/paginate?${queryParams}`; // Return the URL with the query string
      },
      providesTags: ["Services"],
    }),
    insertService: builder.mutation<any, newService>({
      query: (formData: newService) => ({
        url: "/",
        method: "post",
        body: formData,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation<any, { deleteServiceId: string }>({
      query: ({ deleteServiceId }) => ({
        url: "/",
        method: "delete",
        body: {
          serviceId: deleteServiceId,
        },
      }),
      invalidatesTags: ["Services"],
    }),
    editService: builder.mutation<any, editService>({
      query: (formData: editService) => ({
        url: "/",
        method: "put",
        body: formData,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServicesPaginateQuery,
  useInsertServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
} = servicesAPI;
