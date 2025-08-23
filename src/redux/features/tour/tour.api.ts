import { baseApi } from "@/redux/baseApi";
import type {
  ICreateTourType,
  ICreateTourTypeResponse,
  IGetAllTourTypeResponse,
  IResponse,
} from "@/types";


export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ICreateTourTypeResponse>, ICreateTourType>({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags:["TOUR"],
    }),
    
    tourInfo: builder.query<IGetAllTourTypeResponse, void>({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse:(response:IResponse<IGetAllTourTypeResponse>)=> response.data
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useTourInfoQuery,
} = tourApi;
