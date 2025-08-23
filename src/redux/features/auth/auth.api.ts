import { baseApi } from "@/redux/baseApi";
import type {
  IResponse,
  ISendOtp,
  IRegisterUser,
  IRegisterUserResponse,
  IGetMeResponse,
  verifyOTP,
  ILogin,
  ILoginResonseData,
} from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResonseData>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags:["USER"],
    }),
    register: builder.mutation<IResponse<IRegisterUserResponse>, IRegisterUser>(
      {
        query: (userInfo) => ({
          url: "/user/register",
          method: "POST",
          data: userInfo,
        }),
      }
    ),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, verifyOTP>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    logOut: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    userInfo: builder.query<IResponse<IGetMeResponse>, null>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags:["USER"]
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogOutMutation,
} = authApi;
