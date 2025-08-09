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
  accesToken: string; // note: seems like this should be "accessToken"
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
      role: string;
      isDeleted: boolean;
      isActive: string;
      isVerified: boolean;
      auths: Array<{
        provider: string;
        providerId: string;
      }>;
      createdAt: string; // ISO date string
      updatedAt: string; // ISO date string
    };
  };
}
