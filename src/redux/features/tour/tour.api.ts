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
    // // Geting all tour packages
    getAllTourPackage: builder.query<ISingelTourResponse[], null>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params,
      }),
      providesTags:["TOUR"],
      transformResponse:(response:IResponse<ISingelTourResponse[]>)=> response.data
    }),
    // Geting singel tour package
    getSingelTour: builder.query<ISingelTourResponse, string>({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response:IResponse<ISingelTourResponse>)=> response.data
    }),
  }),
});

export const {
  useAddTourMutation,
  useGetAllTourPackageQuery,
  useGetSingelTourQuery
} = tourApi;
