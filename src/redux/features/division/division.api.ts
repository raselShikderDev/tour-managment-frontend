import { baseApi } from "@/redux/baseApi";
import type { IAddDivision, IResponse } from "@/types";


export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addDivision: builder.mutation<IResponse<IAddDivision>, any>({
      query: (divisionInfo) => ({
        url: "/division/create",
        method: "POST",
        data: divisionInfo,
      }),
      invalidatesTags:["TOUR"],
    }),
    
    tourInfo: builder.query({
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
  useTourInfoQuery,
  useAddDivisionMutation
} = divisionApi;
