import { baseApi } from "@/redux/baseApi";
// import type {
//   IResponse,
// } from "@/types";


export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags:["TOUR"],
    }),
    
    tourInfo: builder.query({
      query: () => ({
        url: "/tour//tour-types",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response)=> response.data
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useTourInfoQuery,
} = tourApi;
