export interface IRegisterUser {
  name: string
  email: string
  password: string
}

export interface Auth {
  provider: string
  providerId: string
}


export interface IRegisterUserResponse {
  name: string
  email: string
  password: string
  role: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  _id: string
  createdAt: string
  updatedAt: string
}




export interface ISendOtp {
    email:string
}

export interface ILogin{
    email:string,
    password:string,
}

export interface ILoginResonseData {
  accesToken: string;
  refreshToken: string;
  user: {
    $__: {
      activePaths: {
        paths: {
          email: string;
          name: string;
          role: string;
          isDeleted: string;
          isActive: string;
          isVerified: string;
          _id: string;
          password: string;
          auths: string;
          createdAt: string;
          updatedAt: string;
          address: string;
          phone: string;
        };
        states: {
          require: Record<string, unknown>;
          default: Record<string, unknown>;
          init: {
            _id: boolean;
            name: boolean;
            email: boolean;
            password: boolean;
            role: boolean;
            isDeleted: boolean;
            isActive: boolean;
            isVerified: boolean;
            auths: boolean;
            createdAt: boolean;
            updatedAt: boolean;
            address: boolean;
            phone: boolean;
          };
        };
      };
      skipId: boolean;
    };
    $isNew: boolean;
    _doc: {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: "USER" | "ADMIN" | string;
      isDeleted: boolean;
      isActive: "ACTIVE" | "INACTIVE" | string;
      isVerified: boolean;
      auths: {
        provider: string;
        providerId: string;
      }[];
      createdAt: string; // ISO date
      updatedAt: string; // ISO date
      address: string;
      phone: string;
    };
  };
}


export interface IGetMeResponse {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isDeleted: boolean;
    isActive: string;
    isVerified: boolean;
    auths: {
      provider: string;
      providerId: string;
    }[];
    createdAt: string; 
    updatedAt: string; 
    address: string;
    phone: string;
  };

  export interface verifyOTP {
  email: string
  otp: string
}
