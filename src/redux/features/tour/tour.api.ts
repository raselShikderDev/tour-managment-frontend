import { baseApi } from "@/redux/baseApi";


export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags:["TOUR"],
    }),

    removeTour: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags:["TOUR"],
    }),
    
    getTours: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response)=> response.data
    }),
  }),
});

export const {
  useAddTourMutation,
  useLazyGetToursQuery,
  useGetToursQuery
} = tourApi;
