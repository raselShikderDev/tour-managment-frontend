// import { config } from "@/configs";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "tourBaseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});


// fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" })