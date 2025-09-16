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
      invalidatesTags:["DIVISION"],
    }),
    removeDivision: builder.mutation<IResponse<null>, string>({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags:["DIVISION"],
    }),
    getAllDivisons: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      providesTags:["DIVISION"],
      transformResponse:(response)=> response.data
    }),
  }),
});

export const {
  useGetAllDivisonsQuery,
  useAddDivisionMutation,
  useRemoveDivisionMutation,
} = divisionApi;
