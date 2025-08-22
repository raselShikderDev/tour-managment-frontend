import type { ComponentType } from "react";

export type {ISendOtp,ILogin, ILoginResonseData, IRegisterUserResponse, IRegisterUser, IGetMeResponse, verifyOTP} from "@/types/auth.type"


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISideBarItem{
  title:string,
  items:{
    title:string,
    url:string,
    component:ComponentType,
  }[]
}