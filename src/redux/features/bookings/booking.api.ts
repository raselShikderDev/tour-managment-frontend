import { baseApi } from "@/redux/baseApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BookingApi: any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // creating a singel booking
    createBooking: builder.mutation({
      query: (tourInfo) => ({
        url: "/booking/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["BOOKINGS"],
    }),
    // // Geting my bookings
    getMyBookings: builder.query({
      query: () => ({
        url: "/booking/my-booking",
        method: "GET",
      }),
      providesTags: ["BOOKINGS"],
      transformResponse: (response) =>response.data}),
    // Geting singel bookings
    getSingelBooking: builder.query({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "GET",
      }),
      providesTags: ["BOOKINGS"],
      transformResponse: (response) =>response.data}),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = BookingApi;
