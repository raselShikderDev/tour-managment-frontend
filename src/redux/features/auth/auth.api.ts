import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp } from "@/types";
import type { ILogin, ILoginResonseData, IRegisterUser, IRegisterUserResponse } from "@/types/auth.type";


const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation<IResponse<ILoginResonseData>, ILogin>({
            query:(userInfo)=>({
                url:"/user/register",
                method:"POST",
                data:userInfo,
            })
        }),
        register:builder.mutation<IResponse<IRegisterUserResponse>, IRegisterUser>({
            query:(userInfo)=>({
                url:"/user/register",
                method:"POST",
                data:userInfo,
            })
        }),
        sendOtp:builder.mutation<IResponse<null>, ISendOtp>({
            query:(userInfo)=>({
                url:"/otp/send",
                method:"POST",
                data:userInfo,
            })
        }),
    })
})

export const {useRegisterMutation, useLoginMutation, useSendOtpMutation} = authApi
