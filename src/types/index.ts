export type {ISendOtp,ILogin, ILoginResonseData, IRegisterUserResponse, IRegisterUser} from "@/types/auth.type"


export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

