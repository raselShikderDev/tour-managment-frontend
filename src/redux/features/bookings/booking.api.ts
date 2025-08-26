import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISingelTourResponse } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BookingApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // creating a singel tour
    createBooking: builder.mutation({
      query: (tourInfo) => ({
        url: "/booking/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["BOOKINGS"],
    }),
    // deleteing a tour types
    removeBooking: builder.mutation({
      query: (tourId) => ({
        url: `/tours/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BOOKINGS"],
    }),
    // // Geting all tour packages
    getAllookings: builder.query<ISingelTourResponse[], null>({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags: ["BOOKINGS"],
      transformResponse: (response: IResponse<ISingelTourResponse[]>) =>
        response.data,
    }),
    // Geting singel tour package
    getSingelBooking: builder.query<ISingelTourResponse, string>({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "GET",
      }),
      providesTags: ["BOOKINGS"],
      transformResponse: (response: IResponse<ISingelTourResponse>) =>
        response.data,
    }),
  }),
});

export const { useCreateBookingMutation } = BookingApi;
