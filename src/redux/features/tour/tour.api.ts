import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISingelTourResponse } from "@/types";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tourApi:any = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // creating a singel tour 
    addTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags:["TOUR"],
    }),
// deleteing a tour types
    removeTour: builder.mutation({
      query: (tourId) => ({
        url: `/tours/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags:["TOUR"],
    }),
    // Geting all tour Types
    getTours: builder.query({
      query: () => ({
        url: "/tours",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response)=> response.data
    }),
    // Geting all tour packages
    getTourPackage: builder.query<ISingelTourResponse[], null>({
      query: () => ({
        url: "/tour",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response:IResponse<ISingelTourResponse[]>)=> response.data
    }),
  }),
});

export const {
  useAddTourMutation,
  useGetToursQuery,
  useGetTourPackageQuery,
} = tourApi;
